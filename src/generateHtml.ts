import { IGame } from "./types";

export const generateHtml = (games: IGame[]) => {
  const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" type="text/css" href="fixture-style.css">
</head>
<body>
  <table aria-label="Studentenstadt fixtures list>
  ${games
    .map((game) => {
      if (!game.plannedKickOff) return "";
      return `
    <tr>
        <td class="dateday align-right date-cell">
            ${new Date(game.plannedKickOff).toLocaleDateString("de-DE", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
        </td>
        <td class="date-cell"></td>
        <td class="datetime date-cell">
            ${new Date(game.plannedKickOff).toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
        </td>
        </tr>
        <tr>
        <td class="align-right team-cell">${game.homeTeam.name}</td>
        <td class="team-cell align-center"> - </td>
        <td class="team-cell">${game.awayTeam.name}</td>
        </tr>
        <tr>
        <td class="align-right results-cell">${
          game.liveData.homeScore ?? 0
        }</td>
        <td class="results-cell align-center">:</td>
        <td class="results-cell">${game.liveData.awayScore ?? 0}</td>
    </tr>
    `;
    })
    .join("")}
  <tr>
    <td colspan="7" class="link">
      <a href="https://www.rugbydeutschland.org/" title="DRV" target="_blank" rel="noreferrer">&copy; DRV</a>
    </td>
  </tr>
  </table>
  </body>
  </html>`;

  return htmlString;
};
