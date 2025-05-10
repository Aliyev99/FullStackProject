interface Props {
    options: any[];
    selectedValue: string;
    onChange: (event: any) => void;
}

export default function RadioButtonComponent({ options, onChange, selectedValue }: Props) {
    // console.log(items)
    return (
        // <Grid container spacing={1}>
        //     {items && items.map((item, index) => (
        //         <Grid key={index} item xs={2}>

        //             <button
        //                 disabled={item.quantity === 0 ? true : false} 
        //                 className={ 
        //                     ('m-radio-btn' + (item.quantity === 0 ? ' m-radio-btn-not-exist' : ''))
        //                     + (selectedSize === item.size ? ' m-radio-btn-selected' : '')}
        //                 onClick={() => {onclick(item.size)}}>
        //                 {item.quantity === 0 && <span className="not-exist-line"></span>}
        //                 <Typography fontFamily={'sans-serif'} fontSize={'13px'}>{item.size}</Typography>    
        //             </button>
        //         </Grid>
        //     ))}
        // </Grid>

        // <FormControl>
        //     <RadioGroup value={selectedValue} onChange={onChange}>
        //         {options.map((option) => (
        //             <FormControlLabel control={<Radio />} label={option.label} value={option.value} key={option.value} />
        //         ))}
        //     </RadioGroup>
        // </FormControl>
        <form onChange={onChange}>
            {options.map((option) => (
                
                    <div key={option.value} style={{padding: '10px 30px 10px 30px',display: 'flex', justifyContent: 'space-between'}}>
                        <label htmlFor={option.label}>{option.label}</label>
                        <input className="regular-radio" type='radio' id={option.label} value={option.value} checked={option.value === selectedValue}/>
                    </div>
            ))}
        </form>





    )
}