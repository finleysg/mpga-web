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
  years: number[];  // years for which we have membership data

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
    this.clubContacts.unshift(new ClubContact({'contact': contact}));
  }

  prepJson(): any {
    return {
      'name': this.name,
      'website': this.website,
      'type_2': this.type2,
      'notes': this.notes,
      'size': this.size,
      'golf_course': this.golfCourse.prepJson(),
      'club_contacts': []  // contacts are managed separately
    };
  }
}

export class Membership extends Model {
  year: number;
  club: number;
  paymentDate: moment.Moment;
  paymentType: string;
  paymentCode: string;
  createDate: moment.Moment;
  notes: string;

  constructor(obj: any) {
    super();
    if (obj) {
      const mem = super.fromJson(obj);
      // mem.club = new Club(obj['club']);
      Object.assign(this, mem);
    }
  }
}

export class Team extends Model {
  id: number;
  year: number;
  club: Club;
  groupName: string;
  isSenior: boolean;
  notes: string;

  constructor(obj: any) {
    super();
    if (obj) {
      const team = super.fromJson(obj);
      team.club = new Club(obj['club']);
      Object.assign(this, team);
    }
  }

  captainNames(senior: boolean): string {
    const captains = this.captains(senior);
    return captains ? captains.map(c => `${c.contact.firstName} ${c.contact.lastName}`).join(', ') : '';
  }

  captains(senior: boolean): ClubContact[] {
    if (this.club && this.club.clubContacts) {
      if (senior) {
        return this.club.clubContacts
          .filter(c => c.isSeniorCaptain);
      }
      return this.club.clubContacts
        .filter(c => c.isCaptain);
    }
    return [];
  }
}

export class ClubContact extends Model {
  // localId: string = Math.floor(Math.random() * 1000).toString();
  club: number;
  contact: Contact;
  isPrimary: boolean;
  useForMailings: boolean;
  deleted: boolean;
  roles: ClubContactRole[];
  notes: string;

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

  get isCaptain(): boolean {
    return this.roles && this.roles.some(r => r.role === 'Match Play Captain');
  }

  get isSeniorCaptain(): boolean {
    return this.roles && this.roles.some(r => r.role === 'Sr. Match Play Captain');
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

export class ClubValidationMessage {
  level: string;
  message: string;

  constructor(msg: string[]) {
    if (msg) {
      this.level = msg[0];
      this.message = msg[1];
    }
  }
}
