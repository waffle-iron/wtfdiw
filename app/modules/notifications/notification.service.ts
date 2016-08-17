import {Injectable, ViewChild} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';
import {FirebaseObjectObservable} from 'angularfire2';

import {WantItem} from '../wants/want.item';

@Injectable()
export class NotificationService {
  constructor(private platform: Platform,
              private alert: AlertController) {
  }

  listen() {
    LocalNotifications.on('click', (notification, state) => {
      console.log('clicked notification');
      console.log(JSON.stringify(notification));
      console.log(state);
      let alert = this.alert.create({
        title: 'Notification Clicked',
        subTitle: 'You just clicked the scheduled notification',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  schedule(want?: FirebaseObjectObservable<WantItem>, at?: Date) {
    console.log('scheduled notification');
    want.subscribe((item: WantItem) => {
      console.log(item);
      LocalNotifications.schedule({
        title: 'WTFDIW',
        text: item.displaytext,
        at: at,
        led: '387ef5',
        sound: null
      });
    });
  }
}
