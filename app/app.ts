import {Component, ViewChild/*, enableProdMode*/} from '@angular/core';
import {Platform, Nav, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {
  FIREBASE_PROVIDERS, 
  defaultFirebase, 
  AngularFire, 
  AuthMethods, 
  AuthProviders, 
  firebaseAuthConfig
} from 'angularfire2';

import {FIREBASE_CONFIG} from './modules/constants';
import {WINDOW_PROVIDERS} from './modules/window/providers';
import {NotificationService} from './modules/notifications/notification.service';
import {WantListPage} from './pages/want-list/want-list';
import {AboutPage} from './pages/about/about';
import {ContactPage} from './pages/contact/contact';

@Component({
  providers: [NotificationService],
  templateUrl: './build/app.html'
})

export class WtfDiw {
  @ViewChild(Nav) nav: Nav;

  private rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform,
              private notification: NotificationService) {
    this.initializeApp();

    this.rootPage = WantListPage;

    this.pages = [{
      title: 'Want List',
      component: WantListPage
    }, {
      title: 'About',
      component: AboutPage
    }, {
      title: 'Contact',
      component: ContactPage
    }];
  }

  initializeApp() {
    this.platform.ready()
      .then(() => {
        StatusBar.styleDefault();
        this.notification.listen();
      });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

//enableProdMode();

ionicBootstrap(WtfDiw, [
  defaultFirebase(FIREBASE_CONFIG),
  firebaseAuthConfig({
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
  }),
  ...FIREBASE_PROVIDERS,
  ...WINDOW_PROVIDERS
]);
