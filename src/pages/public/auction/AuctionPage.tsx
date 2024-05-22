import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/app";
import { useParams } from "react-router-dom";
import { sendAuctionRate, setActiveAuction } from "store/slice/auction/AuctionSlice";
import { getAuctionById } from "store/slice/auction/actions/GetAuctionById";
import { getAuctionRate } from "store/slice/auction/actions/GetAuctionRate";
import { GetAuctionComment } from "store/slice/comment/actions/GetAuctionComment";
import { unwrapResult } from "@reduxjs/toolkit";
import { setCommentList } from "store/slice/comment/CommentSlice";
import { AuctionRate } from "models/AuctionRate";
import { Comment } from "models/Comment";
import moment from "moment";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    Stack,
    Alert
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import AuctionRateCard from "components/ui/cards/auction-rate/AuctionRateCard";
import { AuctionStatusEnum } from "types/enums/AuctionStatusEnum";
import { CarBrand } from "models/CarBrand";
import CommentForm from "components/forms/comment/CommentForm";

const AuctionPage: React.FC<{}> = () => {
    const { activeAuction, carTypeList, activeRateList, brandList } = useAppSelector(state => state.auction);
    const { categoryList } = useAppSelector(state => state.category);
    const { commentList } = useAppSelector(state => state.comment);
    const { activeUser } = useAppSelector(state => state.user);

    const [currentRate, setCurrentRate] = useState<number>(0);
    const [currentBrand, setCurrentBrand] = useState<CarBrand>();
    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) dispatch(getAuctionById(id));
    }, [id]);

    useEffect(() => {
        return () => {
            dispatch(setActiveAuction(null));
            dispatch(setCommentList([]));
        }
    }, []);

    useEffect(() => {
        if (activeAuction) {
            setCurrentRate(activeAuction.price);
            dispatch(getAuctionRate(activeAuction._id));
            dispatch(GetAuctionComment(activeAuction._id));
            setCurrentBrand(brandList.find(i => i.id == activeAuction.brandId));
        }
    }, [activeAuction]);

    useEffect(() => {
        if (activeRateList && activeRateList.length) {
            setCurrentRate(activeRateList[0].value);
        }
    }, [activeRateList]);

    const handleButtonSendClick = () => {
        if (activeUser && currentRate && activeAuction) {
            let rate: AuctionRate = {
                time: moment().unix(),
                user: activeUser,
                value: currentRate,
                auctionId: activeAuction._id,
                _id: ""
            };

            if (currentRate < activeAuction.price) {
                toast("Ставка дуже низька. Ваша ставка повинна бути не меншою за початкову ціну.");
                return;
            }

            if (activeRateList && activeRateList.length) {
                const minValue = activeRateList[0].value;
                if (currentRate <= minValue) {
                    toast("Ставка дуже низька");
                } else {
                    dispatch(sendAuctionRate(rate));
                }
            } else {
                dispatch(sendAuctionRate(rate));
            }
        }
    }

    const handleOnCommentCreate = (value: Comment) => {}

    if (!activeAuction) return <>Аукціон не знайдено</>

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Stack spacing={2} direction="row">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Stack direction="column" justifyContent="space-between" spacing={10}>
                                    <CardMedia
                                        component="img"
                                        sx={{ maxWidth: 480 }}
                                        image={`${activeAuction.thumbnail}`}
                                        alt="imgauction"
                                    />
                                    <Box width="100%">
                                        <Stack flexWrap="wrap" justifyContent="left" direction="column" spacing={1}>
                                            <Chip label={`Назва: ${activeAuction.name}`} icon={<InfoIcon />} />
                                            <Chip label={`Ціна: ${activeAuction.price}$`} icon={<InfoIcon />} />
                                            <Chip label={`Категорія: ${categoryList.find(i => i._id == activeAuction.categoryId)?.name}`} icon={<InfoIcon />} />
                                            <Chip label={`Тип: ${carTypeList.find(i => i.id == activeAuction.type)?.name}`} icon={<InfoIcon />} />
                                            <Chip label={`Бренд: ${currentBrand?.name}`} icon={<InfoIcon />} />
                                            <Chip label={`Модель: ${currentBrand?.modelList.find(i => i.id == activeAuction.modelId)?.name}`} icon={<InfoIcon />} />
                                            <Chip label={`ВІН код: ${activeAuction.vinCode}`} icon={<InfoIcon />} />
                                            <Chip label={`Пробіг: ${activeAuction.carMileage}`} icon={<InfoIcon />} />
                                            <Chip label={`Рік: ${activeAuction.year}`} icon={<InfoIcon />} />
                                            <Chip label={`Колір ${activeAuction.color}`} icon={<InfoIcon />} />
                                            <Chip
                                                label={`Дата створення: ${moment(activeAuction.dateCreate).format("MMMM Do YYYY, h:mm:ss a")}`}
                                                icon={<InfoIcon />}
                                            />
                                            <Chip
                                                label={`Дата закриття: ${moment.unix(activeAuction.dateClose).format("MMMM Do YYYY, h:mm:ss a")}`}
                                                icon={<InfoIcon />}
                                            />
                                            <Chip label={`Переглядів: ${activeAuction.viewCount}`} icon={<InfoIcon />} />
                                            <Chip label={`Опис: ${activeAuction.description}`} icon={<InfoIcon />} />
                                            {activeAuction.isCommercial ? <Chip color="info" label={`Комерційне авто`} icon={<InfoIcon />} /> : <></>}
                                        </Stack>

                                        {activeAuction.status == AuctionStatusEnum.ACTIVE
                                            ?
                                            <Stack sx={{ marginTop: 4 }} direction="row">
                                                <FormControl fullWidth variant="standard">
                                                    <InputLabel htmlFor="standard-adornment-amount">Ставка</InputLabel>
                                                    <Input
                                                        onChange={(e) => setCurrentRate(parseFloat(e.target.value))}
                                                        value={currentRate}
                                                        id="standard-adornment-amount"
                                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Button
                                                    onClick={handleButtonSendClick}
                                                    disabled={activeUser ? false : true}
                                                    sx={{ width: 200 }}
                                                    variant="contained"
                                                    endIcon={<SendIcon />}
                                                >
                                                    Відправити
                                                </Button>
                                            </Stack>
                                            : <Alert sx={{ marginTop: 4 }} component={"div"} severity="warning">Аукціон завершений</Alert>
                                        }
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                        <Stack sx={{ marginLeft: 4 }} spacing={1}>
                            {activeRateList.map((item, index) => <AuctionRateCard key={index} rate={item} />)}
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: 4 }}>
                <Grid item xs={12}>
                    <Stack spacing={2}>
                        {commentList.map(item => (
                            <Box key={item._id}>{item.userName}: {item.comment}</Box>
                        ))}
                        {activeUser &&
                            <CommentForm auctionId={activeAuction._id} onCreate={handleOnCommentCreate} />
                        }
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default AuctionPage;
