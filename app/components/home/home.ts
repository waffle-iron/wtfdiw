import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject} from 'rxjs/Subject';

@Component({
  templateUrl: 'build/components/home/home.html'
})

export class HomeComponent {
  items: FirebaseListObservable<any[]>;

  constructor(private navCtrl: NavController,
              af: AngularFire) {
      this.items = af.database.list('/users/0/wants');
      //this.items.subscribe(snapshots => {
      //    snapshots.forEach(snapshot => {
      //        console.log(snapshot.key)
      //        console.log(snapshot.val())
      //    });
      //});
  }
}
