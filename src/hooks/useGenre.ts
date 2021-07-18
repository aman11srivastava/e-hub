import {GenreType} from "../utils/utils";

const useGenre = (selectedGenres: GenreType[]) => {
    if (selectedGenres.length < 1){
        return '';
    }
    else {
        const genreId: number[] = selectedGenres.map((genre: GenreType) => genre.id);
        // @ts-ignore
        return genreId.reduce((acc: number, cur: number) => acc + "," + cur);
    }
}

export default useGenre;
