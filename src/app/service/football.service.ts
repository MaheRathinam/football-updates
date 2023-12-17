import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeagueResponse, StandingResponse, FixturesResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  apiURL: string = 'https://v3.football.api-sports.io';

  constructor(private http: HttpClient) {}

  /**
   * To fetch current season top league id for the  selected country
   */
  getCurrentSeasonLeagues(country: string): Observable<LeagueResponse> {
    return this.http.get<LeagueResponse>(
      `${this.apiURL}/leagues?current=true&country=${country}`
    );
  }

  /**
   * To fetch Standings for the input league id and season
   */
  getStangingsByLeague(
    leagueId: number,
    season: number
  ): Observable<StandingResponse> {
    return this.http.get<StandingResponse>(
      `${this.apiURL}/standings?league=${leagueId}&season=${season}`
    );
  }

  /**
   * To fetch last 10 games results for the selected team
   */
  getRecentMatchesForTeam(
    teamId: number,
    leagueId: number,
    season: number
  ): Observable<FixturesResponse> {
    return this.http.get<FixturesResponse>(
      `${this.apiURL}/fixtures?league=${leagueId}&season=${season}&team=${teamId}&last=10`
    );
  }
}
