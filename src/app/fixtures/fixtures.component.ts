import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Country, Fixtures, FixturesResponse } from '../model';
import { MatTableModule } from '@angular/material/table';
import { FootballService } from '../service/football.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.scss'
})
export class FixturesComponent {
  dataSource: Fixtures[] = [];
  displayedColumns: string[] = [
    'homeLogo',
    'homeTeamName',
    'goalsHomeTeam',
    'separator',
    'goalsAwayTeam',
    'awayTeamName',
    'awayTeamLogo'    
  ];
  leagueId: number = 0;
  countries: Country[] = [];
  constructor(
    private footballService: FootballService,
    private activatedRoute: ActivatedRoute, 
    private route: Router   
  ) {}

  /**
   * Fetch last  10 games for the selected team
   */
  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      let teamId: number = JSON.parse(params.get('teamId') || '');
      this.leagueId = JSON.parse(params.get('leagueId') || '');
      this.countries = JSON.parse(params.get('countries') || '');
      if(teamId){
        this.footballService.getFixturesForTeam(teamId).subscribe((response: FixturesResponse) => {
          let fixtures : Fixtures[] = response.api.fixtures;
          this.dataSource = fixtures.map((r: Fixtures) => ({
            homeLogo: r.homeTeam.logo,
            homeTeamName: r.homeTeam.team_name,                  
            awayTeamName: r.awayTeam.team_name,
            awayTeamLogo: r.awayTeam.logo,    
            homeTeam: r.homeTeam,
            awayTeam: r.awayTeam,
            goalsAwayTeam: r.goalsAwayTeam,
            goalsHomeTeam: r.goalsHomeTeam                   
          }));
          
        });
      }
    });
  }

  /**
   * To load previous selected country when the user clicks back button
   */
  navigateBack(){
    this.route.navigate(['/country'], {
      queryParams: { leagueId: JSON.stringify(this.leagueId), countries: JSON.stringify(this.countries) },
    });
  }
}
