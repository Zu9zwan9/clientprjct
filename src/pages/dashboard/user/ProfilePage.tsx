import React, {Fragment, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import SectionCaption from "components/ui/caption/SectionCaption";
import UserForm from "components/forms/user/UserForm";
import {User} from "models/User";
import {useAppSelector} from "hooks/app";
import {AuctionRate} from "models/AuctionRate";
import {ServiceFactory} from "services/ServiceFactory";
import AuctionRateCard from "components/ui/cards/auction-rate/AuctionRateCard";

const DashboardProfilePage: React.FC<{}> = () => {
    const [user, setUser] = useState<User>();
    const {activeUser} = useAppSelector(state => state.user);
    const [rateList, setRateList] = useState<AuctionRate[]>([]);

    useEffect(() => {
        console.log(activeUser);
    }, [activeUser]);

    useEffect(() => {
        activeUser && ServiceFactory
            .getAuctionService()
            .getAuctionRateByUserId(activeUser._id)
            .then(_rate => {
                setRateList(_rate);
            }).catch(error => console.log(error));
    }, [activeUser]);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SectionCaption caption="Редагування даних про користувача"/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={4} alignItems="center">
                                <Card variant="outlined" sx={{width: '100%', maxWidth: 600}}>
                                    <CardContent>
                                        <Stack spacing={4}>
                                            <UserForm object={activeUser}/>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={2} alignItems="center">
                                <Typography variant="h5">
                                    Ставки
                                </Typography>
                                {rateList.map(item => (
                                    <AuctionRateCard key={item._id} rate={item}/>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default DashboardProfilePage;
