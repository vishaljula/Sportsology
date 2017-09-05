import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage } from '../pages';
import { SportsologyApi } from '../../shared/shared';

/**
 * Generated class for the MyTeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites = [
    {
      team: {id: 97845, name: 'hvbv', coach: 'whkvhce'},
      tournamentId: '4332h-42343n-3432mn-343nk',
      tournamentName: 'some tourney'
    },
    {
      team: {id: 97845, name: 'hvbv', coach: 'whkvhce'},
      tournamentId: '4332h-42343n-3432mn-343nk',
      tournamentName: 'some tourney'
    }
  ];

  constructor(
    private navCtrl: NavController, 
    public navParams: NavParams,
    private SportsologyApi: SportsologyApi,
    private loadingController: LoadingController) {
  }

  goToTournaments() {
  	this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting Data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.SportsologyApi.getTournamentData(favorite.tournamentId)
        .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

}
