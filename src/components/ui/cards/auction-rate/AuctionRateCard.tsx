import {Grid, Typography, Box, Paper} from "@mui/material";
import {AuctionRate} from "models/AuctionRate";
import React from "react";
import moment from "moment";

export interface AuctionRateCardProps {
    rate: AuctionRate;
}
const AuctionRateCard: React.FC<AuctionRateCardProps> = (props) => {
    const { rate } = props;

    // Safely access `user` properties with optional chaining and provide a fallback value.
    const userName = rate.user?.name || 'Unknown User';

    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Headers */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" component="div">Дата</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" component="div">Ставка</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" component="div">Користувач</Typography>
                </Grid>
                {/* Data */}
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" component="div">
                        {moment.unix(rate.time).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" component="div">{rate.value} $</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="body2" component="div">{userName}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AuctionRateCard;

