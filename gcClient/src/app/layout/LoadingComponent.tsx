import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props{
    message?: string;
}
export default function LoadingComponent({message = 'Loading...'}: Props) {

    return (
        <Backdrop open={true} invisible={true}>
            <Box minHeight='100vh' width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                <CircularProgress size={100}/>
                <Typography variant="h4" letterSpacing='5px' mt='30px'>{message}</Typography>
            </Box>
        </Backdrop>

    )

}