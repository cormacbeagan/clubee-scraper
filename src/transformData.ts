import { IClubeeGame, IGame, initialGame } from "./types";

export const transformData = (data: IClubeeGame[]): IGame[] => {
  const stustaGames = data.filter(
    (game) =>
      game.team1.name === "StuSta Rugby" || game.team2.name === "StuSta Rugby"
  );
  return stustaGames.map((game) => {
    const date = new Date(game.start_date);
    const kickOff = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    return {
      ...initialGame,
      gameId: `${game.id}`,
      liveData: {
        ...initialGame.liveData,
        homeScore: game.score1,
        awayScore: game.score2,
      },
      gameSettings: {
        ...initialGame.gameSettings,
        kickOff: kickOff,
        totalTime: game.duration * 1000 ?? 0, // ms,
      },
      plannedKickOff: kickOff,
      homeTeam: {
        ...initialGame.homeTeam,
        name: game.team1.name,
      },
      awayTeam: {
        ...initialGame.awayTeam,
        name: game.team2.name,
      },
    };
  });
};
