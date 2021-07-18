import React from "react";
import './SingleContent.css'
import {img_300, unavailable} from "../../config/config";
import {Badge} from "@material-ui/core";

interface SingleContentProps {
    id: number | undefined
    poster: string
    title?: string
    media_type: string
    vote_average: number
    date: string
}

export const SingleContent = ({
                                  date,
                                  media_type,
                                  poster,
                                  title,
                                  vote_average
                              }: SingleContentProps) => {
    return (
        <div className={"media"}>
            <Badge
                badgeContent={vote_average}
                color={vote_average > 6 ? "primary" : "secondary"}
            />
            <img className={"poster"} src={poster ? `${img_300}/${poster}` : unavailable} alt={title}/>
            <b className={"title"}>{title}</b>
            <span className={"subTitle"}>{media_type === 'tv' ? "TV Series" : "Movie"}</span>
            <span className={"subTitle"}>{date}</span>
        </div>
    )
}

export default SingleContent
