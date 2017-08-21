import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { SportsologyApi} from '../../shared/shared'

/**
 * Generated class for the GamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

	game = {};

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private SportsologyApi: SportsologyApi) {
	}

	ionViewDidLoad() {
		this.game = this.navParams.data;
		console.log('ionViewDidLoad GamePage');
	}

	teamTapped(teamId) {
		let tournamentData = this.SportsologyApi.getCurrentTournament();
		let team = tournamentData.teams.find(t => t.id === teamId);
		this.navCtrl.push(TeamHomePage, team);
	}
}
