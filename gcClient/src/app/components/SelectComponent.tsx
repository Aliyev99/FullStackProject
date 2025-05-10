import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

interface Props{
    items: string[];
    selectedValue: string;
    onChange: (newValue: string) => void;
}

export default function SelectComponent({items, selectedValue, onChange}: Props){
    const [selected, setSelected] = useState(selectedValue);
    const handleChange = (event: SelectChangeEvent) => {
        const {target: {value}} = event;
        onChange(value)
        setSelected(value);
    }
    return(
        <FormControl>
            <InputLabel>Size</InputLabel>
            <Select 
                value={selected}
                label='Size'
                onChange={handleChange}>
                {items.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}