import React from 'react';
import { IMovieImage } from '../../Models/IMovie';

import './MoviePoster.scss';

interface MoviePosterProps {
    poster: IMovieImage;
    title: string;
}

function MoviePoster({ poster, title }: MoviePosterProps) {
    if (poster.src === null) {
        return <div className='MoviePoster--Text'>{title}</div>;
    }

    return <img alt={title} src={poster.src} srcSet={poster.srcset || ''} />;
}

export default MoviePoster;
