import * as moment from 'moment';
import { Model } from './model';

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
}

export class Contact extends Model {
    firstName: string;
    lastName: string;
    contactType: string;
    primaryPhone: string;
    alternatePhone: string;
    email: string;
    addressText: string;
    city: string;
    state: string;
    zip: string;
    notes: string;

    get name(): string {
        return `${this.firstName} ${this.lastName}`;
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

    fromJson(obj: any): any {
        const club = super.fromJson(obj);
        club.golfCourse = new GolfCourse().fromJson(obj['golf_course']);
        if (obj['club_contacts']) {
            club.clubContacts = obj['club_contacts'].map(cc => new ClubContact().fromJson(cc));
        }
        return club;
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

    fromJson(obj: any): any {
        const mem = super.fromJson(obj);
        mem.club = new Club().fromJson(obj['club']);
        return mem;
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

    fromJson(obj: any): any {
        const team = super.fromJson(obj);
        team.captain = new Contact().fromJson(obj['contact']);
        team.coCaptain = new Contact().fromJson(obj['contact2']);
        return team;
    }
}

export class ClubContact extends Model {
    contact: Contact;
    isPrimary: boolean;
    useForMailings: boolean;
    roles: ClubContactRole[];

    addRole(name: string): void {
        if (!this.roles) {
            this.roles = [];
        }
        const role = new ClubContactRole();
        role.clubContact = this.id;
        role.role = name;
        this.roles.push(role);
    }

    fromJson(obj: any): any {
        const cc = super.fromJson(obj);
        cc.contact = new Contact().fromJson(obj['contact']);
        if (obj['roles']) {
            cc.roles = obj['roles'].map(r => new ClubContactRole().fromJson(r));
        }
        return cc;
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
}
