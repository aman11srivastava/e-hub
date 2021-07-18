import React, {useEffect, useState} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {useStyles} from "./MainNavStyles";
import {Movie, Search, Tv, Whatshot} from "@material-ui/icons";
import {NavIconStyles} from "../../utils/utils";
import {useHistory} from 'react-router-dom'

export const MainNav = () => {
    const classes = useStyles();
    const [value, setValue] = useState<number>(0);
    const history = useHistory();

    useEffect(() => {
        switch (value){
            case 0:
                return history.push('/')
            case 1:
                return history.push('/movies')
            case 2:
                return history.push('/series')
            case 3:
                return history.push('/search')
        }
    }, [history, value])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                style={NavIconStyles}
                label="Trending"
                icon={<Whatshot />}
            />
            <BottomNavigationAction
                style={NavIconStyles}
                label="Movies"
                icon={<Movie />}
            />
            <BottomNavigationAction
                style={NavIconStyles}
                label="TV Series"
                icon={<Tv />}
            />
            <BottomNavigationAction
                style={NavIconStyles}
                label="Search"
                icon={<Search />}
            />
        </BottomNavigation>
    );
};

export default MainNav
