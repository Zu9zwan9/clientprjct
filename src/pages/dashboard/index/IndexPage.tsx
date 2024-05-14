import React, {Fragment} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CategoryCardView from "./elements/CategoryCardView";
import AuctionLotCardView from "./elements/AuctionLotCardView";
import UserCardView from "./elements/UserCardView";


const DashboardIndexPage: React.FC<{}> = () => {

    return (
        <Fragment>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Stack
                        spacing={4}
                        alignItems="center"
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                    >
                        <CategoryCardView/>
                        <AuctionLotCardView/>
                        <UserCardView/>
                    </Stack>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DashboardIndexPage;
