import {Inject, Injectable, ViewChild} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {
  LocalNotifications,
  Push,
  PushNotification,
  RegistrationEventResponse,
  NotificationEventResponse
} from 'ionic-native';
import {FirebaseObjectObservable} from 'angularfire2';

import {Window} from '../window/providers';
import {WantItem} from '../wants/want.item';

@Injectable()
export class NotificationService {
  push: PushNotification;

  constructor(@Inject(Window) win,
              private platform: Platform,
              private alertCtrl: AlertController) {
    win.foo = (data) => {
      console.log(`want id: ${data.additionalData.wantId}`);
    };
  }

  listen() {
    Push.hasPermission()
      .then((data) => {
        console.log(data);
        if (data.isEnabled) {
          this.preparePushNotifications();
        }
      })
      .catch((e: Error) => console.log(e));
  }

  schedule(want?: FirebaseObjectObservable<WantItem>, at?: Date) {
    console.log('scheduled notification');
    //    title: 'WTFDIW',
    //    text: item.displaytext,
    //    at: at,
    //    led: '387ef5',
  }

  private preparePushNotifications() {
    this.push = Push.init({
      android: {
        senderID: '903747170406'
      },
      ios: {
        alert: true,
        badge: true,
        sound: false
      },
      windows: {}
    });

    this.push.on('registration', (data: RegistrationEventResponse) => {
      console.log(`push::registration`);
      console.log(JSON.stringify(data));
      //alert(data.registrationId.toString());
    });

    this.push.on('notification', (data: NotificationEventResponse) => {
      console.log(`push::notification`);
      console.log(JSON.stringify(data));
      //alert(JSON.stringify(data));
    });

    this.push.on('error', (e: Error) => {
      console.log(`push::error: ${e.message}`);
    });
  }
}
