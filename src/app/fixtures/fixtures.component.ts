import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FixturesResponse, Team } from '../model';
import { MatTableModule } from '@angular/material/table';
import { FootballService } from '../service/football.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.scss',
})
export class FixturesComponent {
  dataSource: Team[] = [];
  displayedColumns: string[] = [
    'homeLogo',
    'homeTeamName',
    'goalsHomeTeam',
    'separator',
    'goalsAwayTeam',
    'awayTeamName',
    'awayTeamLogo',
  ];
  leagueId: number = 0;
  selectedCountry: string = '';
  season: number = 0;
  constructor(
    private footballService: FootballService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Fetch last  10 games for the selected team
   */
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      let teamId: number = parseInt(params.get('teamId') ?? '0');
      this.leagueId = parseInt(params.get('leagueId') ?? '0');
      this.season = parseInt(params.get('season') ?? '0');
      this.selectedCountry = params.get('country') ?? '';
      if (teamId) {
        this.getRecentResults(teamId);
      }
    });
  }

  /**
   * To fetch last  10 game results for the selected team
   */
  private getRecentResults(teamId: number): void {
    this.footballService
      .getRecentMatchesForTeam(teamId, this.leagueId, this.season)
      .subscribe((data: FixturesResponse) => {
        let teams: Team[] = data.response;
        this.dataSource = teams.map((item: Team) => ({
          homeLogo: item.teams.home.logo,
          homeTeamName: item.teams.home.name,
          awayTeamName: item.teams.away.name,
          awayTeamLogo: item.teams.away.logo,
          goalsAwayTeam: item.goals.away,
          goalsHomeTeam: item.goals.home,
          home: item.teams.home,
          away: item.teams.away,
          goals: item.goals,
          teams: item.teams,
        }));
      });
  }

  /**
   * To load previous selected country when the user clicks back button
   */
  navigateBack() {
    this.route.navigate(['/country'], {
      queryParams: {
        leagueId: this.leagueId,
        season: this.season,
        country: this.selectedCountry,
      },
    });
  }
}
