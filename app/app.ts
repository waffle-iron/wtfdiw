import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

import {FIREBASE_CONFIG} from './modules/constants';
import {TabsPage} from './components/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})

export class WtfDiw {
  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(WtfDiw, [
  FIREBASE_PROVIDERS,
  defaultFirebase(FIREBASE_CONFIG)
]);
