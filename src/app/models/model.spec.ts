import * as moment from 'moment';
import { Policy } from './policies';
import { ClubContact, Contact, Membership } from './clubs';

describe('model serialization', () => {
    let policyJson: any;
    let clubContactJson: any;
    let membershipJson: any;

    beforeEach(() => {
        policyJson = {
            'id': 123,
            'policy_type': 'T',
            'name': 'policy name',
            'title': 'policy title',
            'description': 'some text goes here'
        };
        clubContactJson = {
            'id': 177,
            'club': 5,
            'contact': {
                'id': 282,
                'first_name': 'Zac',
                'last_name': 'Uren',
                'contact_type': 'Men\'s Club',
                'primary_phone': '651-343-8833',
                'alternate_phone': '',
                'email': 'zuren79@hotmail.com',
                'address_txt': '',
                'city': '',
                'state': 'MN',
                'zip': '',
                'notes': null
            },
            'is_primary': false,
            'use_for_mailings': false,
            'roles': [
                {
                    'id': 1,
                    'club_contact': 177,
                    'role': 'Match Play Captain'
                },
                {
                    'id': 2,
                    'club_contact': 177,
                    'role': 'Men\'s Club President'
                }
            ]
        };
        membershipJson = {
            'id': 1,
            'year': 2017,
            'club': {
                'id': 1,
                'name': 'Baker National Golf Club'
            },
            'payment_date': '2017-03-11',
            'payment_type': 'CK',
            'payment_code': '1003',
            'create_date': '2018-01-14T12:37:52.323126-06:00',
            'notes': ''
        };
    });

    it('#fromJson creates a simple object', () => {
        const policy = new Policy().fromJson(policyJson);
        expect(policy.policyType).toBe('T');
        expect(policy.id).toBe(123);
    });

    it('#prepJson creates Django property names', () => {
        const policy = new Policy();
        policy.id = 321;
        policy.policyType = 'X';
        const json = JSON.stringify(policy.prepJson());
        expect(json).toBe('{"id":321,"policy_type":"X"}');
    });

    it('#fromJson creates a nested object', () => {
        const cc = new ClubContact().fromJson(clubContactJson);
        expect(cc.isPrimary).toBeFalsy();
        expect(cc.id).toBe(177);
        expect(cc.contact.lastName).toBe('Uren');
        expect(cc.roles.length).toBe(2);
    });

    it('#prepJson creates nested Django property names', () => {
        const cc = new ClubContact();
        cc.id = 1;
        cc.isPrimary = true;
        cc.contact = new Contact();
        cc.contact.id = 11;
        cc.contact.lastName = 'Brown';
        cc.contact.firstName = 'Bob';
        cc.addRole('Test');
        const json = JSON.stringify(cc.prepJson());
        // tslint:disable-next-line:max-line-length
        expect(json).toBe('{"id":1,"is_primary":true,"contact":{"id":11,"last_name":"Brown","first_name":"Bob"},"roles":[{"club_contact":1,"role":"Test"}]}');
    });

    it('#fromJson handles date fields', () => {
        const mem = new Membership().fromJson(membershipJson);
        expect(moment.isMoment(mem.paymentDate)).toBeTruthy();
        expect(moment.isMoment(mem.createDate)).toBeTruthy();
    });
});
