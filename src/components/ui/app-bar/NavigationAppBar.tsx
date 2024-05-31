import React, {Fragment, useEffect} from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useAppSelector} from "hooks/app";

import {Link as RouteLink} from "react-router-dom";
import UserProfile from "./elements/user-profile/UserProfile";

const NavigationAppBar: React.FC<{}> = () => {

    const {activeCategory} = useAppSelector(state => state.category);
    const {activeUser} = useAppSelector(state => state.user);


    useEffect(() => {
        //console.log(activeUser);
    }, [activeUser]);

    return (
        <Fragment>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>

                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {activeCategory ? activeCategory.name : ""}
                        </Typography>

                        {activeUser
                            ?
                            <UserProfile/>
                            :
                            <Button
                                component={RouteLink}
                                to={`/auth/login`}
                                color="inherit"
                            >
                                Login
                            </Button>

                        }

                    </Toolbar>
                </AppBar>
            </Box>
        </Fragment>
    )
}

export default NavigationAppBar;
