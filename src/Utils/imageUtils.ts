import { IMovieImage } from '../Models/IMovie';

export function getPosterUrl(imagePath: string): IMovieImage {
    return {
        src: imagePath ? `https://www.themoviedb.org/t/p/w200_and_h330_face${imagePath}` : null,
        srcset: imagePath ? `https://www.themoviedb.org/t/p/w220_and_h330_face${imagePath} 1x, https://www.themoviedb.org/t/p/w440_and_h660_face${imagePath} 2x` : null,
    };
}
