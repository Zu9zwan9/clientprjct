import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    FormControl,
    Grid,
    Hidden,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Auction} from "models/Auction";
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ServiceFactory} from "services/ServiceFactory";
import {AuctionFilterBuilder} from "utils/filter/AuctionFilterBuilder";
import AuctionPublicTable from "components/ui/table/auction/AuctionPublicTable";
import {useAppSelector} from "hooks/app";
import {CarModel} from "models/CarModel";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import {AuctionStatusEnum} from "../../../types/enums/AuctionStatusEnum";
import {Location} from "models/Location";
import {AuctionRate} from "models/AuctionRate";
import {Country} from "../../../models/Country";

const AuctionListPage: React.FC<{}> = () => {
    const sortList = [
        {value: "new", label: "Найновіші"},
        {value: "popular", label: "Популярні"},
        {value: "commercial", label: "Комерційні"},
    ];

    const {carTypeList, brandList, countryList} = useAppSelector(state => state.auction);
    const {categoryList} = useAppSelector(state => state.category);

    const [auctionList, setAuctionList] = useState<Auction[]>([]);
    const [carModelList, setCarModelList] = useState<CarModel[]>([]);
    const [locationList, setLocationList] = useState<Location[]>([]);
    const [filter, setFilter] = useState<AuctionFilterBuilder>();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [latestBids, setLatestBids] = useState<Record<string, AuctionRate | null>>({});
    const [currentCountry, setCurrentCountry] = useState<Country>();

    useEffect(() => {
        console.log(searchParams.get("action"));
    }, [searchParams]);


    const fetchAuctionList = (fetchFilter: AuctionFilterBuilder) => {
        if (fetchFilter) {
            ServiceFactory.getAuctionService()
                .filter(fetchFilter)
                .then(result => {
                    setAuctionList(result);
                    result.forEach((auction: { _id: string; }) => {
                        ServiceFactory.getAuctionService()
                            .getAuctionRateById(auction._id)
                            .then(rates => {
                                if (rates.length > 0) {
                                    setLatestBids(prev => ({...prev, [auction._id]: rates[0]}));
                                } else {
                                    setLatestBids(prev => ({...prev, [auction._id]: null}));
                                }
                            });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    function handleButtonFilterClick() {
        filter && fetchAuctionList(filter);
    }

    function handleChangeCatTypeFilter(event: SelectChangeEvent) {
        setFilter(filter?.setType(event.target.value));
    }

    function handleChangeBrandFilter(event: SelectChangeEvent) {
        setFilter(filter?.setBrand(event.target.value));
        const brand = brandList.find(item => item._id == event.target.value);
        if (brand) setCarModelList(brand.modelList);
    }

    function handleChangeModelFilter(event: SelectChangeEvent) {
        setFilter(filter?.setModel(event.target.value));
    }

    function handleChangeCountryFilter(event: SelectChangeEvent) {
        setFilter(filter?.setCountry(event.target.value));
        const country = countryList.find(item => item._id == event.target.value);
        if (country) setLocationList(country.locationList);
    }

    function handleChangeLocationFilter(event: SelectChangeEvent) {
        setFilter(filter?.setLocation(event.target.value));
    }

    function handleChangeCategoryFilter(event: SelectChangeEvent) {
        setFilter(filter?.setCategory(event.target.value));
        filter && fetchAuctionList(filter);
    }

    function handleChangeSortFilter(event: SelectChangeEvent) {
        setFilter(filter?.setAction(event.target.value));
        filter && fetchAuctionList(filter);
    }

    useEffect(() => {
        let filter = new AuctionFilterBuilder();
        setFilter(filter);
        fetchAuctionList(filter);
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Категорія</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            onChange={handleChangeCategoryFilter}
                        >
                            <MenuItem value="">-</MenuItem>
                            {categoryList.map(item => (
                                <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="sort-select-label">Сортування</InputLabel>
                        <Select
                            labelId="sort-select-label"
                            id="sort-select"
                            onChange={handleChangeSortFilter}
                        >
                            <MenuItem value="">-</MenuItem>
                            {sortList.map((item, index) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                    <Box sx={{flex: 1, minWidth: {xs: '100%', md: '25%'}}}>
                        <Stack direction="column" spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="brand-select-label">Марка автомобіля</InputLabel>
                                <Select
                                    labelId="brand-select-label"
                                    id="brand-select"
                                    onChange={handleChangeBrandFilter}
                                >
                                    <MenuItem value="">-</MenuItem>
                                    {brandList.map(item => (
                                        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="model-select-label">Модель автомобіля</InputLabel>
                                <Select
                                    labelId="model-select-label"
                                    id="model-select"
                                    onChange={handleChangeModelFilter}
                                >
                                    <MenuItem value="">-</MenuItem>
                                    {carModelList?.map(item => (
                                        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="country-select-label">Країна</InputLabel>
                                <Select
                                    labelId="country-select-label"
                                    id="country-select"
                                    onChange={handleChangeCountryFilter}
                                >
                                    <MenuItem value="">-</MenuItem>
                                    {countryList.map(item => (
                                        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="location-select-label">Місто</InputLabel>
                                <Select
                                    labelId="location-select-label"
                                    id="location-select"
                                    onChange={handleChangeLocationFilter}
                                >
                                    <MenuItem value="">-</MenuItem>
                                    {locationList?.map(item => (
                                        <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => setFilter(filter?.setYearFrom(parseInt(e.target.value)))}
                                           label="Рік з" variant="outlined" fullWidth/>
                                <TextField onChange={(e) => setFilter(filter?.setYearTo(parseInt(e.target.value)))}
                                           label="Рік по" variant="outlined" fullWidth/>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    onChange={(e) => setFilter(filter?.setCarMileageFrom(parseInt(e.target.value)))}
                                    label="Пробіг з" variant="outlined" fullWidth/>
                                <TextField
                                    onChange={(e) => setFilter(filter?.setCarMileageTo(parseInt(e.target.value)))}
                                    label="Пробіг по" variant="outlined" fullWidth/>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => setFilter(filter?.setPriceFrom(parseInt(e.target.value)))}
                                           label="Ціна з" variant="outlined" fullWidth/>
                                <TextField onChange={(e) => setFilter(filter?.setPriceTo(parseInt(e.target.value)))}
                                           label="Ціна по" variant="outlined" fullWidth/>
                            </Stack>
                            <FormControl fullWidth>
                                <InputLabel id="car-type-select-label">Тип кузова</InputLabel>
                                <Select
                                    labelId="car-type-select-label"
                                    id="car-type-select"
                                    onChange={handleChangeCatTypeFilter}
                                >
                                    <MenuItem value="">-</MenuItem>
                                    {carTypeList.map(item => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button onClick={handleButtonFilterClick} variant="contained">Фільтр</Button>
                        </Stack>
                    </Box>
                    <Hidden smDown>
                        <Box sx={{flex: 2}}>
                            <AuctionPublicTable auctionList={auctionList} latestBids={latestBids}/>
                        </Box>
                    </Hidden>
                </Stack>
            </Grid>
            <Hidden smUp>
                <Grid container spacing={2}>
                    {auctionList.map((row) => (
                        <Grid item xs={12} key={row._id}>
                            <Card sx={{ml: 2}}>
                                {row.thumbnail && (
                                    <img style={{height: "auto", width: '100%', objectFit: 'cover'}}
                                         src={`${row.thumbnail}`}/>
                                )}
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {row.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {brandList.find(item => item._id === row.brandId)?.name} / {brandList.find(item => item._id === row.brandId)?.modelList?.find(model => model._id === row.modelId)?.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {currentCountry?.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Країна/Місто: {countryList.find(item => item._id === row.countryId)?.name} / {countryList.find(item => item._id === row.countryId)?.locationList?.find(location => location._id === row.locationId)?.name}
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
                                        Тип Авто: {carTypeList.find(item => item.id === row.type)?.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Остання
                                        ставка: {latestBids[row._id] ? `${latestBids[row._id]?.value} $` : "Ставки відсутні"}
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
        </Grid>
    );
}

export default AuctionListPage;
