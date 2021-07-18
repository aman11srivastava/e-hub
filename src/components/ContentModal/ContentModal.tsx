import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";
import {img_500, unavailable, unavailableLandscape} from "../../config/config";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: "90%",
            height: "80%",
            backgroundColor: "#39445a",
            border: "1px solid #282c34",
            borderRadius: 10,
            color: "white",
            boxShadow: theme.shadows[5],
            padding: theme.spacing(1, 1, 3),
        },
    }),
);

interface ContentModalProps {
    children: any
    className?: string
    media_type: string
    id: number | undefined
}

const ContentModal = ({children, id, media_type} : ContentModalProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<any>();
    const [video, setVideo] = useState()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchData = async () => {
        const {data} = await axios
            .get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            setContent(data);
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <button type="button" className={"media"} onClick={handleOpen}>
                {children}
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {
                        content && <div className={classes.paper}>
                            <div className="contentModal">
                                <img alt={content.title} src={content?.poster_path ? `${img_500}/${content?.poster_path}` : unavailable}/>
                            </div>
                        </div>
                    }
                </Fade>
            </Modal>
        </div>
    );
};

export default ContentModal
