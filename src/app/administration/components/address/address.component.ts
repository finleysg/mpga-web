import { Component, Input, OnDestroy, OnChanges } from '@angular/core';
import { Address } from 'src/app/models/clubs';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddressForm } from '../address/address.form';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [AddressForm]
})
export class AddressComponent implements OnChanges, OnDestroy {

  @Input()
  address: Address;

  states = [
    {
      'name': 'Alabama',
      'abbreviation': 'AL'
    },
    {
      'name': 'Alaska',
      'abbreviation': 'AK'
    },
    {
      'name': 'Arizona',
      'abbreviation': 'AZ'
    },
    {
      'name': 'Arkansas',
      'abbreviation': 'AR'
    },
    {
      'name': 'California',
      'abbreviation': 'CA'
    },
    {
      'name': 'Colorado',
      'abbreviation': 'CO'
    },
    {
      'name': 'Connecticut',
      'abbreviation': 'CT'
    },
    {
      'name': 'Delaware',
      'abbreviation': 'DE'
    },
    {
      'name': 'District Of Columbia',
      'abbreviation': 'DC'
    },
    {
      'name': 'Florida',
      'abbreviation': 'FL'
    },
    {
      'name': 'Georgia',
      'abbreviation': 'GA'
    },
    {
      'name': 'Hawaii',
      'abbreviation': 'HI'
    },
    {
      'name': 'Idaho',
      'abbreviation': 'ID'
    },
    {
      'name': 'Illinois',
      'abbreviation': 'IL'
    },
    {
      'name': 'Indiana',
      'abbreviation': 'IN'
    },
    {
      'name': 'Iowa',
      'abbreviation': 'IA'
    },
    {
      'name': 'Kansas',
      'abbreviation': 'KS'
    },
    {
      'name': 'Kentucky',
      'abbreviation': 'KY'
    },
    {
      'name': 'Louisiana',
      'abbreviation': 'LA'
    },
    {
      'name': 'Maine',
      'abbreviation': 'ME'
    },
    {
      'name': 'Maryland',
      'abbreviation': 'MD'
    },
    {
      'name': 'Massachusetts',
      'abbreviation': 'MA'
    },
    {
      'name': 'Michigan',
      'abbreviation': 'MI'
    },
    {
      'name': 'Minnesota',
      'abbreviation': 'MN'
    },
    {
      'name': 'Mississippi',
      'abbreviation': 'MS'
    },
    {
      'name': 'Missouri',
      'abbreviation': 'MO'
    },
    {
      'name': 'Montana',
      'abbreviation': 'MT'
    },
    {
      'name': 'Nebraska',
      'abbreviation': 'NE'
    },
    {
      'name': 'Nevada',
      'abbreviation': 'NV'
    },
    {
      'name': 'New Hampshire',
      'abbreviation': 'NH'
    },
    {
      'name': 'New Jersey',
      'abbreviation': 'NJ'
    },
    {
      'name': 'New Mexico',
      'abbreviation': 'NM'
    },
    {
      'name': 'New York',
      'abbreviation': 'NY'
    },
    {
      'name': 'North Carolina',
      'abbreviation': 'NC'
    },
    {
      'name': 'North Dakota',
      'abbreviation': 'ND'
    },
    {
      'name': 'Ohio',
      'abbreviation': 'OH'
    },
    {
      'name': 'Oklahoma',
      'abbreviation': 'OK'
    },
    {
      'name': 'Oregon',
      'abbreviation': 'OR'
    },
    {
      'name': 'Pennsylvania',
      'abbreviation': 'PA'
    },
    {
      'name': 'Rhode Island',
      'abbreviation': 'RI'
    },
    {
      'name': 'South Carolina',
      'abbreviation': 'SC'
    },
    {
      'name': 'South Dakota',
      'abbreviation': 'SD'
    },
    {
      'name': 'Tennessee',
      'abbreviation': 'TN'
    },
    {
      'name': 'Texas',
      'abbreviation': 'TX'
    },
    {
      'name': 'Utah',
      'abbreviation': 'UT'
    },
    {
      'name': 'Vermont',
      'abbreviation': 'VT'
    },
    {
      'name': 'Virginia',
      'abbreviation': 'VA'
    },
    {
      'name': 'Washington',
      'abbreviation': 'WA'
    },
    {
      'name': 'West Virginia',
      'abbreviation': 'WV'
    },
    {
      'name': 'Wisconsin',
      'abbreviation': 'WI'
    },
    {
      'name': 'Wyoming',
      'abbreviation': 'WY'
    }
  ];

  form: FormGroup;
  fieldErrors: any;
  private formSubscription: Subscription;

  constructor(private addressForm: AddressForm) { }

  ngOnChanges() {
    console.log('address change');
    this.formSubscription = this.addressForm.form$.subscribe(form => this.form = form);
    this.addressForm.buildForm(this.address);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  isDirty(): boolean {
    return this.form.dirty;
  }

  update(): void {
    if (this.form.valid) {
      this.addressForm.updateValue(this.address);
    }
  }
}
