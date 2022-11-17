import React, { useEffect } from 'react';
import { Modal, Button, Spin, Typography, Space, Tag } from 'antd';
import useFetch from '../../Hooks/useFetch';
import { MOVIE_URL } from '../../Constants/URLs';
import { movieTransformer } from '../../Utils/transformers';
import MoviePoster from '../MoviePoster';

import './MovieDetails.scss';
import AddToList from '~/Components/AddToList';
import IMovie from '~/Models/IMovie';

interface MovieDetailsProps {
    show: boolean;
    onClose: () => void;
    movieTitle: string;
    movieId: number;
}

function MovieDetails({ show, onClose, movieTitle, movieId }: MovieDetailsProps) {
    const { data: movie, loading, getData } = useFetch(`${MOVIE_URL}/${movieId}`, {}, movieTransformer);

    useEffect(() => {
        const getMovie = async () => getData();
        if (movieId) {
            getMovie();
        }
    }, [movieId]);

    return (
        <Modal
            title={movieTitle}
            open={show}
            width='700px'
            onCancel={onClose}
            footer={[
                <Button key='close' onClick={() => onClose()}>Close</Button>,
                <AddToList movie={movie as IMovie} key='AddToList' />,
            ]}
        >
            {loading && <Spin size='large' />}
            {movie !== null && (
                <div className='MovieDetails'>
                    <div className='MovieDetails--Header'>
                        <MoviePoster poster={movie?.poster} title={movie?.title} />
                        <div className='MovieDetails--Header--Description'>
                            <Typography.Title level={3}>{movie.title}</Typography.Title>
                            <Space>
                                <Tag color={movie.adult ? 'red' : 'green'}>Adult: {movie.adult ? 'Yes' : 'No'}</Tag>
                                {movie.languages && movie.languages.length > 0 && (
                                    <Tag color='gold'>Languages: {movie.languages.join(', ')}</Tag>
                                )}
                            </Space>
                            <br />
                            <br />
                            {movie.tagline && <Typography.Text>{movie.tagline}</Typography.Text>}
                            <br />
                            <br />
                            <Typography.Text>{movie.overview}</Typography.Text>
                            <br />
                            <br />
                            <Space>
                                {movie.genres.map(genre => (
                                    <Tag key={genre.id} color='magenta'>{genre.name}</Tag>
                                ))}
                            </Space>
                            <br />
                            <br />
                            <Typography.Text code>Release Date: {movie.releaseDate}</Typography.Text>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default MovieDetails;
