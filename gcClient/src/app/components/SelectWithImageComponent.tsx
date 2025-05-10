import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Item{
  name: string;
  pictureUrl?: string
}

interface Props {
    items: Item[];
    checked: string[];
    hasePicture: boolean;
    width: number;
    onChange: (items: string[]) => void;
}

export default function SelectBox({items, checked, hasePicture, onChange, width}: Props) {
    const [selects, setSelects] = useState<string[]>(checked);
    
    const handleChange = (event: SelectChangeEvent<typeof selects>) => {
        const {
          target: { value },
        } = event;

        if(typeof value === 'object') {
          value.includes('') ? onChange([]) : onChange(value);
        }

        value.includes('') ? setSelects([]) : setSelects(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      return (
        <div>
          <FormControl sx={{ m: 1, width: {width} }}>
          <InputLabel id="demo-multiple-checkbox-label">Gemstones</InputLabel>
            <Select
              label='Gemstones'
              id="demo-multiple-checkbox"
              multiple
              value={selects}
              onChange={handleChange}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              
            >
            <MenuItem value=''>None</MenuItem>
            {items.map((item, index) => (
              <MenuItem key={index} value={item.name}>
                {hasePicture && <img width='30px' src={item.pictureUrl} alt="" />}
                <Checkbox checked={selects.includes(item.name)} 
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
}