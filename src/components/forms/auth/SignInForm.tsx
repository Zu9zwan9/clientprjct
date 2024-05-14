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
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (result: { preventDefault: () => void; }) => {
        result.preventDefault();
    };
    const {register, handleSubmit, formState: {errors}} = useForm<User>();

    const [errorMsg, setErrorMsg] = useState<string>();

    let dispatch = useAppDispatch();
    const navigate = useNavigate();


    function onSubmit(data: User) {
        setErrorMsg("");
        dispatch(loginUser(data))
            .then(unwrapResult)
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result));
                dispatch(setActiveUser(result));
                //console.log("result",result)

                navigate("/");
            }).catch(error => {
            setErrorMsg(error);

        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack alignItems="flex-end" spacing={2}>
                <FormControl fullWidth error={errors.email ? true : false} variant="standard">
                    <InputLabel htmlFor="input-email">Email:</InputLabel>
                    <Input
                        {...register('email', {
                            required: "Required",
                        })}
                        id="input-email"
                        aria-describedby="component-error-text"
                    />
                    {errors.email && <FormHelperText id="input-email">{errors.email?.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={errors.password ? true : false} variant="standard">
                    <InputLabel htmlFor="component-error">
                        Пароль:
                    </InputLabel>
                    <Input
                        {...register('password', {
                            required: "This is required.",
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
                        type="password"
                        aria-describedby="component-error-text"
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
                    {errors.password &&
                        <FormHelperText id="password-error-text">{errors.password?.message}</FormHelperText>}
                </FormControl>
                {errorMsg && errorMsg.length &&
                    <FormControl fullWidth>
                        <Alert icon={<CheckIcon fontSize="inherit"/>} severity="error">
                            {errorMsg}
                        </Alert>
                    </FormControl>
                }
                <FormControl style={{maxWidth: 200}} variant="standard">
                    <Button type="submit" variant="outlined">Увійти</Button>
                </FormControl>
            </Stack>


        </form>
    )
}

export default SignInForm;
