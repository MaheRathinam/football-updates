import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeagueResponse, StandingResponse, FixturesResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  httpHeaders: HttpHeaders = new HttpHeaders({
    'x-rapidapi-key': '4861e1ef198d48f5785fb26771174df3',
  });
  apiURL: string = 'https://v2.api-football.com';

  constructor(private http: HttpClient) {}

  /**
   * To fetch current season league ids
   */
  getCurrentSeasonLeagues(): Observable<LeagueResponse> {
    return this.http.get<LeagueResponse>(`${this.apiURL}/leagues/current/`, {
      headers: this.httpHeaders,
    });
  }

  /**
   * To fetch Stanings for the input league id
   */
  getStangingsByLeague(leagueId: number): Observable<StandingResponse> {
    return this.http.get<StandingResponse>(
      `${this.apiURL}/leagueTable/${leagueId}`,
      {
        headers: this.httpHeaders,
      }
    );
  }

  /**
   * To fetch fixtures for the selected team
   */
  getFixturesForTeam(teamId: number): Observable<FixturesResponse> {
    return this.http.get<FixturesResponse>(
      `${this.apiURL}/fixtures/team/${teamId}/last/10`,
      {
        headers: this.httpHeaders,
      }
    );
  }
}
