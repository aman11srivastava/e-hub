import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, createTheme, MuiThemeProvider, Tab, Tabs, TextField} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

export const Search = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [type, setType] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [content, setContent] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState<number>()

    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff"
            }
        }
    })

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
                    process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumberOfPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scroll(0,0);
        fetchSearch()
        // eslint-disable-next-line
    }, [page, type])

    return (
        <div>
            <MuiThemeProvider theme={darkTheme}>
                <div style={{display: 'flex', margin: '15px 0'}}>
                    <TextField
                        style={{flex: 1}}
                        className={"searchBox"}
                        label={"Search"}
                        variant={"filled"}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearchText(e.target.value)}
                    />
                    <Button onClick={fetchSearch} variant={"contained"} style={{marginLeft: 10}}><SearchIcon/></Button>
                </div>

                <Tabs value={type} indicatorColor={"primary"} textColor={"primary"}
                    onChange={(event:ChangeEvent<{}>, newValue: number) => {
                        setType(newValue)
                        setPage(1)
                    }}
                      style={{paddingBottom: 5}}
                >
                    <Tab style={{width: '50%'}} label={"Search Movies"}/>
                    <Tab style={{width: '50%'}} label={"Search TV Series"}/>
                </Tabs>

            </MuiThemeProvider>
            <div className="trending">
                {content &&
                content.map((content: any) => (
                    <SingleContent
                        key={content.id}
                        id={content.id}
                        poster={content.poster_path}
                        title={content.title || content.name}
                        date={content.first_air_date || content.release_date}
                        media_type={type ? "tv" : "movie"}
                        vote_average={content.vote_average}
                    />
                ))}
                {searchText &&
                !content &&
                (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numberOfPages && numberOfPages > 1 && (
                <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
            )}
        </div>
    )
}

export default Search
