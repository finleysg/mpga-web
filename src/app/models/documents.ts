import * as moment from 'moment';
import { Model } from './model';

export class Tag {
    id: number;
    name: string;
}

export class DocumentTag {
    id: number;
    document: MpgaDocument;
    tag: Tag;
}

export class PhotoTag {
    id: number;
    photo: MpgaPhoto;
    tag: Tag;
}

export class MpgaDocument extends Model {
    year: number;
    title: string;
    documentType: string;
    file: string;
    lastUpdate: moment.Moment;
    event: number;
}

export class MpgaPhoto extends Model {
    year: number;
    title: string;
    photoType: string;
    file: string;
    lastUpdate: moment.Moment;
    event: number;
}
