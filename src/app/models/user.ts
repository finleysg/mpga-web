// import { Club, Contact } from './clubs';

// export class Member {
//   id: number;
//   club: Club;
//   contact: Contact;

//   fromJson(json: any): Member {
//     if (json) {
//       this.id = json.id;
//     }
//     return this;
//   }

//   toJson(): any {
//     return {
//       'id': this.id,
//     };
//   }
// }

export class User {

  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  // member: Member;
  isAuthenticated = false;
  isStaff = false;
  isActive = false;

  constructor() {
  }

  get name(): string {
    if (!this.isAuthenticated) {
      return 'Guest';
    }
    return this.firstName + ' ' + this.lastName;
  }

  fromJson(json: any): User {
    if (json) {
      this.id = json.id;
      this.username = json.username;
      this.firstName = json.first_name;
      this.lastName = json.last_name;
      this.email = json.email;
      this.isAuthenticated = json.is_authenticated;
      this.isStaff = json.is_staff;
      this.isActive = json.is_active;
    }
    return this;
  }

  // used only to create new accounts
  // toJson(password: string): any {
  //   return {
  //     'username': this.username,
  //     'email': this.email,
  //     'password': password,
  //     'first_name': this.firstName,
  //     'last_name': this.lastName,
  //     'groups': [],
  //     'member': this.member.toJson()
  //   };
  // }
}
