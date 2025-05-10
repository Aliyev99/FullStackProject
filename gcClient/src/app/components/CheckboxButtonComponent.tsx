import { FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import React, { useState } from "react";

interface Props{
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void;
}
export default function CheckboxButton({items, checked, onChange}: Props){

    const [checkedItems, setCheckedItems] = useState(checked || []);

    // console.log(checke)

    function handleChange(item: string, e: React.SyntheticEvent){
        e.preventDefault();
        let newChecked: string[] = [];
        if (checkedItems.indexOf(item) === -1) newChecked = [...checkedItems, item]
        else newChecked = checkedItems.filter(checked => checked !== item)
        setCheckedItems(newChecked)
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {/* <Box flexDirection='column' alignItems='start' justifyContent='start' display='flex'> */}

           
            {items.map((item: string, key) => (
                
                <FormControlLabel 
                sx={{m: '0', width: '100%', display: 'flex', justifyContent: 'space-between', px: '60px'}} 
                key={key} control={<Checkbox 
                    checked={checkedItems.includes(item)} 
                    onClick={(e) => handleChange(item, e)}/>}  
                label={item} labelPlacement='start'/>

            ))}
             {/* </Box> */}
        </FormGroup>
    )
}