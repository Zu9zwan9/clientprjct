import {Grid, Typography, Box, Paper} from "@mui/material";
import {AuctionRate} from "models/AuctionRate";
import React from "react";
import moment from "moment";

export interface AuctionRateCardProps {
    rate: AuctionRate;
}

const AuctionRateCard: React.FC<AuctionRateCardProps> = (props) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Headers */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" component="div">
                        Дата
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" component="div">
                        Ставка
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" component="div">
                        Користувач
                    </Typography>
                </Grid>
                {/* Data */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" component="div">
                        {moment.unix(props.rate.time).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" component="div">
                        {props.rate.value} $
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" component="div">
                        {typeof props.rate.user == 'object' ? props.rate.user.name : props.rate.userName}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AuctionRateCard;
