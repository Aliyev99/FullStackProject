import { Box, Typography } from "@mui/material";

export default function NotFound() {
    return (
        <Box width={'100%'}>
            <Typography variant="h4" textAlign='center' mb='20px' fontWeight='bold'>SORRY!</Typography>
            <Typography fontSize='20px' textAlign='center'>We can't seem to find the page you are looking for.</Typography>
        </Box>

    )
}