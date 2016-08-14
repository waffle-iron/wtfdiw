import {Component, ViewChild} from '@angular/core';
import {
  NavController,
  NavParams,
  List,
  Loading,
  LoadingController,
  ItemSliding,
  ModalController
} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject} from 'rxjs/Subject';

import {WantItem} from '../../modules/wants/want-item';
import {WantDetailPage} from '../want-detail/want-detail';
import {CreateWantModalPage} from './create-want-modal';

@Component({
  templateUrl: './build/pages/want-list/want-list.html'
})

export class WantListPage {
  wants: FirebaseListObservable<WantItem[]>;
  loader: Loading;

  @ViewChild('slidingItem', {read: ItemSliding}) slidingItem: ItemSliding;

  constructor(private nav: NavController,
              private navParams: NavParams,
              private loading: LoadingController,
              private modal: ModalController,
              private firebase: AngularFire) {
    this.nav = nav;
    this.loading = loading;
    this.firebase = firebase;
  }

  ngOnInit() {
    this.wants = this.firebase.database.list('/users/0/wants');
    this.wants.subscribe(() => this.loader.dismiss());
    this.presentLoading();
  }

  wantTapped(want: WantItem) {
    this.nav.push(WantDetailPage, {want: want});
  }

  archiveTapped(want: WantItem) {
    console.log(`archive tapped: ${want.id}`);
  }

  sampleTapped(want: WantItem, vote: number) {
    console.log(`vote: ${vote} on ${want.id}`);
  }

  presentCreateWantModal() {
    let modal = this.modal.create(CreateWantModalPage);
    modal.present();
  }

  private presentLoading() {
    this.loader = this.loading.create({
      content: 'Loading list of wants...',
      dismissOnPageChange: true
    });
    this.loader.present();
  }
}
