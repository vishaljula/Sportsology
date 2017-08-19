import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SportsologyApi {

	private baseUrl = "https://sportsology-b6e00.firebaseio.com";
	
	constructor(private http: Http) {}
}