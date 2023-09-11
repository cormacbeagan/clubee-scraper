import { IGame } from "./types";

export const generateHtml = (games: IGame[]) => {
  const htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>

<style>
body {
  margin: 0;
  font-family: Catamaran, Helvetica, sans-serif;
  background: #1b252f;
}

* {
  border: none;
}

table {
  margin: 10px auto;
  width: 80%;
  height: 100%;
  min-height: 300px;
  min-width: 300px;
  background: #1b252f;
  border: 1px solid white;
  border-radius: 2px;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

tbody {
  background: white;
  border-radius: 3px;
}

th {
  padding: 0 5px 0 5px;
}

tr {
  border: 1px solid #1b252f;
  margin-top: 8px;
  border-radius: 1px;
  background: #1b252f;
}

tr:last-child {
  height: 10px;
  font-size: 12px;
  text-align: right;
  margin: 0;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.link {
  padding: 0;
  padding-bottom: 2px;
}

td {
  padding: 0 3px 0 3px;
  border-radius: 1px;
  max-width: 160px;
  overflow: hidden;
}

.center {
  text-align: center;
}

.date-cell {
  background: #1b252f;
  color: white;
}

.team-cell {
  background: white;
}

.results-cell {
  background: #cecece;
}

.align-right {
  text-align: right;
}

.align-left {
  text-align: left;
}

.align-center {
  text-align: center;
}

.empty-row-cell {
  height: 2px;
  border: 5px solid #1b252f;
  border-radius: 4px;
  background: #cecece;
}
</style>

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
