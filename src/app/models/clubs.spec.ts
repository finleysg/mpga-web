// {id: 216, year: 2019, club: 5, group_name: "8 Man A", is_senior: true, notes: null}
import { Club, Team, ClubContact, Contact } from './clubs';

describe('model serialization', () => {
  let teamJson: any;

  beforeEach(() => {
    teamJson = {
      'id': 216,
      'year': 2019,
      'club': 5,
      'group_name': 'policy 8 Man A',
      'is_senior': true,
      'notes': 'some text goes here'
    };
  });

  it('#team constructor creates a club with an id', () => {
    const team = new Team(teamJson);
    expect(team.club).toBeDefined();
    expect(team.club.id).toBe(5);
  });

  it('#club.addContact assigns its own id to the new contact', () => {
    const club = new Club({id: 5, name: 'test'});
    const cc = club.addContact(new Contact({first_name: 'Joe', last_name: 'Cool'}));
    expect(cc.club).toBe(5);
  });
});
