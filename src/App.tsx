import React, { useEffect, useState } from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAppDispatch } from "hooks/app";
import { getCategoryList } from "store/slice/category/actions/GetCategory";
import { wsInit } from "store/slice/socket/SocketSlice";
import { setActiveUser } from "store/slice/user/UserSlice";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {getCarBrandList} from "./store/slice/auction/actions/GetCarBrands";

const App: React.FC<{ children: React.ReactNode }> = (props) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        const fetchData = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                dispatch(setActiveUser(JSON.parse(storedUser))); // Dispatch setActiveUser action with the stored user
            }
            await dispatch(wsInit());
            await dispatch(getCategoryList());
            await dispatch(getCarBrandList());
            setLoading(false); // Set loading to false after data is fetched
        };

        fetchData().catch(() => setLoading(false)); // Ensure loading is stopped even if fetch fails

        console.log('categories loaded');
        console.log('init app components');
    }, [dispatch]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            {props.children}
        </LocalizationProvider>
    );
}

export default App;
