import { createContext } from 'react';
import ILists from '~/Models/ILists';

interface IListContext {
    lists: ILists;
    setLists: any;
}

const defaultListContext: IListContext = {
    lists: {
        watched: [],
        wantToWatch: [],
    },
    setLists: undefined,
};

const ListContext = createContext(defaultListContext);

export default ListContext;
