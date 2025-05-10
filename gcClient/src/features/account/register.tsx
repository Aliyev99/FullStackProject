import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
    const {register, handleSubmit, setError, formState: {errors, isValid, isSubmitting}} = useForm({mode: 'all'});
    const navigate = useNavigate();
    
    function handleErrors(errors: any){
        errors.forEach((error: string) => {
            if (error.includes('Password')){
                setError('password', {message: error})
            } else if (error.includes('Email')){
                setError('email', {message: error})
            } else if (error.includes('Username')){
                setError('username', {message: error})
            }
        });
    }

    return (

        <Box component={'form'} onSubmit={handleSubmit((data: FieldValues) => agent.Accaunt.register(data)
            .then(() => {
                toast.success('You registred succesfully!', {
                    hideProgressBar: true
                })
                navigate('/login');
            })
            .catch(error => handleErrors(error)))} 
            display='flex' flexDirection='column' >
            <TextField variant='standard' label='Fullname' margin='normal' 
                {...register('fullname', {required: 'Fullname is required'})}
                error={!!errors.fullname}
                helperText={errors.fullname?.message as string}
            />
            <TextField variant='standard' label='Username' margin='normal' 
                {...register('username', {required: 'Username is required'})}
                error={!!errors.username}
                helperText={errors.username?.message as string}
            />
            <TextField variant='standard' label='Email' margin='normal' 
                {...register('email', {required: 'Email is required', pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Not valid email'
                }})}
                error={!!errors.email}
                helperText={errors.email?.message as string}
            />
            <TextField variant='standard' label='Birth date' type='date' margin='normal' 
            InputLabelProps={{ shrink: true}} 
                {...register('birthDate', {required: 'Birth date is required'})}
                error={!!errors.birthDate} 
                helperText={errors.birthDate?.message as string}
            />
            <TextField variant='standard' label='Password' margin='normal' type='password'
                {...register('password', {required: 'Password is required'})}
                error={!!errors.password} 
                helperText={errors.password?.message as string}
            />
            <TextField variant='standard' label='Confirm password'
                type='password' margin='normal'
                {...register('confirmPassword', {required: 'Confirm password is required'})}
                error={!!errors.confirmPassword} 
                helperText={errors.confirmPassword?.message as string} 
            />
            <LoadingButton type="submit" sx={{mt: '30px'}} disabled={!isValid} loading={isSubmitting}>Register</LoadingButton>
            {/* <MyLoadingButton text="Register" /> */}
        </Box>
    )
}