import React, {Fragment} from "react";
import Grid from '@mui/material/Grid';
import {useAppDispatch, useAppSelector} from "hooks/app";
import {Category} from "models/Category";
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {useNavigate} from "react-router-dom";
import SectionCaption from "components/ui/caption/SectionCaption";
import AuctionForm from "components/forms/auction/AuctionForm";

const DashboardAuctionCreatePage: React.FC<{}> = () => {

    const {categoryList} = useAppSelector(state => state.category);

    const {setNotification} = useDashboardContext();
    const navigate = useNavigate();
    let dispatch = useAppDispatch();

    const handleDelete = (category: Category) => {

    }


    return (
        <Fragment>
            <Grid container spacing={2}>
                <SectionCaption caption="Створити аукціон"/>
                <Grid item xs={12}>
                    <AuctionForm/>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DashboardAuctionCreatePage;
