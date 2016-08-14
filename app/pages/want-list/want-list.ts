import {Component, ViewChild} from '@angular/core';
import {
  NavController,
  NavParams,
  List,
  Loading,
  LoadingController,
  ItemSliding
} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject} from 'rxjs/Subject';

import {WantItem} from '../../modules/wants/want-item';
import {WantDetailPage} from '../want-detail/want-detail';

@Component({
  templateUrl: 'build/pages/want-list/want-list.html'
})

export class WantListPage {
  wants: FirebaseListObservable<WantItem[]>;
  loader: Loading;

  @ViewChild('list', {read: List}) list: List;
  @ViewChild('slidingItem', {read: ItemSliding}) slidingItem: ItemSliding;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private loading: LoadingController,
              af: AngularFire) {
    this.nav = nav;
    this.loading = loading;

    this.wants = af.database.list('/users/0/wants');
    this.wants.subscribe(() => this.loader.dismiss());

    this.presentLoading();
  }

  wantTapped(want: WantItem) {
    console.log(' WANT TAPPED ', want);
    this.nav.push(WantDetailPage, {want: want});
    this.slidingItem.close();
  }

  archiveTapped(want: WantItem) {
    this.slidingItem.close();
  }

  sampleTapped(want: WantItem, vote: number) {
    console.log(`vote: ${vote} on ${want.id}`);
  }

  private presentLoading() {
    this.loader = this.loading.create({
      content: 'Loading list of wants...',
      dismissOnPageChange: true
    });
    this.loader.present();
  }
}
