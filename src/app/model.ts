export interface Country {
  name: string;
  id: string;
  topLeague: string;
  leagueId?: number;  
}

export type LeagueResponse = {
  api: {
    results: number;
    leagues: League[];
  };
};

export type League = {
  league_id: number;
  name: string;
  type?: string;
  country: string;
  country_code: string;
  season: number;
  season_start?: string;
  season_end?: string;
  logo?: string;
  flag?: string;
  standings?: number;
  is_current: number;
};

export type Standings = {
  team_id: number;
  teamName: string;
  logo: string;
  group?: string;
  matchsPlayed?: number;
  win?: number;
  draw?: number;
  lose?: number;
  all?: {
    matchsPlayed: number;
    win: number;
    draw: number;
    lose: number;
  };
  goalsDiff: number;
  points: number;
};

export type StandingResponse = {
  api: {
    results: number;
    standings: Standings[][];
  };
};

export type FixturesResponse = {
  api:{
    results: number;
    fixtures: Fixtures[];
  }
}

export type Fixtures = {
  team_id?: number;
  homeLogo?: string;
  homeTeamName?: string;
  awayTeamName?: string;
  awayTeamLogo?: string;
  homeTeam:{
    team_id : number;
    team_name: string;
    logo: string;
  };
  awayTeam:{
    team_id : number;
    team_name: string;
    logo: string;
  };  
  goalsHomeTeam: number;
  goalsAwayTeam: number;
}
