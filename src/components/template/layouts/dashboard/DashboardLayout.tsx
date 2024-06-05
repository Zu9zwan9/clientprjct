import NavigationAppBar from "components/ui/app-bar/NavigationAppBar";
import React, {Fragment, useEffect, useState} from "react"
import {Outlet, useNavigate} from "react-router-dom";
import BasicBreadcrumbs from "components/ui/basic-breadcrumbs/BasicBreadcrumbs";
import {Button, Grid, Stack} from "@mui/material";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CarIcon from '@mui/icons-material/CarCrash';
import CategoryIcon from '@mui/icons-material/Category';
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "hooks/app";
import {Role} from "types/enums/RoleEnum";
import {setActiveUser} from "store/slice/user/UserSlice";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {useThemeContext} from "../themeContext";

const DashboardLayout: React.FC<{}> = () => {

    const {activeUser} = useAppSelector(state => state.user);

    const handleCreateCategory = () => {
        navigate('/dashboard/category/create')
    }

    const handleCreateAuctionLot = () => {
        navigate('/dashboard/auction/create')
    }

    const actions = [
        {icon: <CategoryIcon/>, onclick: handleCreateCategory, name: 'Створити категорію'},
        {icon: <CarIcon/>, onclick: handleCreateAuctionLot, name: 'Створити лот'},

    ];

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {notification, setNotification} = useDashboardContext();

    const [openNotification, setOpenNotification] = React.useState(false);

    const [offset, setOffset] = useState(0);

    const handleCloseNotification = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setNotification("");
        setOpenNotification(false);
    };

    useEffect(() => {
        notification.length && setOpenNotification(true);
    }, [notification]);

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const {toggle, isDark} = useThemeContext();

    function handleButtonLogoutClick() {
        dispatch(setActiveUser(undefined));
    }

    if (!activeUser || activeUser.role != Role.ROOT) {

        window.location.href = '/';
        return <></>;
    }


    return (
        <Fragment>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <NavigationAppBar/>
                </Grid>
                <Grid item xs={12}>
                    <div style={{padding: "24px"}}>
                        <Stack direction="row" spacing={2}>

                            <IconButton onClick={toggle} color="inherit">
                                {isDark ? <Brightness7Icon color="primary"/> : <Brightness4Icon color="primary"/>}
                            </IconButton>

                            <Button onClick={() => {
                                navigate('/')
                            }}>Головна</Button>

                            {activeUser && activeUser.role == "root" && <Button onClick={() => {
                                navigate('/dashboard')
                            }}>dashboard</Button>}

                        </Stack>
                    </div>

                </Grid>
                <Grid item xs={12}>
                    <div style={{padding: "24px"}}>

                        <div style={{marginBottom: "24px"}}>
                            <BasicBreadcrumbs/>
                        </div>
                        <Outlet/>

                    </div>

                    <Snackbar open={openNotification} autoHideDuration={2000} onClose={handleCloseNotification}>
                        <Alert
                            onClose={handleCloseNotification}
                            severity="success"
                            variant="filled"
                            sx={{width: '100%'}}
                        >
                            {notification}
                        </Alert>
                    </Snackbar>

                </Grid>

            </Grid>

            <SpeedDial
                ariaLabel="SpeedDial"
                sx={{position: 'absolute', bottom: 16 - offset, right: 16}}
                icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        onClick={action.onclick}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default DashboardLayout;
