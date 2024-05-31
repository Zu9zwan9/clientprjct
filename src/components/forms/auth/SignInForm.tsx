import React, {useState} from "react";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import {useForm} from "react-hook-form";
import {User} from "models/User";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {unwrapResult} from '@reduxjs/toolkit';
import {useAppDispatch} from "hooks/app";
import {loginUser} from "store/slice/user/actions/LoginUser";
import {useNavigate} from "react-router-dom";
import {InputAdornment} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {setActiveUser} from "../../../store/slice/user/UserSlice";

const SignInForm: React.FC<{}> = () => {
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const [errorMsg, setErrorMsg] = useState<string>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClickShowPass = () => {
        setShowPass(!showPass);
    };

    const handleMouseDownPass = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // This function now matches the purpose, preventing focus loss
    };

    const onSubmit = async (data: User) => {
        setErrorMsg("");
        try {
            const result = await dispatch(loginUser(data)).then(unwrapResult);
            localStorage.setItem('user', JSON.stringify(result));
            dispatch(setActiveUser(result));
            navigate("/");
        } catch (error: any) {
            setErrorMsg(error.message || "Помилка авторизації");
        }
    };


    // const handleGoogleSignIn = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, googleProvider);
    //         // You can handle or store the user info here
    //         console.log(result.user); // Log or handle user information as needed
    //         navigate("/profile");
    //     } catch (error) {
    //         console.error(error);
    //         setErrorMsg("Failed to authenticate with Google");
    //     }
    // };

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack alignItems="flex-end" spacing={2}>
                <FormControl fullWidth error={!!errors.email} variant="standard">
                    <InputLabel htmlFor="input-email">Email:</InputLabel>
                    <Input
                        {...register('email', {
                            required: "Обов'язкове поле",
                        })}
                        id="input-email"
                        aria-describedby="component-error-text"
                    />
                    {errors.email && <FormHelperText id="input-email-text">{errors.email.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.password} variant="standard">
                    <InputLabel htmlFor="component-error">Пароль:</InputLabel>
                    <Input
                        {...register('password', {
                            required: "Обов'язкове поле",
                            minLength: {
                                value: 6,
                                message: "min 6 length"
                            },
                            pattern: {
                                value: /^\S*$/,
                                message: "no space"
                            },
                        })}
                        id="component-error"
                        type={showPass ? 'text' : 'password'}
                        aria-describedby="component-error-text"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPass}
                                    onMouseDown={handleMouseDownPass}
                                >
                                    {showPass ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password && <FormHelperText id="password-error-text">{errors.password.message}</FormHelperText>}
                </FormControl>
                {errorMsg && (
                    <FormControl fullWidth>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                            {errorMsg}
                        </Alert>
                    </FormControl>
                )}
                <FormControl style={{ maxWidth: 200 }} variant="standard">
                    <Button type="submit" variant="outlined">Увійти</Button>
                </FormControl>
                {/*<Button onClick={handleGoogleSignIn} variant="contained" color="primary">*/}
                {/*    Sign in with Google*/}
                {/*</Button>*/}
            </Stack>
        </form>
    );
};

export default SignInForm;
