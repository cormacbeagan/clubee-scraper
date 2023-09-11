import { load } from "cheerio";
import fetch from "node-fetch";
const url =
  "https://www.rugbydeutschland.org/spiele-81794v4/leagues/2161/seasons/214";

const regioUrl =
  "https://www.clubee.com/rugbyverbandbayernev/results-league-2239";

const stustaUrl =
  "https://www.clubee.com/stustarugbyabteilungdessvsfev/kalender-72078v4?types=event%2Ctraining%2Cgame&date=2023-09-30T23%3A59%3A59%2B00%3A00";

export const scraper = async (league: string) => {
  const response = await fetch(url);
  const data = await response.text();
  const $ = load(data);
  // find the script tag with id id="__NEXT_DATA__" and get the text content
  const script = $("#__NEXT_DATA__").html();
  if (!script) {
    throw new Error("Could not find script tag with id __NEXT_DATA__");
  }
  const json = JSON.parse(script);

  return json.props.pageProps.initialSections[0].data.games;
};
