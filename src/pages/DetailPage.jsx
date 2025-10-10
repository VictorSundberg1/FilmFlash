import './DetailPage.css';
import DetailCard from '../components/DetailCard';
import { useParams } from 'react-router';
import { useGetMovieDetailsQuery } from '../features/apiSlice';

function DetailPage() {
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(id);

  if (isLoading) return <h1>Loading..</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="detail-page">
      <DetailCard movie={movie} />
    </div>
  );
}

export default DetailPage;
