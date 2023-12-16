import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Country, League, LeagueResponse } from '../model';
import { CommonModule } from '@angular/common';
import { FootballService } from '../service/football.service';
import { StandingsComponent } from '../standings/standings.component';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, StandingsComponent],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent {
  selectedLeague: number = 0;
  selectedCountry: string = '';

  countryList: Country[] = [
    {
      name: 'England',
      id: 'englandSelect',
      topLeague: 'Premier League',
    },
    {
      name: 'Spain',
      id: 'spainSelect',
      topLeague: 'La Liga',
    },
    {
      name: 'France',
      id: 'franceSelect',
      topLeague: 'Ligue 1',
    },
    {
      name: 'Germany',
      id: 'germanySelect',
      topLeague: 'Bundesliga',
    },
    {
      name: 'Italy',
      id: 'italySelect',
      topLeague: 'Serie A',
    },
  ];

  constructor(
    private footballService: FootballService,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * To fetch league ids
   */
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.selectedLeague = JSON.parse(params.get('leagueId') || '0');
      const countries : Country[]  = JSON.parse(params.get('countries') || '[]');
      if(countries.length){
        this.countryList = countries;
      }
    });
    this.footballService.getCurrentSeasonLeagues().subscribe((response: LeagueResponse) => {
      this.setLeagueId(response?.api?.leagues);
    });
  }

  /**
   * To display standing component for the selected country
   */
  onCountryChange(item: Country) {
    this.selectedLeague = item.leagueId || 0;
  }

  /**
   * To get league id for the current season and the input cocuntries
   * @param leagues
   */
  setLeagueId(leagues: League[]) {
    for (let item of this.countryList) {
      let league: League[] = leagues.filter(
        (data: League) =>
          data.country === item.name &&
          data.name === item.topLeague &&
          data.is_current === 1
      );
      if (league?.length && league[0].league_id) {
        item.leagueId = league[0].league_id;
      }
    }
  }
}
