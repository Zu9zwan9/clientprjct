import React, {useMemo, useState} from "react"
import {DashboardContext} from "./DashboardContext";
import DashboardLayout from "../layouts/dashboard/DashboardLayout";

const Dashboard: React.FC<{}> = () => {

    const [_notification, _setNotification] = useState<string>("");

    const value = useMemo(
        () => ({
            notification: _notification,
            setNotification: _setNotification
        }),
        [
            _notification,
            _setNotification
        ]
    );

    return (
        <DashboardContext.Provider value={value}>
            <DashboardLayout/>
        </DashboardContext.Provider>
    )
};

export default Dashboard;
