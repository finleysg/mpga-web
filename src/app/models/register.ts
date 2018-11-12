import * as moment from 'moment';
import { Model } from './model';
import { Member } from './user';
import { Club } from './clubs';
import { EventDetail, EventDivision, EventFee } from './events';

export class Participant {
    id: number;
    member: Member;
    homeClub: Club;
    lastName: string;
    firstName: string;
    email: string;
    ghin: string;
}

export class RegistrationGroup {
    id: number;
    event: EventDetail;
    division: EventDivision;
    registeredBy: string;
    notes: string;
    cardVerificationToken: string;
    paymentConfirmationCode: string;
    paymentConfirmationTimestamp: moment.Moment;
    paymentAmount: number;
}

export class Registration {
    id: number;
    event: EventDetail;
    registrationGroup: RegistrationGroup;
    participant: Participant;
    eventFee: EventFee;
    isEventFeePaid: boolean;
}
