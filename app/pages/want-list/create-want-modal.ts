import {Component} from '@angular/core';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {ViewController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {WantItem} from '../../modules/wants/want.item';
import {WantItemSample} from '../../modules/wants/want.item.sample';

@Component({
  templateUrl: './build/pages/want-list/create-want-modal.html',
  directives: [REACTIVE_FORM_DIRECTIVES]
})

export class CreateWantModalPage {
  wants: FirebaseListObservable<WantItem[]>;
  form: FormGroup;
  description: string;

  constructor(private view: ViewController,
              private formBuilder: FormBuilder,
              private firebase: AngularFire) {
  }

  ionViewLoaded() {
    this.form = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.wants = this.firebase.database.list('/users/0/wants');
  }

  submitForm() {
    let want = new WantItem({
      id: this.guid(),
      displaytext: this.description
    });

    this.wants.push(want)
      .then((done: any) => {
        this.dismiss();
      });
  }

  dismiss() {
    this.view.dismiss();
  }

  private guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
