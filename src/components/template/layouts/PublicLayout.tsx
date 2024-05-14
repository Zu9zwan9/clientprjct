import React, {Fragment} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {Button, Grid, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "hooks/app";
import {setActiveUser} from "store/slice/user/UserSlice";
import {useThemeContext} from "./themeContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const PublicLayout: React.FC<{}> = () => {
    const {activeUser} = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {toggle, isDark} = useThemeContext();

    function handleButtonLogoutClick() {
        localStorage.removeItem('user');
        dispatch(setActiveUser(null));
        navigate('auth/login');
    }

    return (
        <Fragment>
            <Grid container sx={{p: 4}}>
                <Grid item>
                    <Stack direction="row" justifyContent={"center"} alignItems={"center"} spacing={2}>
                        <IconButton onClick={toggle} color="inherit">
                            {isDark ? <Brightness7Icon color="primary"/> : <Brightness4Icon color="primary"/>}
                        </IconButton>
                        <Button onClick={() => {
                            navigate('/')
                        }}>Головна</Button>
                        {activeUser && <div>Привіт {activeUser.name}</div>}
                        {activeUser ? (
                            <Button onClick={handleButtonLogoutClick}>Вихід</Button>
                        ) : (
                            <Button onClick={() => {
                                navigate('/auth/login')
                            }}>Авторизація</Button>
                        )}
                        {activeUser && <Button onClick={() => {
                            navigate('/profile')
                        }}>Профіль</Button>}
                        {activeUser && activeUser.role === "root" && (
                            <Button onClick={() => {
                                navigate('/dashboard')
                            }}>dashboard</Button>
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <Grid sx={{width: "100%", height: "100%", p: 4}} container>
                <Grid item>
                    <Outlet/>
                </Grid>
            </Grid>
            <ToastContainer />
        </Fragment>
    );
};

export default PublicLayout;
