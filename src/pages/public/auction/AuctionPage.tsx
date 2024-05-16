import {useAppDispatch, useAppSelector} from "hooks/app";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {sendAuctionRate, setActiveAuction} from "store/slice/auction/AuctionSlice";
import {getAuctionById} from "store/slice/auction/actions/GetAuctionById";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from "@mui/material/CardMedia";
import {BASE_URL} from "store/config";
import {Alert, Chip, FormControl, Grid, Input, InputAdornment, InputLabel, Stack} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import {AuctionRate} from 'models/AuctionRate';
import moment from "moment";
import AuctionRateCard from "components/ui/cards/auction-rate/AuctionRateCard";
import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";
import {getAuctionRate} from "store/slice/auction/actions/GetAuctionRate";
import { toast } from 'react-toastify';
import { CarBrand } from "models/CarBrand";
import CommentForm from "components/forms/comment/CommentForm";
import { GetAuctionComment } from "store/slice/comment/actions/GetAuctionComment";
import { unwrapResult } from "@reduxjs/toolkit";
import { Comment } from "models/Comment";
import { setCommentList } from "store/slice/comment/CommentSlice";
 

const AuctionPage: React.FC<{}> = () => {

    const {
        activeAuction, 
        carTypeList, 
        activeRateList,
        brandList
    } = useAppSelector(state => state.auction);

    const { categoryList } = useAppSelector(state => state.category)

    //const [commentList, setCommentList] = useState<Comment[]>([]);
    const { commentList } = useAppSelector(state => state.comment);

    const {activeUser} = useAppSelector(state => state.user);

    const [currentRate, setCurrentRate] = useState<number>(0);

    const [currentBrend, setCurrentBrend] = useState<CarBrand>();

    const {id} = useParams();

    const dispatch = useAppDispatch();


    useEffect(() => {

        if (id) dispatch(getAuctionById(id));

    }, [id]);

    useEffect(() => {


        return () => {
            dispatch(setActiveAuction(null));
            dispatch(setCommentList([]));
        }
    }, [])

    function handleButtonSendClick() {

        if (activeUser && currentRate && activeAuction) {
            let rate: AuctionRate = {
                time: moment().unix(),
                user: activeUser,
                value: currentRate,
                auctionId: activeAuction._id,
                _id: ""
            };

            console.log("test");

            if (activeRateList && activeRateList.length) {
                const minValue = activeRateList[0].value;

                console.log("min value")
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

    useEffect(() => {

        if (activeAuction) {
            setCurrentRate(activeAuction.price);

            dispatch(getAuctionRate(activeAuction._id));

            dispatch(GetAuctionComment(activeAuction._id))
              //  .then(unwrapResult)
              //  .then(_list => {
                    //setCommentList(_list);
             //   }).catch(error => {

             //   })


            setCurrentBrend(brandList.find(i => i.id == activeAuction.brandId));
        }


    }, [activeAuction]);

    useEffect(() => {

        if (activeRateList && activeRateList.length) {
            setCurrentRate(activeRateList[0].value);
        }

    }, [activeRateList]);

    const handleOnCommentCreate = (value: Comment) => {
        
    } 

    if (!activeAuction) return <>Аукціон не знайдено</>

    return (
        <>
            <Grid container>
                <Grid item xs={12}>

                    <Stack spacing={2} direction="row">
                        <Card sx={{minWidth: 275}}>
                            <CardContent>
                                <Stack direction="column" justifyContent="space-between" spacing={10}>
                                    <CardMedia
                                        component="img"
                                        sx={{maxWidth: 480}}
                                        image={`${activeAuction.thumbnail}`}
                                        alt="imgauction"
                                    />
                                    <Box width="100%">
                                        <Stack flexWrap="wrap" justifyContent="left" direction="column" spacing={1}>
                                            <Chip label={`Назва: ${activeAuction.name}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Ціна: ${activeAuction.price}$`} icon={<InfoIcon/>}/>
                                            <Chip label={`Категорія: ${ categoryList.find(i => i._id == activeAuction.categoryId)?.name}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Тип: ${ carTypeList.find(i => i.id == activeAuction.type)?.name}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Бренд: ${ currentBrend?.name}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Модель: ${ currentBrend?.modelList.find(i => i.id == activeAuction.modelId)?.name}`} icon={<InfoIcon/>}/>
                                            <Chip label={`ВІН код: ${activeAuction.vinCode}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Пробіг: ${activeAuction.carMileage}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Рік: ${activeAuction.year}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Колір ${activeAuction.color}`} icon={<InfoIcon/>}/>
                                            <Chip
                                                label={`Дата створення: ${moment(activeAuction.dateCreate).format("MMMM Do YYYY, h:mm:ss a")}`}
                                                icon={<InfoIcon/>}/>
                                            <Chip
                                                label={`Дата закриття: ${moment.unix(activeAuction.dateClose).format("MMMM Do YYYY, h:mm:ss a")}`}
                                                icon={<InfoIcon/>}/>
                                            <Chip label={`Переглядів: ${activeAuction.viewCount}`} icon={<InfoIcon/>}/>
                                            <Chip label={`Опис: ${activeAuction.description}`} icon={<InfoIcon/>}/>
                                            {activeAuction.isCommercial
                                                ? <Chip color="info" label={`Комерційне авто`} icon={<InfoIcon/>}/>
                                                : <></>
                                            }
                                        </Stack>


                                        {activeAuction.status == AuctionStatusEnum.ACTIVE
                                            ?
                                            <Stack sx={{marginTop: 4}} direction="row">
                                                <FormControl fullWidth variant="standard">
                                                    <InputLabel htmlFor="standard-adornment-amount">Ставка</InputLabel>
                                                    <Input
                                                        onChange={(e) => setCurrentRate(parseFloat(e.target.value))}
                                                       //defaultValue={activeAuction.price}
                                                        value={currentRate}
                                                        id="standard-adornment-amount"
                                                        startAdornment={<InputAdornment
                                                            position="start">$</InputAdornment>}
                                                    />
                                                </FormControl>
                                                <Button
                                                    onClick={handleButtonSendClick}
                                                    disabled={activeUser ? false : true}
                                                    sx={{width: 150}}
                                                    variant="contained"
                                                    endIcon={<SendIcon/>}
                                                >
                                                    Відправити
                                                </Button>

                                            </Stack>
                                            : <Alert sx={{marginTop: 4}} component={"div"} severity="warning">Аукціон
                                                завершений</Alert>
                                        }
                                    </Box>
                                </Stack>

                            </CardContent>
                        </Card>
                        <Stack sx={{marginLeft: 4}} spacing={1}>
                            {activeRateList.map((item, index) => <AuctionRateCard key={index} rate={item}/>)}
                        </Stack>
                    </Stack>

                </Grid>


            </Grid>
            <Grid container sx={{ marginTop: 4 }}>
                <Grid item xs={12}>
                    <Stack spacing={2}>
                        
                        {commentList.map(item => <>
                            <Box key={item._id}>{item.userName} {item.comment}</Box>
                        </>)}
                        {activeUser && 
                            <CommentForm auctionId={activeAuction._id}  onCreate={handleOnCommentCreate}/>
                        }

                       
                    </Stack>
                </Grid>
            </Grid>


        </>
    )
}

export default AuctionPage;
