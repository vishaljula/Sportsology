import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TeamsPage } from '../pages';
import { SportsologyApi} from '../../shared/shared'
/**
 * Generated class for the TournamentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private SportsologyApi: SportsologyApi,
    private loadingController: LoadingController
    ) {
  }

  itemTapped($event, tourney) {
  	this.navCtrl.push(TeamsPage, tourney);
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments',
      spinner: 'bubbles'
    });

    loader.present().then(() => {
        this.SportsologyApi.getTournaments().then(data => {
          this.tournaments = data
          loader.dismiss();
        });
    });
    console.log('ionViewDidLoad TournamentsPage');
  }

}
