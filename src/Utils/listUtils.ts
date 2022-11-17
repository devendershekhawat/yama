import { message } from 'antd';
import ILists from '~/Models/ILists';
import IMovie, { ListName } from '~/Models/IMovie';

export function createLists(): void {
    if (localStorage.getItem('Lists') === null) {
        const lists = {
            watched: [],
            wantToWatch: [],
        };
        localStorage.setItem('Lists', JSON.stringify(lists));
    }
}

export function setLists(lists: ILists) {
    localStorage.setItem('Lists', JSON.stringify(lists));
}

export function getLists(): ILists {
    const listStringified = localStorage.getItem('Lists');
    return JSON.parse(listStringified as string) as ILists;
}

export function addToList(movie: IMovie, list: ListName, listSetter: any, lists: ILists) {
    movie.list = list;
    const newList = { ...lists };
    newList.watched = newList.watched.filter(m => m.id !== movie.id);
    newList.wantToWatch = newList.wantToWatch.filter(m => m.id !== movie.id);
    if (list === 'Watched') newList.watched.push(movie);
    else newList.wantToWatch.push(movie);
    listSetter(newList);
    message.success(`Added to ${list}`);
}
