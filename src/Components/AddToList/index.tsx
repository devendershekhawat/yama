import { Button, Popover, Radio, RadioChangeEvent } from 'antd';
import React, { ReactNode, useContext, useState } from 'react';
import ListContext from '~/Contexts/ListContext';
import IMovie, { ListName } from '~/Models/IMovie';
import { addToList } from '~/Utils/listUtils';

interface AddToListProps {
    movie: IMovie;
}

const options = [
    {value: 'Watched', label: 'Watched'},
    {value: 'Want to watch', label: 'Want to watch'},
];

function AddToList({ movie }: AddToListProps) {
    if (!movie) return null;
    if (movie.list === null) return (
        <AddToListPopover
            movie={movie}
        >
            <Button>Add to a list</Button>;
        </AddToListPopover>
    );

    return (
        <AddToListPopover movie={movie}>
            <Button color='primary'>{movie.list}</Button>
        </AddToListPopover>
    );
}

function AddToListPopover({ movie, children }: { movie: IMovie; children: ReactNode }) {
    const [selectedList, setSelectedList] = useState(movie.list);
    const { lists, setLists } = useContext(ListContext);

    const handleChangeList = (event: RadioChangeEvent) => {
        if (event.target.value === 'Watched') addToList(movie, 'Watched', setLists, lists);
        else addToList(movie, 'Want to watch', setLists, lists);
        setSelectedList(event.target.value as ListName);
    };

    return (
        <Popover
            style={{ marginLeft: '10px' }}
            title='Add to a list'
            trigger='click'
            content={
                <Radio.Group onChange={handleChangeList} options={options} value={selectedList} optionType='button' />
            }
        >
            {children}
        </Popover>
    );
}

export default AddToList;
