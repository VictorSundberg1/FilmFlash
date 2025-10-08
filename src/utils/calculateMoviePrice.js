export const calculateMoviePrice = (movie) => {
  const basePrice = 100;

  const releaseYear = parseInt(movie.release_date.slice(0, 4), 10);
  const age = new Date().getFullYear() - releaseYear;

  let ageAdjustment;

  if (age < 1) {
    ageAdjustment = 2;
  } else if (age <= 5) {
    ageAdjustment = 1.75;
  } else if (age <= 10) {
    ageAdjustment = 1.5;
  } else if (age <= 20) {
    ageAdjustment = 1.0;
  } else {
    ageAdjustment = 0.75;
  }

  const popularityAdjustment = Math.min(
    2,
    Math.max(0.75, movie.popularity / 100)
  );
  const voteAdjustment = Math.min(1.5, Math.max(0.75, movie.vote_average / 10));
  const price =
    basePrice * popularityAdjustment * voteAdjustment * ageAdjustment;

  console.log("Movie: ", movie.title);
  console.log("Popularity: ", movie.popularity);
  console.log("Popularity adjustment: ", popularityAdjustment);
  console.log("Vote average: ", movie.vote_average);
  console.log("Vote adjustment: ", voteAdjustment);
  console.log("Age: ", age);
  console.log("Age adjustment:", ageAdjustment);
  return price;
};
