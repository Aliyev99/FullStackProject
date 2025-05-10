import { Box, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { loginAsync } from "./accauntSlice";
import { useAppDispatch } from "../../app/store/store";
import { useLocation, useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const {handleSubmit, register, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'all'
    });
    const dispatch = useAppDispatch();
    async function submitForm(data: FieldValues) {
        try {
            await dispatch(loginAsync(data)).then(() => navigate(location.state?.from || '/'))
        } catch (error: any) {
            console.log(error)
            if ((error.title as string).toLowerCase().includes('email')){
                setError('email', {message: (error.title as string)})
            } else if (error.title.toLowerCase().includes('password')){
                setError('password', {message: (error.title as string)})
            }
        }

    }


    return (

        <Box component='form' onSubmit={handleSubmit(submitForm)} display='flex' flexDirection='column'>
            <TextField variant='standard' label='Email' margin='normal' 
                {...register('email', {required: 'Email is required', pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Not valid email'
                }})}
                error={!!errors.email}
                helperText={errors.email?.message as string}
                />
            <TextField variant='standard' label='Password' type="password" margin='normal' 
                {...register('password', {required: 'Password is required'})}
                error={!!errors.password}
                helperText={errors.password?.message as string}
                />
            <LoadingButton sx={{mt: '30px'}} type='submit' loading={isSubmitting}
                 disabled={!isValid}>
                Login
            </LoadingButton>
            {/* <MyLoadingButton loading={isSubmitting} type="submit" text="Login"/> */}
        </Box>



    )
}