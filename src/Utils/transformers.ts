import IGenre from '../Models/IGenre';
import IMovie, { ListName } from '../Models/IMovie';
import { getPosterUrl } from './imageUtils';
import { getLists } from './listUtils';

export interface MovieMetadata {
    movies: Array<IMovie>;
    totalItems: number;
    currentPage: number;
}

function movieTransformer(item:any): IMovie{
    const movie: IMovie = {
        id: item.id,
        title: item.original_title,
        overview: item.overview,
        genres: item.genres || getGenresFromIds(item.genre_ids),
        poster: getPosterUrl(item.poster_path),
        backdrop: getPosterUrl(item.backdrop_path),
        adult: item.adult,
        tagline: item.tagline || '',
        languages: item.spoken_languages ? item.spoken_languages.map((language:any) => language.name) : [],
        list: _getListForMovie(item.id),
        releaseDate: item.release_date,
    };
    return movie;
}

function moviesTransformer(dataFromNetwork:any): MovieMetadata {
    let movies: Array<IMovie> = [];
    if (dataFromNetwork === null || dataFromNetwork == undefined) {
        return {
            movies: [],
            totalItems: 0,
            currentPage: 0,
        };
    }

    movies = dataFromNetwork.results.map(movieTransformer);

    return {
        movies,
        totalItems: dataFromNetwork.total_results,
        currentPage: dataFromNetwork.page,
    };
}

function genreTransformer(dataFromNetwork:any): Array<IGenre> {
    const genre: Array<IGenre> = [];
    if (dataFromNetwork === null || dataFromNetwork === undefined) return genre;
    
    return dataFromNetwork.genres.map((item: any) => {
        const genre: IGenre = {
            id: item.id,
            name: item.name,
        };
        return genre;
    });
}

function getGenresFromIds(genreIds:Array<number>) {
    let genres: Array<IGenre> = [];
    const allGenresString = localStorage.getItem('Genres');
    if (allGenresString === null) return genres;
    const allGenres: Array<IGenre> = JSON.parse(allGenresString);
    genres = allGenres.filter(genre => genreIds.includes(genre.id));
    return genres;
}

function _getListForMovie(movieId: number): ListName{
    const lists = getLists();
    if (lists.watched.find(movie => movie.id === movieId)) return 'Watched';
    else if (lists.wantToWatch.find(movie => movie.id === movieId)) return 'Want to watch';
    else return null;
}

export { moviesTransformer, movieTransformer, genreTransformer };
