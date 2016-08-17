import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {Subject} from 'rxjs/Subject';

import {WantItem} from '../../modules/wants/want.item';
import {NotificationService} from '../../modules/notifications/notification.service';

@Component({
  templateUrl: './build/pages/want-detail/want-detail.html'
})

export class WantDetailPage {
  want: FirebaseObjectObservable<WantItem>;

  constructor(private navParams: NavParams,
              private firebase: AngularFire,
              private notification: NotificationService) {
  }

  ionViewLoaded() {
    let key = this.navParams.get('want').$key;
    this.want = this.firebase.database.object(`/users/0/wants/${key}`);
  }

  prepareNotification() {
    let at = new Date(new Date().getTime() + 5 * 1000);
    this.notification.schedule(this.want, at);
  }
}
