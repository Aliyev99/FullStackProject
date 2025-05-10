import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/Pagination";
// import { makeStyles, createStyles } from '@mui/styles';

interface Props{
    metaData: MetaData;
    onpageChange: (page: number) => void;
}

export default function AppPagination({metaData, onpageChange}: Props){
    const {pageNumber, pageSize, totalPages, totalItems} = metaData;
    // const classes = useStyles();
    return (
        <Box display='flex' alignItems='center' sx={{mt: '50px'}}>
            <Typography>Total items: {totalItems}</Typography>
            <Typography className="ms-3">Page size: {pageSize}</Typography>
            <Pagination 
                color='primary'
                count={totalPages}
                page={pageNumber}
                onChange={(_e, page) => onpageChange(page)}/>
        </Box>
    )
}

