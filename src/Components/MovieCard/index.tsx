import React from 'react';
import { Tag } from 'antd';
import IMovie from '../../Models/IMovie';
import MoviePoster from '../MoviePoster';

import './MovieCard.scss';

interface MovieCardProps {
    movie: IMovie;
    onSelect: (movie: IMovie) => void;
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
    return (
        <div className='MovieCard' onClick={() => onSelect(movie)}>
            <div className='MovieCard--Image'>
                <MoviePoster title={movie.title} poster={movie.poster} />
            </div>
            <div className='MovieCard--Details'>
                <div className='MovieCard--Details--Genres'>
                    {movie.genres.map(genre => (
                        <Tag className='MovieCard--Details--Genres--Tag' color='#000' key={genre.id}>{genre.name}</Tag>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
