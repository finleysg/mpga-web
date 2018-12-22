import { Pipe, PipeTransform } from '@angular/core';
import { ClubContact } from 'src/app/models/clubs';

@Pipe({
  name: 'contactFilter',
  pure: false
})
export class ContactFilterPipe implements PipeTransform {

  transform(contacts: ClubContact[]): ClubContact[] {
    return contacts.filter(c => !c.deleted);
  }

}
