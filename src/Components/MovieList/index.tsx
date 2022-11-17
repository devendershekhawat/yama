import React, { useState } from 'react';
import { Row, Col, Spin } from 'antd';
import IMovie from '../../Models/IMovie';
import MovieCard from '../MovieCard';
import MovieDetails from '../MovieDetails';

interface MovieListProps {
    movies: Array<IMovie>;
    loading?: boolean;
}

function MovieList({ movies, loading}: MovieListProps) {
    const [showMovieDetails, setShowMovieDetails] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);

    if (loading) {
        return <Spin size='large' />;
    }

    function onSelectMovie(movie:IMovie) {
        setSelectedMovie(movie);
        setShowMovieDetails(true);
    }

    return (
        <>
            <MovieDetails
                movieId={selectedMovie ? selectedMovie.id : 0}
                show={showMovieDetails}
                movieTitle={selectedMovie ? selectedMovie.title : ''}
                onClose={() => setShowMovieDetails(false)}
            />
            <div className='MovieList'>
                <Row gutter={[16, 16]}>
                    {movies.map(movie => (
                        <Col xs={24} sm={12} md={6} key={movie.id}>
                            <MovieCard onSelect={onSelectMovie} movie={movie} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default MovieList;
