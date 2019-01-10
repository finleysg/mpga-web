import { Pipe, PipeTransform } from '@angular/core';
import { ClubContact } from 'src/app/models/clubs';

@Pipe({
  name: 'captainFilter',
  pure: false
})
export class CaptainFilterPipe implements PipeTransform {

  transform(contacts: ClubContact[]): ClubContact[] {
    return contacts.filter(c => !c.deleted).filter(r => r.maybeCaptain);
  }
}
