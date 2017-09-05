import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';
import { SportsologyApi } from '../../shared/shared';
import { GamePage } from '../pages';
/**
 * Generated class for the TeamDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
	allGames: any[];
	dateFilter: string;
	games: any[];
	team: any;
	teamStanding: any;
	private tournamentData: any;
	useDateFilter: boolean = false;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
    	private SportsologyApi: SportsologyApi) {
	}

	getScoreDisplay(isTeam1, team1Score, team2Score) {
		if (team1Score && team2Score) {
			let teamScore = (isTeam1 ? team1Score : team2Score);
			let opponentScore = (isTeam1 ? team2Score : team1Score);
			let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
			return winIndicator + teamScore + "-" + opponentScore;
		}
		else {
			return '';
		}
	}

	ionViewDidLoad() {
		this.team = this.navParams.data;
		this.tournamentData = this.SportsologyApi.getCurrentTournament();

		this.games = _.chain(this.tournamentData.games)
					  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
					  .map(g => {
					  	let isTeam1 = (g.team1Id === this.team.id);	
					  	let opponentName = isTeam1 ? g.team2 : g.team1;
					  	let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
					  	return {
					  		gameId: g.id,
					  		opponent: opponentName,
					  		time: Date.parse(g.time),
					  		location: g.location,
					  		locationUrl: g.locationUrl,
					  		scoreDisplay: scoreDisplay,
					  		homeAway: isTeam1 ? "vs." : "at"
					  	};
					  })
					  .value();
		this.allGames = this.games;
		this.teamStanding = _.find(this.tournamentData.standings, {'teamId': this.team.id});
		console.log('ionViewDidLoad TeamDetailPage');
	}

	gameClicked($event, game) {
		let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
		this.navCtrl.parent.parent.push(GamePage, sourceGame);
	}

	dateChanged() {
		if(this.useDateFilter) {
			this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
		}
		else {
			this.games = this.allGames;
		}
	}
}
