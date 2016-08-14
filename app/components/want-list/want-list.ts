import {Component} from '@angular/core';
import {NavController, NavParams, ItemSliding} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject} from 'rxjs/Subject';

import {WantDetailComponent} from '../want-detail/want-detail';

@Component({
  templateUrl: 'build/components/want-list/want-list.html'
})

export class WantListComponent {
  wants: FirebaseListObservable<any[]>;

  constructor(private nav: NavController,
              private navParams: NavParams,
              af: AngularFire) {
    this.nav = nav;
    this.wants = af.database.list('/users/0/wants');
  }

  wantTapped(sliding: ItemSliding, want) {
    this.nav.push(WantDetailComponent, {
      want: want
    });
    sliding.close();
  }
}
