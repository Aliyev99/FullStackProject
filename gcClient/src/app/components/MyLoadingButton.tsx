import { LoadingButton } from "@mui/lab";
import { CircularProgress, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
  }
// interface Props{
//     color: string;
//     bgColor: string;
//     p: string;
//     m: string;
//     hoverBg: string;
//     hoverColor: string;
//     border: number
// }

const useStyles = makeStyles(theme => ({
    myComp: { color: theme.palette.primary.light }
}));

export default function MyLoadingButton({loading = true, text='', p='10px', m='20px 0 0 0', color='white', bgColor='black', 
    hoverBg='white', hoverColor='black', border='1px solid black'}){

        const classes = useStyles();
    return (
        <LoadingButton loading={loading} 
            loadingIndicator={<CircularProgress className={classes.myComp}  size={30}/>}
            fullWidth sx={{
            margin: `${m}`, backgroundColor: `${bgColor}`, color: `${color}`, 
            border: `${border}`,
            fontFamily: 'serif', fontWeight: 600, letterSpacing: '2px', p: `${p}`,
            ':hover': {
                backgroundColor: `${hoverBg}`,
                color: `${hoverColor}`
            }
        }}>{text}
        </LoadingButton>
    )
}