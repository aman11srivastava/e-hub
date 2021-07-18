import React, {useEffect, useState} from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import {GenreType} from "../../utils/utils";
import useGenre from "../../hooks/useGenre";

export const Series = () => {
    const [page, setPage] = useState<number>(1);
    const [content, setContent] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState<number>();
    const [selectedGenres, setSelectedGenres] = useState<GenreType[]>([]);
    const [genres, setGenres] = useState<GenreType[]>([]);
    const genreforURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreforURL])

    return (
        <div>
            <span className={"pageTitle"}>Discover TV Shows</span>
            <Genres
                page={page}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                type={"tv"}
                genres={genres}
                selectedGenres={selectedGenres}
                setPage={setPage}
            />
            <div className={"trending"}>
                {
                    content && content.map((content: any, index: number) => (
                        <SingleContent
                            key={index}
                            id={content?.id}
                            poster={content.poster_path}
                            media_type={'tv'}
                            vote_average={content.vote_average}
                            title={content.title || content.name}
                            date={content.first_air_date || content.release_date}
                        />
                    ))
                }
            </div>
            {
                numberOfPages && numberOfPages > 1 &&
                <CustomPagination setPage={setPage} numberOfPages={numberOfPages}/>
            }
        </div>
    )
}

export default Series
