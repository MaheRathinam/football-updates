import { Component, Input, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { StandingResponse, Standings } from '../model';
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
  @Input() country: string = '';
  @Input() season: number = 0;

  constructor(
    private footballService: FootballService,
    private route: Router
  ) {}

  /**
   * To detect league id changes
   */
  ngOnChanges(changes: SimpleChanges) {
    let currentValue = changes['leagueId']?.currentValue;
    if (currentValue && currentValue !== changes['leagueId']?.previousValue) {
      this.displayStandings();
    }
  }

  /**
   * Display standings of the top league for the selected country
   */
  private displayStandings(): void {
    this.footballService
      .getStangingsByLeague(this.leagueId, this.season)
      .subscribe((data: StandingResponse) => {
        let standings: Standings[] = data.response[0].league.standings[0];
        this.dataSource = standings.map((item: Standings) => ({
          logo: item.team?.logo,
          teamName: item.team?.name,
          matchsPlayed: item.all?.played,
          win: item.all?.win,
          lose: item.all?.lose,
          draw: item.all?.draw,
          goalsDiff: item.goalsDiff,
          points: item.points,
          team_id: item.team?.id,
        }));
      });
  }

  /**
   * To load Fixture component for the selected team
   */
  getFixtures(row: Standings) {
    this.selectedTeam = row.team_id || 0;
    this.route.navigate(['/fixture'], {
      queryParams: {
        teamId: row.team_id,
        leagueId: this.leagueId,
        season: this.season,
        country: this.country,
      },
    });
  }
}
