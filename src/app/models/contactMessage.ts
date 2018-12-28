import { Model } from './model';

export class ContactMessage extends Model {
  messageType: string;
  course: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  event: string;
  message: string;
}

export enum MessageType {
  Tournament = <any>'Tournament',
  Bid = <any>'Bid',
  ContactUpdate = <any>'ContactUpdate',
  General = <any>'General'
}
