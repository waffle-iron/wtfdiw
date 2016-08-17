import {Component, ViewChild} from '@angular/core';
import {
  NavController,
  Loading,
  LoadingController,
  ItemSliding,
  ModalController
} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject} from 'rxjs/Subject';

import {WantItem} from '../../modules/wants/want.item';
import {WantDetailPage} from '../want-detail/want-detail';
import {NotificationService} from '../../modules/notifications/notification.service';
import {CreateWantModalPage} from './create-want-modal';

@Component({
  templateUrl: './build/pages/want-list/want-list.html'
})

export class WantListPage {
  @ViewChild('slidingItem', {read: ItemSliding}) slidingItem: ItemSliding;

  wants: FirebaseListObservable<WantItem[]>;
  loader: Loading;

  constructor(private nav: NavController,
              private loading: LoadingController,
              private modal: ModalController,
              private firebase: AngularFire,
              private notification: NotificationService) {
  }

  ionViewLoaded() {
    this.presentLoading();
  }

  ionViewDidEnter() {
    this.wants = this.firebase.database.list('/users/0/wants');
    this.wants.subscribe(() => {
      // @TODO: hopefully a temp fix... related:
      // - https://github.com/driftyco/ionic/issues/7681
      // - https://github.com/driftyco/ionic/issues/7723
      // - http://ionicframework.com/docs/v2/api/components/nav/NavController/#lifecycle-events
      setTimeout(() => this.loader.dismiss(), 500);
    });
  }

  shouldShowSampling(want: WantItem) {
    return false; //!!(want.id === '123abc');
  }

  navigateToDetail(want: WantItem) {
    console.log(`navigate to detail: ${want.id}`);
    this.nav.push(WantDetailPage, {want: want});
  }

  performSample(want: WantItem, vote: number) {
    console.log(`vote: ${vote} on ${want.id}`);
  }

  dismissSample(want: WantItem) {
    console.log(`dismiss ${want.id}`);
  }

  presentCreateWantModal() {
    let modal = this.modal.create(CreateWantModalPage);
    modal.present();
  }

  private presentLoading() {
    this.loader = this.loading.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>
        <div>Loading list of wants... please wait.</div>
      `,
      dismissOnPageChange: true
    });
    this.loader.present();
  }
}
