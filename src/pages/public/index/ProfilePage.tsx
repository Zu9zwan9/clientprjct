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

const ProfilePage: React.FC<{}> = () => {

    const [user, setUser] = useState<User>();

    const {activeUser} = useAppSelector(state => state.user);
    const [rateList, setRateList] = useState<AuctionRate[]>([]);

    useEffect(() => {

        console.log(activeUser);

    }, [activeUser])

    useEffect(() => {

        activeUser && ServiceFactory
            .getAuctionService()
            .getAuctionRateByUserId(activeUser._id)
            .then(_rate => {
                setRateList(_rate);
            }).catch(error => console.log(error));

    }, [activeUser]);

    if (!activeUser) return <>Сторінка не знайдена</>

    return (
        <Fragment>
            <Grid sx={{width: "100%"}} container spacing={2}>
                <Grid item xs={12}>
                    <SectionCaption caption="Редагування даних про користувача"/>
                    <Grid container>
                        <Grid item xs={6}>

                            <Stack spacing={4}>
                                <Card variant="outlined">
                                    <CardContent>

                                        <Stack spacing={4}>

                                            <UserForm object={activeUser}/>
                                        </Stack>
                                    </CardContent>
                                </Card>

                            </Stack>


                        </Grid>
                        <Grid sx={{paddingLeft: 2}} item xs={6}>
                            <Stack spacing={2}>
                                <Typography variant="h3">
                                    Ставки
                                </Typography>

                                {rateList.map(item =>

                                    <AuctionRateCard key={item._id} rate={item}/>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Fragment>
    )
}

export default ProfilePage;
