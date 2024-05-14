import React, {useEffect} from "react";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useAppDispatch} from "hooks/app";
import {getCategoryList} from "store/slice/category/actions/GetCategory";
import {wsInit} from "store/slice/socket/SocketSlice";
import {setActiveUser} from "store/slice/user/UserSlice"; // Import setActiveUser action

const App: React.FC<{ children: React.ReactNode }> = (props) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setActiveUser(JSON.parse(storedUser))); // Dispatch setActiveUser action with the stored user
        }
        dispatch(wsInit());
        dispatch(getCategoryList());
        console.log('categories loaded');
        console.log('init app components');
    }, [dispatch]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            {props.children}
        </LocalizationProvider>
    );
}

export default App;
