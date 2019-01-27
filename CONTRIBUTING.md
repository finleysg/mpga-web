# Contributing to mpga.net

We welcome volunteers who would like to contribute their time and talents to improving our website.
If you would like to learn more, read about our tech stack below and the list of enhancements we
have planned. Then contact info@mpga.net for help in getting started.

## Tech Stack

### Back end

- Django
- Django Rest Framework
- MySql / MariaDB

### Front end

- Angular (currently v6)

## Enhancements

__Club Editing:__ The edit page for member clubs should have a clear indicator that the page is "dirty".
Don't enable the save button until the page is dirty. Add a guard that warns the user when leaving a
dirty page.

__Club Edit Permissions:__ Create a custom permission class for the backend views where not only does the
user need to be authenticated, but the user should also be 1) a member of that club, or 2) and EC member.

__Reports:__ Simple reports, exportable as CSV.

- Club Contacts
- All Contacts
- Math Play Captains
- Member Clubs
 
__Documentation Wiki:__ Add a wiki to the Django project where we can manage HOWTO topics for EC members
and help onboard new EC members.

__Image Gallery:__ For each tournament, display a responsive gallery of thumbnail images. Clicking on an
image loads a full-size viewer. The viewer allows scrolling through all images in the gallery.

__Image Upload:__ Simple drag and drop upload page where authenticated members can add tournament images.
Include a notification and approval workflow for site administrators.

__Club Images:__ Support images attached to a member club record, rendered on the member club detail page.

__Document Management:__ This is for EC members. A document uploading and tagging page (something we already
have in the Django admin, but a more user-friendly version would be nice).

Would also like search capability over all documents. Search by tournament, document type, tag(s), year, etc.

