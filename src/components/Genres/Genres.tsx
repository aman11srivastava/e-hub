import React, {useEffect} from "react";
import axios from "axios";
import {Chip} from "@material-ui/core";
import {GenreType} from "../../utils/utils";

interface GenresProps {
    type: string
    genres: GenreType[]
    selectedGenres: GenreType[]
    setGenres: (val: GenreType[] | any) => void;
    setSelectedGenres: (val: GenreType[]) => void
    page: number
    setPage: (val: number) => void;
}

export const Genres = ({genres, selectedGenres, type, setGenres, setSelectedGenres, page, setPage}: GenresProps) => {

    const handleAdd = (genre: GenreType) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter((g:GenreType) => g.id !== genre.id))
        setPage(1);
    }

    const handleRemove = (genre: GenreType) => {
        setSelectedGenres(
            selectedGenres.filter((selected: GenreType) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenre = async () => {
        const {data} = await axios
            .get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenres(data.genres)
    }

    useEffect(() => {
        fetchGenre()

        return () => {
            setGenres({})
        }
        // eslint-disable-next-line
    }, [page])

    return(
        <div style={{padding: '6px 0s'}}>
            {
                selectedGenres && selectedGenres.map((val: GenreType) => (
                    <Chip label={val.name} key={val.id}
                          color={"primary"}
                          style={{margin: 2}} clickable={true}
                          onDelete={() => handleRemove(val)}

                    />
                ))
            }
            {
                genres && genres.map((val: GenreType) => (
                    <Chip label={val.name} key={val.id}
                        style={{margin: 2}} clickable={true}
                          onClick={() => handleAdd(val)}
                    />
                ))
            }
        </div>
    )
}

export default Genres
