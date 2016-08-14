import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Subject} from 'rxjs/Subject';

@Component({
  templateUrl: 'build/pages/want-detail/want-detail.html'
})

export class WantDetailPage {
  want: FirebaseObjectObservable<any>;

  constructor(private nav: NavController,
              private navParams: NavParams,
              af: AngularFire) {
    let key = navParams.get('want').$key;
    this.want = af.database.object(`/users/0/wants/${key}`);
  }
}
