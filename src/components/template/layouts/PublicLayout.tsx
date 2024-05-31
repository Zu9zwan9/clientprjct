import React, { Fragment } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Grid, Stack, Typography, IconButton, Drawer, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/app";
import { setActiveUser } from "store/slice/user/UserSlice";
import { useThemeContext } from "./themeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const PublicLayout: React.FC<{}> = () => {
    const { activeUser } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { toggle, isDark } = useThemeContext();
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    function handleButtonLogoutClick() {
        localStorage.removeItem('user');
        dispatch(setActiveUser(null));
        navigate('auth/login');
    }

    const menuItems = (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "flex-start", sm: "flex-start" }}
            alignItems="center"
            spacing={2}
            sx={{ p: 2 }}
        >
            <IconButton onClick={toggle} color="inherit">
                {isDark ? <Brightness7Icon color="primary" /> : <Brightness4Icon color="primary" />}
            </IconButton>
            <Button onClick={() => navigate('/')}>Головна</Button>
            {activeUser && <Typography>Привіт {activeUser.name}</Typography>}
            {activeUser ? (
                <Button onClick={handleButtonLogoutClick}>Вихід</Button>
            ) : (
                <Button onClick={() => navigate('/auth/login')}>Авторизація</Button>
            )}
            {activeUser && <Button onClick={() => navigate('/profile')}>Профіль</Button>}
            {activeUser && activeUser.role === "root" && (
                <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
            )}
        </Stack>
    );

    return (
        <Fragment>
            <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 4 }}>
                <Grid item xs={4} sx={{ display: { xs: "flex", sm: "none" } }}>
                    <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={6} sx={{ display: { xs: "flex", sm: "none" }, justifyContent: "flex-end" }}>
                    <Typography variant="h6" component="div">
                        7Wells
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: { xs: "none", sm: "flex" } }}>
                    {menuItems}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "flex-end" }}>
                    <Typography variant="h6" component="div">
                        7Wells
                    </Typography>
                </Grid>
            </Grid>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ display: { xs: "block", sm: "none" } }}
            >
                <Box sx={{ width: 150 }}>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                    {menuItems}
                </Box>
            </Drawer>
            <Grid container sx={{ width: "100%", height: "100%", p: 2 }}>
                <Grid item xs={12}>
                    <Outlet />
                </Grid>
            </Grid>
            <ToastContainer />
        </Fragment>
    );
};

export default PublicLayout;
