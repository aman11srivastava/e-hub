import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import MainNav from "./components/MainNav/MainNav";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Container} from "@material-ui/core";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <div className="app">
                <Container>
                    <Switch>
                        <Route component={Trending} path={'/'} exact/>
                        <Route component={Movies} path={'/movies'} exact/>
                        <Route component={Series} path={'/series'} exact/>
                        <Route component={Search} path={'/search'} exact/>
                    </Switch>
                </Container>
            </div>
            <MainNav/>
        </BrowserRouter>
    );
}

export default App;
