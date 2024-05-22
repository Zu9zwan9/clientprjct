import React, { Fragment } from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CategoryCardView from "./elements/CategoryCardView";
import AuctionLotCardView from "./elements/AuctionLotCardView";
import UserCardView from "./elements/UserCardView";
import Hidden from '@mui/material/Hidden';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardIndexPage: React.FC<{}> = () => {
    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Hidden smDown>
                        <Stack
                            spacing={4}
                            alignItems="center"
                            direction="row"
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <CategoryCardView />
                            <AuctionLotCardView />
                            <UserCardView />
                        </Stack>
                    </Hidden>
                    <Hidden smUp>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Категорії
                                        </Typography>
                                        <CategoryCardView />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Аукціони
                                        </Typography>
                                        <AuctionLotCardView />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Користувачі
                                        </Typography>
                                        <UserCardView />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default DashboardIndexPage;
