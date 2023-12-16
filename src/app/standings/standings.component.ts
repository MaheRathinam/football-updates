import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Country, Fixtures, StandingResponse, Standings } from '../model';
import { FootballService } from '../service/football.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './standings.component.html',
  styleUrl: './standings.component.scss',
})
export class StandingsComponent {
  displayedColumns: string[] = [
    'position',
    'logo',
    'teamName',
    'matchsPlayed',
    'win',
    'draw',
    'lose',
    'goalsDiff',
    'points',
  ];
  dataSource: Standings[] = [];
  selectedTeam: number = 0;
  @Input() leagueId: number = 0;
  @Input() countries: Country[] = [];


  constructor(
    private footballService: FootballService,
    private route: Router
  ) {}
  /**
   * Display standings based on the user selected country
   */
  ngOnChanges() {
    if (this.leagueId) {
      this.footballService
        .getStangingsByLeague(this.leagueId)
        .subscribe((response: StandingResponse) => {
          let standings: Standings[] = response.api.standings[0];
          this.dataSource = standings.map((r: Standings) => ({
            logo: r.logo,
            teamName: r.teamName,
            matchsPlayed: r.all?.matchsPlayed,
            win: r.all?.win,
            lose: r.all?.lose,
            draw: r.all?.lose,
            goalsDiff: r.goalsDiff,
            points: r.points,
            team_id: r.team_id,
          }));
        });
    }
  }

  /**
   * To load Fixture component for the selected team
   */
  getFixtures(row: Fixtures) {
    this.selectedTeam = row.team_id || 0;
    this.route.navigate(['/fixture'], {
      queryParams: {
        teamId: JSON.stringify(row.team_id),
        leagueId: JSON.stringify(this.leagueId),
        countries : JSON.stringify(this.countries),
      },
    });
  }
}
