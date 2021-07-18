import React, {useEffect, useState} from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css'
import CustomPagination from "../../components/Pagination/CustomPagination";

export const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState<number>(1);
    const fetchTrendingItems = async () => {
        const {data} = await axios
            .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        setContent(data.results);
    }

    useEffect(() => {
        fetchTrendingItems()
        // eslint-disable-next-line
    }, [page])

    return (
        <div>
            <span className={"pageTitle"}>Trending</span>
            <div className={"trending"}>
                {
                    content && content.map((content: any, index: number) => (
                        <SingleContent
                            key={index}
                            id={content?.id}
                            poster={content.poster_path}
                            media_type={content.media_type}
                            vote_average={content.vote_average}
                            title={content.title || content.name}
                            date={content.first_air_date || content.release_date}
                        />
                    ))
                }
            </div>
            <CustomPagination setPage={setPage} numberOfPages={10}/>
        </div>
    )
}

export default Trending
