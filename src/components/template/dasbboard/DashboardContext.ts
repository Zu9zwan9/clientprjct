import {createContext, useContext} from "react";

export interface DashboardContextInterface {
    notification: string,
    setNotification: (value: string) => void
}

export const DashboardContext = createContext<DashboardContextInterface>({} as DashboardContextInterface);

export function useDashboardContext() {

    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error("ThemeContext context should be used only inside components");
    }

    return context;
}
