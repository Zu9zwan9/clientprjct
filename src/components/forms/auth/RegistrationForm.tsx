import React, {useState} from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import {useForm} from "react-hook-form";
import {User} from "models/User";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useAppDispatch} from "hooks/app";
import {registerUser} from "store/slice/user/actions/RegisterUser";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNavigate} from "react-router-dom";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const RegistrationForm: React.FC = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<User>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errorMsg, setErrorMsg] = useState<string | undefined>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownConfirmPassword = (event: { preventDefault: () => any; }) => event.preventDefault();


    const handleMouseDownPassword = (event: { preventDefault: () => any; }) => event.preventDefault();

    const onSubmit = async (data: User) => {
        setErrorMsg("");
        try {
            await dispatch(registerUser(data)).then(unwrapResult);
            navigate("/profile");
        } catch (error: any) {
            setErrorMsg(error.message || "An unknown error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack spacing={2}>
                <FormControl fullWidth error={!!errors.name}>
                    <InputLabel htmlFor="input-name">Ім'я</InputLabel>
                    <Input id="input-name" {...register('name', {required: "Обов'язкове поле"})} />
                    {errors.name?.message && <FormHelperText>{errors.name.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.email}>
                    <InputLabel htmlFor="input-email">Email</InputLabel>
                    <Input id="input-email" {...register('email', {required: "Обов'язкове поле"})} />
                    {errors.email?.message && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.password}>
                    <InputLabel htmlFor="password-input">Пароль</InputLabel>
                    <Input
                        id="password-input"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: "Обов'язкове поле",
                            minLength: {
                                value: 6,
                                message: "Має містити мінімум 6 символів"
                            }
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password?.message && <FormHelperText>{errors.password.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.confirmPassword}>
                    <InputLabel htmlFor="confirm-password-input">Підтвердіть пароль</InputLabel>
                    <Input
                        id="confirm-password-input"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                            validate: value => value === watch('password') || "Паролі не співпадають"
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    onMouseDown={(event) => event.preventDefault()}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }

                    />
                    {errors.confirmPassword?.message &&
                        <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}
                </FormControl>
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                <Button type="submit" variant="outlined">Зареєструватись</Button>
            </Stack>
        </form>
    );
};

export default RegistrationForm;
