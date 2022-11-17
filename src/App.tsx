import { Collapse, Empty, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import './App.scss';
import ListContext from './Contexts/ListContext';
import MovieExplorer from './Components/MovieExplorer';
import MovieList from './Components/MovieList';
import { GENRE_URL } from './Constants/URLs';
import useFetch from './Hooks/useFetch';
import IGenre from './Models/IGenre';
import ILists from './Models/ILists';
import { createLists, getLists, setLists } from './Utils/listUtils';
import { genreTransformer } from './Utils/transformers';

function App() {
    const { loading, data, getData } = useFetch<Array<IGenre>>(GENRE_URL, {}, genreTransformer);
    const [lists, setListsState] = useState<ILists>(getLists());

    useEffect(() => {
        const getGenres = async () => getData();
        if (!localStorage.getItem('Genres')) {
            getGenres();
        }
    }, []);

    useEffect(() => {
        setLists(lists);
    }, [lists]);

    useEffect(() => {
        if (!loading && !localStorage.getItem('Genres') && data?.length) {
            localStorage.setItem('Genres', JSON.stringify(data));
        }
    }, [data, loading]);

    if (loading && data?.length === 0) return <Spin size='large' />;
    
    return (
        <ListContext.Provider value={{ lists, setLists: setListsState }}>
           
            <div className='App'>
                <Typography.Title level={1}>YAMA</Typography.Title>
                <MovieExplorer />
                <br />
                <Collapse bordered={false} >
                    <Collapse.Panel key='Watched' header='Watched'>
                        {lists.watched.length === 0 && <Empty description='List is empty' />}
                        {lists.watched.length > 0 && <MovieList movies={lists.watched}/>}
                    </Collapse.Panel>
                    <Collapse.Panel key='Want to watch' header='Want to watch'>
                        {lists.wantToWatch.length === 0 && <Empty description='List is empty' />}
                        {lists.wantToWatch.length > 0 && <MovieList movies={lists.wantToWatch}/>}
                    </Collapse.Panel>
                </Collapse>
            </div>
        </ListContext.Provider>
    );
}

export default App;
