import { Component, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';
import { Subject } from 'rxjs';
import { Tournament } from 'src/app/models/events';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileService } from 'src/app/services/file.service';
import { takeUntil } from 'rxjs/operators';
import { GolfCourse } from 'src/app/models/clubs';
import { MpgaDataService } from 'src/app/services/mpga-data.service';

// TODO: add the ability to add/create additional tags at some point
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnChanges, OnDestroy {
  private readonly onDestroy = new Subject<void>();

  @Output() isDone = new EventEmitter<boolean>();

  @Input()
  year: number;
  @Input()
  tournamentId: number;
  @Input()
  course: GolfCourse;

  selectedFile: File;
  caption: string;
  isChampion: boolean;
  tournament: Tournament;

  constructor(
    private dataService: MpgaDataService,
    private fileService: FileService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnChanges() {
    if (this.tournamentId) {
      this.dataService.tournament(this.tournamentId)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(tourney => this.tournament = tourney);
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  dropped(event: UploadEvent): void {

    if (event && event.files.length === 1 && event.files[0].fileEntry.isFile) {
      const f = event.files[0].fileEntry as FileSystemFileEntry;
      f.file((file: File) => {
        if (file.type.indexOf('image') >= 0) {
          this.selectedFile = file;
          this.caption = '';
          this.isChampion = false;
        } else {
          this.snackbar.open(`${event.files[0].relativePath} is not a supported image file (.jpg, .png, .gif)`,
            null, {duration: 3000, panelClass: ['error-snackbar']});
        }
      });
    } else {
      this.snackbar.open('Please select a single image file.',
        null, {duration: 3000, panelClass: ['error-snackbar']});
    }
  }

  reset(): void {
    this.selectedFile = null;
    this.caption = '';
    this.isChampion = false;
  }

  upload(tournament: Tournament): void {
    const tags = this.generateTags();
    const photo = this.createPhoto(this.selectedFile, tournament, tags);
    this.fileService.uploadPhoto(photo, tags)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.snackbar.open('The photo has been uploaded. Thank you!', null, {duration: 3000, panelClass: ['success-snackbar']});
        this.reset();
      });
  }

  done(): void {
    this.isDone.emit(true);
  }

  private generateTags(): string[] {
    const tags = [this.year.toString()];
    if (this.tournament) {
      tags.push(this.tournament.name);
    }
    if (this.course) {
      // Shorten the location tag name
      tags.push(this.course.name.replace(' Golf Club', '').replace(' Golf Course', '').replace(' Country Club', ''));
    }
    if (this.isChampion) {
      tags.push('Champion');
    }
    return tags;
  }

  private createPhoto(file: File, tournament: Tournament, tags: String[]): FormData {
    const form = new FormData();
    form.append('photo_type', 'Tournament Photos');
    form.append('tournament', tournament.id.toString());
    form.append('year', this.year.toString());
    form.append('caption', this.caption);
    form.append('tags', tags.join('|'));
    form.append('created_by', 'tmp'); // managed on the server side
    form.append('raw_image', file, file.name);
    return form;
  }
}
