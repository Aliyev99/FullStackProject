import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import './checkboxWithIImg.css'

interface Item {
    name: string;
    pictureUrl?: string;
}

interface Props {
    items: Item[];
    checked: string[];
    onChange: (items: string[]) => void;
}
export default function CheckBoxWithImgComponent({ items, checked, onChange }: Props) {

    const [checkedItems, setCheckedItems] = useState(checked || []);
    function handleChange(item: string) {
        console.log(item)
        let newChecked: string[] = [];
        ///not checked
        // console.log(items[index])
        if (checkedItems.indexOf(item) === -1) newChecked = [...checkedItems, item]
        else newChecked = checkedItems.filter(checked => checked !== item)
        setCheckedItems(newChecked)
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {/* {items.map((item: Item, key) => (
                <FormControlLabel  key={key} control={<Checkbox sx={{display: 'flex', flexDirection: 'column'}}  checked={checkedItems.includes(item.name)} onClick={() => handleChange(item.name)}/>}  
                label={
                    <Box display='flex' flexDirection='column'>
                        {item.pictureUrl && <img src={item.pictureUrl}/>}
                        {item.name}
                    </Box>
                    
                }/>

            ))} */}
            <Grid container p={0} m={0} rowGap={1}>
                {items.map((item: Item, index) => (
                    <Grid key={index} item xs={2.4} position='relative'>
                        <label htmlFor={'checkbox-' + index}>
                        <input type="checkbox" onChange={() => handleChange(item.name)} checked={checkedItems.includes(item.name)} id={'checkbox-' + index} />
                            <div className="imageCheckBox">
                                <img src={item.pictureUrl} alt="" />
                            </div>
                            <Typography fontSize='13px'>{item.name}</Typography>
                        </label>

                    </Grid>
                ))}
            </Grid>


        </FormGroup>
    )
}