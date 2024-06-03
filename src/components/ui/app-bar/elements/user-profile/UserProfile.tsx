import React from "react";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import UserIcon from '@mui/icons-material/AccountBox';
import PageIcon from '@mui/icons-material/Dashboard';
import ListItemIcon from '@mui/material/ListItemIcon';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/app";
import {setActiveUser} from "store/slice/user/UserSlice";
import {Avatar} from "@mui/material";


const UserProfile: React.FC<{}> = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {activeUser} = useAppSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(setActiveUser(null));

        navigate('/auth/login');
    };

    return (
        <div>
            <IconButton
                onClick={handleMenu}
                color="inherit"
            >
                <Avatar alt={activeUser?.name || 'User'} src={`${activeUser?.thumbnail_file}`}/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{width: "300px"}}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => navigate('/')}>
                    <ListItemIcon>
                        <PageIcon/>
                    </ListItemIcon>

                    Головна сторінка
                </MenuItem>
                <MenuItem onClick={() => navigate('/dashboard/user/profile')}>
                    <ListItemIcon>
                        <UserIcon/>
                    </ListItemIcon>

                    Профіль
                </MenuItem>

                <Divider sx={{my: 0.5}}/>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small"/>
                    </ListItemIcon>
                    Вихід
                </MenuItem>
            </Menu>
        </div>
    )
}

export default UserProfile;
