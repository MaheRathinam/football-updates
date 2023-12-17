import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Country, League, LeagueId, LeagueIds, LeagueResponse } from '../model';
import { CommonModule } from '@angular/common';
import { FootballService } from '../service/football.service';
import { StandingsComponent } from '../standings/standings.component';
import { ActivatedRoute } from '@angular/router';

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
  selectedSeason: number = 0;

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

  leagueIds: LeagueIds = {
    england: { topLeague: 'Premier League', leagueId: 0, season: 0 },
    spain: { topLeague: 'La Liga', leagueId: 0, season: 0 },
    france: { topLeague: 'Ligue 1', leagueId: 0, season: 0 },
    germany: { topLeague: 'Bundesliga', leagueId: 0, season: 0 },
    italy: { topLeague: 'Serie A', leagueId: 0, season: 0 },
  };

  constructor(
    private footballService: FootballService,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * To fetch league ids
   */
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.selectedLeague = JSON.parse(params.get('leagueId') || '0');
      this.selectedSeason = JSON.parse(params.get('season') || '0');
      this.selectedCountry = JSON.parse(params.get('country') || '0');
    });
  }

  /**
   * To display standing component for the selected country
   */
  onCountryChange(country: Country) {
    this.selectedCountry = country.name;
    let league: LeagueId =
      this.leagueIds[country.name.toLowerCase() as keyof typeof this.leagueIds];
    if (league.leagueId) {
      this.selectedLeague = league.leagueId;
      this.selectedSeason = league.season;
    } else {
      this.footballService
        .getCurrentSeasonLeagues(country.name)
        .subscribe((data: LeagueResponse) => {
          let topLeagueData: League[] = data?.response.filter(
            (item) =>
              item.league.name === league.topLeague &&
              item.country.name === country.name
          );
          this.selectedLeague = topLeagueData[0].league.id;
          this.selectedSeason = topLeagueData[0].seasons[0].year;
          league.leagueId = this.selectedLeague;
          league.season = this.selectedSeason;
        });
    }
  }
}
