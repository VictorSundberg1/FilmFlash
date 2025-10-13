/**
 * Calculates a dynamic price for a movie based on its release year, popularity, and vote average.
 *
 * @param {Object} movie - The movie object containing at least `release_date`, `popularity`, and `vote_average`.
 * @param {string} movie.release_date - Release date in the format "YYYY-MM-DD".
 * @param {number} movie.popularity - Popularity score.
 * @param {number} movie.vote_average - Average user rating (0–10).
 *
 * @returns { number}
 * Returns the calculated price of the movie.
 */
export const calculateMoviePrice = (movie) => {
  const BASE_PRICE = 150;

  const POPULARITY_MODIFIER_MAX = 1.5;
  const POPULARITY_MODIFIER_MIN = 1;
  const POPULARITY_MODIFIER_BASE = 0;

  const VOTE_MODIFIER_MAX = 1.5;
  const VOTE_MODIFIER_MIN = 0.5;
  const VOTE_MODIFIER_BASE = 0.3;

  const AGE_MODIFIER_NEW = 1.0;
  const AGE_MODIFIER_5_YEARS = 0.8;
  const AGE_MODIFIER_10_YEARS = 0.75;
  const AGE_MODIFIER_20_YEARS = 0.6;
  const AGE_MODIFIER_VERY_OLD = 0.4;

  const yearNow = new Date().getFullYear();
  const releaseYear = parseInt(movie.release_date?.slice(0, 4), 10) || yearNow; //Plockar ut de första 4 siffrorna ur utgivningsdatum
  const age = yearNow - releaseYear;

  let ageModifier;

  if (age < 1) {
    ageModifier = AGE_MODIFIER_NEW;
  } else if (age <= 5) {
    ageModifier = AGE_MODIFIER_5_YEARS;
  } else if (age <= 10) {
    ageModifier = AGE_MODIFIER_10_YEARS;
  } else if (age <= 20) {
    ageModifier = AGE_MODIFIER_20_YEARS;
  } else {
    ageModifier = AGE_MODIFIER_VERY_OLD;
  }

  const popularityModifier =
    POPULARITY_MODIFIER_BASE +
    Math.min(
      POPULARITY_MODIFIER_MAX,
      Math.max(POPULARITY_MODIFIER_MIN, movie.popularity / 100)
    );
  const voteModifier =
    VOTE_MODIFIER_BASE +
    Math.min(
      VOTE_MODIFIER_MAX,
      Math.max(VOTE_MODIFIER_MIN, movie.vote_average / 10)
    );
  let price = BASE_PRICE * popularityModifier * voteModifier * ageModifier;

  // console.log("Movie: ", movie.title);
  // console.log("Popularity: ", movie.popularity);
  // console.log("Popularity adjustment: ", popularityModifier);
  // console.log("Vote average: ", movie.vote_average);
  // console.log("Vote adjustment: ", voteModifier);
  // console.log("Age: ", age);
  // console.log("Age adjustment:", ageModifier);

  //Avrunda
  price = Math.round(price * 2) / 2;

  return price;
};
