import "./DetailPage.css";
import DetailCard from "../components/DetailCard";
import { useLocation, useParams } from "react-router";
import { useGetMovieDetailsQuery } from "../features/apiSlice";
import { calculateMoviePrice } from "../utils/calculateMoviePrice";

function DetailPage() {
  const { id } = useParams();
  //Används för att plocka ut det som skickas in som state
  const location = useLocation();
  const { data: movieData, error, isLoading } = useGetMovieDetailsQuery(id);

  if (isLoading) return <h1>Loading..</h1>;
  if (error) return <h1>Error</h1>;

  /**
   * Priset baseras på filmdata och filmdatan vi får via search/discovery kan skilja sig från det man får från
   * details (oftast vote och popularity score). Därför skickas originalpriset in och knyts till movie-objektet
   * för att inte få olika priser i olika vyer. Följer inte priset med (ex. via deep-link) används datan från
   * details för att beräkna priset.
   * **/
  const price = location.state?.price || calculateMoviePrice(movie);
  const movie = { ...movieData, price: price };

  return <DetailCard movie={movie} price={price} />;
}

export default DetailPage;
