# Contributing to mpga.net

We welcome volunteers who would like to contribute their time and talents to improving our website.
If you would like to learn more, read about our tech stack below and the list of enhancements we
have planned. Then contact info@mpga.net for help in getting started.

## Tech Stack

### Back end

- Django
- Django Rest Framework
- MySql / MariaDB
- Hosted on Pythonanywhere

### Front end

- Angular (currently v6)
- Hosted on Google Firebase

## Enhancements

__Spring and Fall Banquet Registration:__ It would help the secretary if we could have groups sign up
for the banquets online. Would need to account for free meals (president or presiden't representative),
and for EC members (no charge). Payment would probably be optional. Pay by credit card online, or pay
at the golf course on the day of the event.

__Document Management:__ This is for EC members. A document uploading and tagging page (something we already
have in the Django admin, but a more user-friendly version would be nice).

Would also like search capability over all documents. Search by tournament, document type, tag(s), year, etc.

__Reports:__ Simple reports, exportable as CSV.

- Club Contacts
- Primary Club Contacts
- All Contacts
- Match Play Captains
- Member Clubs

__Club Editing:__ The edit page for member clubs should have a clear indicator that the page is "dirty".
Don't enable the save button until the page is dirty. Add a guard that warns the user when leaving a
dirty page.

__Club Edit Permissions:__ Create a custom permission class for the backend views where not only does the
user need to be authenticated, but the user should also be 1) a member of that club, or 2) and EC member.

 
__Documentation Wiki:__ Add a wiki to the Django project where we can manage HOWTO topics for EC members
and help onboard new EC members.

__Club Images:__ Support images attached to a member club record, rendered on the member club detail page.

