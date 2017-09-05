import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
import { SportsologyApi } from '../../shared/shared';

/**
 * Generated class for the StandingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
	allStandings: any[];
	standings: any[];
	team: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private SportsologyApi: SportsologyApi) {}

  ionViewDidLoad() {
  	this.team = this.navParams.data;
  	let tournamentData = this.SportsologyApi.getCurrentTournament();
  	this.standings = tournamentData.standings;

  	this.allStandings = _.chain(this.standings)
  						.groupBy('division')
  						.toPairs()
  						.map(item => _.zipObject(['divisionname', 'divisionStandings'], item))
  						.value();

    console.log('standings', this.standings);
    console.log('division standings', this.allStandings);
  }

}
