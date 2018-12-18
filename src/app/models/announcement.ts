import { Model } from './model';
import { MpgaDocument } from './documents';

export class Announcement extends Model {
    title: string;
    text: string;
    externalUrl: string;
    externalName: string;
    event: number;
    document: Document;

    fromJson(obj: any): any {
        const announcement = super.fromJson(obj);
        announcement.document = new MpgaDocument(obj['document']);
        return announcement;
    }
}
