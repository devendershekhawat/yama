import React, { useEffect, useState } from 'react';
import { Input, Pagination, Empty } from 'antd';

import './MovieExplorer.scss';
import useDebounce from '../../Hooks/useDebounce';
import useFetch from '../../Hooks/useFetch';
import { SEARCH_URL } from '../../Constants/URLs';
import IMovie from '../../Models/IMovie';
import { MovieMetadata, moviesTransformer } from '../../Utils/transformers';
import MovieList from '../MovieList';

function MovieExplorer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState<Array<IMovie>>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data, loading, getData } = useFetch<MovieMetadata>(SEARCH_URL, { query: debouncedSearchQuery, page: currentPage }, moviesTransformer);

    useEffect(() => {
        const getMovies = async () => await getData();
        if (debouncedSearchQuery.length >= 2) {
            getMovies();
        } else {
            setMovies([]);
        }
    }, [debouncedSearchQuery, currentPage]);

    useEffect(() => {
        if (data) {
            setMovies(data.movies);
            setTotalResults(data.totalItems);
        }
    }, [data, loading]);

    return (
        <div className='MovieExplorer'>
            <div className="MovieExplorer--Search">
                <Input
                    bordered={false}
                    size='large'
                    placeholder='Type here to search for a movie'
                    width='100%'
                    value={searchQuery}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
                />
            </div>
            <div className='MovieExplorer--List'>
                {!loading && movies.length === 0 && debouncedSearchQuery.lenght >= 2 &&
                <Empty description='No Movies Found' />}
                <MovieList movies={movies as Array<IMovie>} loading={loading} />
                <br />
                {movies.length > 0 && <Pagination defaultPageSize={20} showSizeChanger={false} onChange={(page) => setCurrentPage(page)} current={currentPage} total={totalResults} />}
            </div>
        </div>
    );
}

export default MovieExplorer;
