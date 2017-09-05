import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as _ from 'lodash';

import { TeamHomePage } from '../pages';
import { SportsologyApi } from '../../shared/shared';
/**
 * Generated class for the TeamsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-teams',
	templateUrl: 'teams.html',
})
export class TeamsPage {

	private allTeams: any;
	private allTeamDivisions: any;
	teams = [];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,  
		private SportsologyApi: SportsologyApi,  
		private loadingController: LoadingController) {
	
	}

	itemTapped($event, team) {
		this.navCtrl.push(TeamHomePage, team);
	}

	ionViewDidLoad() {
		let selectedTournament = this.navParams.data;

		let loader = this.loadingController.create({
			content: 'Getting Data...',
			dismissOnPageChange: true
	    });

	    loader.present().then(() => {
			this.SportsologyApi.getTournamentData(selectedTournament.id).subscribe(data => {
				this.allTeams = data.teams;
				this.allTeamDivisions = _.chain(data.teams)
										 .groupBy('division')
										 .toPairs()
										 .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
										 .value();
				this.teams = this.allTeamDivisions;
				console.log(this.teams);
				loader.dismiss();
			});	
	    });
	}

}
