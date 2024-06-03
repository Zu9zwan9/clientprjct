import React, {Fragment, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "hooks/app";
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {useNavigate, useParams} from "react-router-dom";
import {Auction} from "models/Auction";
import {ServiceFactory} from "services/ServiceFactory";
import SectionCaption from "components/ui/caption/SectionCaption";
import AuctionForm from "components/forms/auction/AuctionForm";
import {Paper, Typography} from "@mui/material";
import {AuctionRate} from "models/AuctionRate";
import AuctionRateCard from "components/ui/cards/auction-rate/AuctionRateCard";

const DashboardAuctionEditPage: React.FC<{}> = () => {

    const {categoryList} = useAppSelector(state => state.category);
    const [auctionRateList, setAuctionRateList] = useState<AuctionRate[]>([]);
    const {setNotification} = useDashboardContext();
    const navigate = useNavigate();
    let dispatch = useAppDispatch();
    const {id} = useParams();
    const [auction, setAuction] = useState<Auction>();

    useEffect(() => {
        if (id) {
            ServiceFactory
                .getAuctionService()
                .findById(id)
                .then(_auction => {
                    ServiceFactory
                        .getAuctionService()
                        .getAuctionRateById(_auction._id)
                        .then(result => {
                            setAuctionRateList(result);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    setAuction(_auction);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    return (
        <Fragment>
            <SectionCaption caption="Редагувати аукціон"/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{padding: 2}}>
                        <AuctionForm object={auction}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                        <Typography variant="h3">
                            Ставки
                        </Typography>
                        {auctionRateList.map(item => (
                            <AuctionRateCard key={item._id} rate={item}/>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default DashboardAuctionEditPage;
