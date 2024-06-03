import React from "react";
import {Button, Card, CardActions, CardContent, Chip, Grid, Hidden, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Visibility';
import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";
import moment from "moment";
import {Auction} from "models/Auction";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "hooks/app";
import {AuctionRate} from "models/AuctionRate";

export interface AuctionPublicTableProps {
    auctionList: Auction[],
    latestBids: Record<string, AuctionRate | null>
}

const AuctionPublicTable: React.FC<AuctionPublicTableProps> = (props) => {
    const {carTypeList, brandList, countryList} = useAppSelector(state => state.auction);
    const navigate = useNavigate();

    function getCarCaption(item: Auction) {
        const brand = brandList.find(_item => _item._id === item.brandId);
        let caption = "";
        if (brand) {
            caption = caption.concat(brand.name);
            const model = brand.modelList?.find(_item => _item._id === item.modelId);
            if (model) {
                caption = caption.concat(" / ").concat(model.name);
            }
        }
        return caption;
    }

    function getCountryLocation(item: Auction) {
        const country = countryList.find((_item: { _id: string | undefined; }) => _item._id === item.countryId);
        let location = "";
        if (country) {
            location = location.concat(country.name);
            const city = country.locationList?.find((_item: {
                _id: string | undefined;
            }) => _item._id === item.locationId);
            if (city) {
                location = location.concat(" / ").concat(city.name);
            }
        }

        return location;
    }

    function getLatestBid(auctionId: string) {
        const bid = props.latestBids[auctionId];
        return bid ? `${bid.value} $` : "Ставки відсутні";
    }

    return (
        <div>
            <Hidden smDown>
                <Grid container spacing={2}>
                    {props.auctionList.map((row) => (
                        <Grid item xs={12} sm={6} md={4} key={row._id}>
                            <Card>
                                {row.thumbnail && (
                                    <img style={{height: 200, width: '100%', objectFit: 'cover'}}
                                         src={`${row.thumbnail}`}/>
                                )}
                                <CardContent>
                                    <Typography variant="h6" color={"primary"} component="div"
                                                style={{textTransform: 'uppercase'}}
                                    >{row.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Виробник/Модель: {getCarCaption(row)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Тип кузова: {carTypeList.find(item => item.id === row.type)?.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Рік: {row.year}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Пробіг: {row.carMileage} км
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Країна/Місто: {getCountryLocation(row)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Стартова ціна: {row.price} $
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Остання ставка: {getLatestBid(row._id)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Дата Закриття: {moment.unix(row.dateClose).format('MM Do YYYY, h:mm:ss ')}
                                    </Typography>
                                    <Chip
                                        label={row.status === AuctionStatusEnum.ACTIVE ? "Активний" : "Завершений"}
                                        color={row.status === AuctionStatusEnum.ACTIVE ? "success" : "primary"}
                                        variant="outlined"/>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => navigate(`/auction/${row._id}`)}>
                                        <Chip color="info" variant="filled" icon={<EditIcon/>} label="Переглянути"/>
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Grid container spacing={2}>
                    {props.auctionList.map((row) => (
                        <Grid item xs={12} key={row._id}>
                            <Card>
                                {row.thumbnail && (
                                    <img style={{height: 200, width: '100%', objectFit: 'cover'}}
                                         src={`${row.thumbnail}`}/>
                                )}
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {row.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {getCarCaption(row)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Дата Закриття: {moment.unix(row.dateClose).format('MM Do YYYY, h:mm:ss ')}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Стартова ціна: {row.price}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Рік: {row.year}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Пробіг: {row.carMileage}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Тип кузова: {carTypeList.find(item => item.id === row.type)?.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Остання ставка: {getLatestBid(row._id)}
                                    </Typography>
                                    <Chip
                                        label={row.status === AuctionStatusEnum.ACTIVE ? "Активний" : "Завершений"}
                                        color={row.status === AuctionStatusEnum.ACTIVE ? "success" : "primary"}
                                        variant="outlined"
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => navigate(`/auction/${row._id}`)}>
                                        <EditIcon/>
                                        Переглянути
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Hidden>
        </div>
    );
}

export default AuctionPublicTable;
