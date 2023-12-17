export type Country = {
  name: string;
  id: string;
  topLeague: string;
  leagueId?: number;
};

export type LeagueResponse = {
  response: [League];
};

export type League = {
  league: {
    id: number;
    name: string;
    logo: string;
  };
  country: {
    name: string;
    code: string;
    flag: string;
  };
  seasons: [
    {
      year: number;
      current: string;
    }
  ];
};

export type Standings = {
  team?: {
    id: number;
    name: string;
    logo: string;
  };
  goalsDiff: number;
  points: number;
  matchsPlayed?: number;
  win?: number;
  draw?: number;
  lose?: number;
  team_id?: number;
  all?: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
};

export type StandingResponse = {
  response: [
    {
      league: {
        id: number;
        season: number;
        standings: Standings[][];
      };
    }
  ];
};

export type FixturesResponse = {
  response: [Team];
};

export type Team = {
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number;
    away: number;
  };

  homeLogo?: string;
  homeTeamName?: string;
  awayTeamName?: string;
  awayTeamLogo?: string;
  goalsHomeTeam: number;
  goalsAwayTeam: number;
};

type AllowedKeys = 'england' | 'spain' | 'france' | 'germany' | 'italy';
export type LeagueId = { topLeague: string; leagueId: number; season: number };
export type LeagueIds = { [K in AllowedKeys]: LeagueId };
