import { Close } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
// import { useAppDispatch } from "../../../app/store/store";
// import { setProductParams } from "../catalogSlice";

interface Props {
    title: string;
    selects: string[];
    deleteFilter: (items: string[]) => void;
}

export default function FilterButton({ title, selects, deleteFilter }: Props) {
    // const dispatch = useAppDispatch();
    return (
        <Box display='flex' alignItems='center'>
            <Typography>{title}:</Typography>
            {selects.map((select) => (
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 5px 0 5px', marginLeft: '10px', border: '1px solid black', borderRadius: '15px', cursor: 'pointer' }}
                    onClick={() => deleteFilter(selects.filter(x => x!== select))}>
                    <Typography mr='5px' width='auto' textAlign='center'>{select}</Typography>
                    <Close sx={{ color: 'black', fontSize: '17px', fontWeight: 'bold' }} />
                </div>
            ))}

        </Box>
    )
}