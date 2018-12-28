import { Component, Input, OnDestroy, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { ContactMessage } from '../../models/contactMessage';
import { ContactMessageForm } from './contact-message.form';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-message',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.scss'],
  providers: [ContactMessageForm]
})
export class ContactMessageComponent implements AfterContentInit, OnDestroy {

  @Input()
  messageType: string;
  @Input()
  event: string;
  @Input()
  title: string;
  @Output()
  complete: EventEmitter<boolean> = new EventEmitter();

  message: ContactMessage;
  form: FormGroup;
  fieldErrors: any;
  private formSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private contactForm: ContactMessageForm,
    private contactService: ContactService,
    private snackbar: MatSnackBar
  ) {
  }

  ngAfterContentInit() {
    if (!this.title) {
      this.title = 'Contact the MPGA';
    }
    this.message = new ContactMessage();
    this.formSubscription = this.contactForm.form$.subscribe(form => this.form = form);
    this.errorSubscription = this.contactForm.errors$.subscribe(errors => this.fieldErrors = errors);
    this.contactForm.buildForm(this.message);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  update(): boolean {
    if (this.form.valid) {
      this.contactForm.updateValue(this.message);
      this.message.messageType = this.messageType;
      this.message.event = this.event;
      return true;
    }
    return false;
  }

  sendMessage(): void {
    if (this.update()) {
      this.contactService.sendMessage(this.message).subscribe(() => {
        this.contactForm.reset();
        this.snackbar.open('Thank you! Your message has been sent.', null,
          {duration: 5000, panelClass: ['success-snackbar']});
        this.complete.emit(true);
      });
    } else {
      this.snackbar.open('There are problems with the message.', null,
        {duration: 5000, panelClass: ['error-snackbar']});
    }
  }

  cancel(): void {
    this.contactForm.reset();
    this.complete.emit(false);
  }
}
