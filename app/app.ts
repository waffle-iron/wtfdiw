import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

import {FIREBASE_CONFIG} from './modules/constants';
import {HomeComponent} from './components/home/home';
import {AboutComponent} from './components/about/about';
import {ContactComponent} from './components/contact/contact';

@Component({
  templateUrl: 'build/app.html'
})

export class WtfDiw {
  @ViewChild(Nav) nav: Nav;

  private rootComponent: any;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform) {
    this.initializeApp();

    this.rootComponent = HomeComponent;

    this.pages = [{
      title: 'Home',
      component: HomeComponent
    }, {
      title: 'About',
      component: AboutComponent
    }, {
      title: 'Contact',
      component: ContactComponent
    }];
  }

  initializeApp() {
    this.platform.ready()
      .then(() => {
        StatusBar.styleDefault();
      });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(WtfDiw, [
  FIREBASE_PROVIDERS,
  defaultFirebase(FIREBASE_CONFIG)
]);
