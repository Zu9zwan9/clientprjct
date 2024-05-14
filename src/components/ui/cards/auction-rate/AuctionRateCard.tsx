import {Grid, Typography} from "@mui/material";
import {AuctionRate} from "models/AuctionRate";
import React, { useEffect } from "react";
import moment from "moment";
import { useAppSelector } from "hooks/app";

export interface AuctionRateCardProps {
    rate: AuctionRate;
}

const AuctionRateCard: React.FC<AuctionRateCardProps> = (props) => {
    
    /*
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userID = user ? user._id : 0;
    const auctionCard = props.rate.auctionId;
    const bid = props.rate.value;
    const username = user ? user.name : "Guest";
    */

    return (
        <>
            <Grid container spacing={2} alignItems="center">
                {/* Headers */}
                <Grid item xs={4}>
                    <Typography variant="subtitle1" component="div">
                        Дата
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" component="div">
                        Ставка
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle1" component="div">
                        Користувач
                    </Typography>
                </Grid>
                {/* Data */}
                <Grid item xs={4}>

                    {moment.unix(props.rate.time).format("MMMM Do YYYY, h:mm:ss a")}

                </Grid>
                <Grid item xs={4}>
                    {props.rate.value} $
                </Grid>
                <Grid item xs={4}>
                { typeof props.rate.user == 'object' ? props.rate.user.name : props.rate.userName}
                </Grid>
            </Grid>
        </>
    )
}


export default AuctionRateCard;
