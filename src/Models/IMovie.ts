import IGenre from './IGenre';

export type ListName = 'Watched' | 'Want to watch' | null;

export interface IMovieImage {
    src: string | null;
    srcset: string | null;
}

interface IMovie {
    id: number,
    title: string;
    overview: string;
    adult: boolean;
    languages?: Array<string>;
    list: ListName;
    tagline?: string;
    poster: IMovieImage
    backdrop: IMovieImage;
    genres: Array<IGenre>;
    releaseDate: string;
}

export default IMovie;
