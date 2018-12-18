import * as moment from 'moment';
import { Model } from './model';

export class Tag {
    id: number;
    tag: string;
}

export class DocumentTag {
    id: number;
    document: number;
    tag: Tag;
}

export class PhotoTag {
    id: number;
    photo: number;
    tag: Tag;
}

export class MpgaDocument extends Model {
    year: number;
    title: string;
    documentType: string;
    file: string;
    lastUpdate: moment.Moment;
    createdBy: string;
    tournament: number;
    tags: string[];

    constructor(json: any) {
      super();
      const obj = this.fromJson(json);
      if (json && json.tags) {
        obj.tags = json.tags.map(t => t.tag);
      }
      Object.assign(this, obj);
    }
}

export class MpgaPhoto extends Model {
    year: number;
    caption: string;
    photoType: string;
    thumbnailUrl: string;
    imageUrl: string;
    lastUpdate: moment.Moment;
    createdBy: string;
    tournament: number;
}
