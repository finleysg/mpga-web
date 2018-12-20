import * as moment from 'moment';
import { Model } from './model';

export interface Address {
  addressTxt: string;
  city: string;
  state: string;
  zip: string;
}

export class GolfCourse extends Model {
  name: string;
  addressTxt: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  email: string;
  phone: string;
  notes: string;

  constructor(obj: any) {
    super();
    const course = this.fromJson(obj);
    Object.assign(this, course);
  }

  updateAddress(addr: Address): void {
    this.addressTxt = addr.addressTxt;
    this.city = addr.city;
    this.state = addr.state;
    this.zip = addr.zip;
  }

  copyAddress(): Address {
    const { addressTxt, city, state, zip } = this;
    return { addressTxt, city, state, zip } as Address;
  }
}

export class Contact extends Model {
  firstName: string;
  lastName: string;
  contactType: string;
  primaryPhone: string;
  alternatePhone: string;
  email: string;
  addressTxt: string;
  city: string;
  state: string;
  zip: string;
  notes: string;

  constructor(obj: any) {
    super();
    const contact = this.fromJson(obj);
    Object.assign(this, contact);
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  updateAddress(addr: Address): void {
    this.addressTxt = addr.addressTxt;
    this.city = addr.city;
    this.state = addr.state;
    this.zip = addr.zip;
  }

  copyAddress(): Address {
    const { addressTxt, city, state, zip } = this;
    return { addressTxt, city, state, zip } as Address;
  }
}

export class Club extends Model {
  name: string;
  website: string;
  type2: boolean;
  notes: string;
  size: number;
  golfCourse: GolfCourse;
  clubContacts: ClubContact[];

  constructor(obj: any) {
    super();
    if (obj) {
      const club = super.fromJson(obj);
      club.golfCourse = new GolfCourse(obj['golf_course']);
      if (obj['club_contacts']) {
        club.clubContacts = obj['club_contacts'].map(cc => new ClubContact(cc));
      }
      Object.assign(this, club);
    }
  }

  addContact(contact: Contact): void {
    this.clubContacts.push(new ClubContact({'contact': contact}));
  }

  prepJson(): string {
    const club = super.snakeCase(this);
    club.clubContacts = this.clubContacts.map(cc => cc.prepJson());
    club.golfCourse = this.golfCourse.prepJson();
    return club;
  }
}

export class Membership extends Model {
  year: number;
  club: Club;
  paymentDate: moment.Moment;
  paymentType: string;
  paymentCode: string;
  createDate: moment.Moment;
  notes: string;

  constructor(obj: any) {
    super();
    if (obj) {
      const mem = super.fromJson(obj);
      mem.club = new Club(obj['club']);
      Object.assign(this, mem);
    }
  }
}

export class Team extends Model {
  id: number;
  year: number;
  club: number;
  clubName: string;
  captain: Contact;
  coCaptain: Contact;
  groupName: string;
  isSenior: boolean;
  notes: string;

  constructor(obj: any) {
    super();
    if (obj) {
      const team = super.fromJson(obj);
      team.captain = new Contact(obj['contact']);
      team.coCaptain = new Contact(obj['contact2']);
      Object.assign(this, team);
    }
  }
}

export class ClubContact extends Model {
  contact: Contact;
  isPrimary: boolean;
  useForMailings: boolean;
  roles: ClubContactRole[];

  constructor(obj: any) {
    super();
    if (obj) {
      const cc = super.fromJson(obj);
      cc.contact = new Contact(obj['contact']);
      if (obj['roles']) {
        cc.roles = obj['roles'].map(r => new ClubContactRole(r));
      }
      Object.assign(this, cc);
    }
  }

  addRole(name: string): void {
    if (!this.roles) {
      this.roles = [];
    }
    const role = new ClubContactRole({ 'role': name, 'clubContact': this.id });
    this.roles.push(role);
  }

  prepJson(): any {
    const cc = super.snakeCase(this);
    cc.roles = this.roles.map(r => r.prepJson());
    cc.contact = this.contact.prepJson();
    return cc;
  }
}

export class ClubContactRole extends Model {
  clubContact: number;
  role: string;

  constructor(obj: any) {
    super();
    if (obj) {
      const ccr = super.fromJson(obj);
      Object.assign(this, ccr);
    }
  }
}
