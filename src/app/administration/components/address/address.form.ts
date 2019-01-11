import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Address } from 'src/app/models/clubs';

@Injectable()
export class AddressForm {
  public form$: Observable<FormGroup>;

  private formSource: Subject<FormGroup>;
  private form: FormGroup;

  constructor(private builder: FormBuilder) {
    this.formSource = new Subject();
    this.form$ = this.formSource.asObservable();
  }

  buildForm(address: Address) {
    this.form = this.builder.group({
      'addressTxt': [address.addressTxt],
      'city': [address.city],
      'state': [address.state],
      'zip': [address.zip]
    });

    this.formSource.next(this.form);
  }

  updateValue(address: Address): void {
    Object.assign(address, this.form.value);
  }
}
