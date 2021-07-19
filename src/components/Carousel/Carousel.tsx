import React, {useEffect, useState} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import {img_300, noPicture} from "../../config/config";
import './Carousel.css'

const handleDragStart = (e: any) => e.preventDefault();

interface CarouselProps {
    media_type: string
    id: number | undefined
}

const Carousel = ({id, media_type}: CarouselProps) => {
    const [credits, setCredits] = useState<any>();

    const items = credits && credits.map((credit: any) => (
        <div className={"carouselItem"}>
            <img
                src={credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture}
                alt={credit?.name}
                onDragStart={handleDragStart}
                className={"carouselItem__img"}
            />
            <b className={"carouselItem__txt"}>{credit?.name}</b>
        </div>
    ))

    const responsive = {
        0: {
            items: 3
        },
        512: {
            items: 5
        },
        1024: {
            items: 7
        }
    }

    const fetchData = async () => {
        const {data} = await axios
            .get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setCredits(data.cast)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return (
        <AliceCarousel autoPlay={true} responsive={responsive} infinite={true} disableDotsControls={true}
                       disableButtonsControls={true} mouseTracking items={items}/>
    );
}

export default Carousel
