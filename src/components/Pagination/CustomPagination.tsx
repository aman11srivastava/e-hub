import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import {createTheme, MuiThemeProvider} from "@material-ui/core";

interface CustomPaginationProps {
    setPage: (val: number) => void;
    numberOfPages: number | undefined
}

const darkTheme = createTheme({
    palette: {
        type: 'dark'
    }
})

export const CustomPagination = ({setPage, numberOfPages}: CustomPaginationProps) => {

    const handlePageChange = (page: number) => {
        setPage(page);
        window.scroll(0, 0)
    }

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                marginTop: 10

            }}
        >
            <MuiThemeProvider theme={darkTheme}>
                <Pagination count={numberOfPages}
                            color={"primary"}
                            onChange={(event: any) => handlePageChange(event.target.textContent)}/>
            </MuiThemeProvider>
        </div>
    )
}

export default CustomPagination
