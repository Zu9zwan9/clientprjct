import {Button, FormControl, Grid, InputLabel, Stack} from "@mui/material";
import {Auction} from "models/Auction";
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ServiceFactory} from "services/ServiceFactory";
import {AuctionFilterBuilder} from "utils/filter/AuctionFilterBuilder";
import AuctionPublicTable from "components/ui/table/auction/AuctionPublicTable";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {useAppSelector} from "hooks/app";
import {CarModel} from "models/CarModel";


const AuctionListPage: React.FC<{}> = () => {

    const sortList = [
        {value: "new", label: "Найновіші"},
        {value: "popular", label: "Популярні"},
        {value: "comercial", label: "Комерційні"},
    ]

    const {carTypeList, brandList} = useAppSelector(state => state.auction);
    const {categoryList} = useAppSelector(state => state.category);

    const [auctionList, setAuctionList] = useState<Auction[]>([]);
    const [carModelList, setCArModelList] = useState<CarModel[]>([]);

    const [filter, setFilter] = useState<AuctionFilterBuilder>();

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {

        console.log(searchParams.get("action"));

    }, [searchParams]);

    const fetchAuctionList = (fetchFilter: AuctionFilterBuilder) => {
        if (fetchFilter) {
            ServiceFactory
                .getAuctionService()
                .filter(fetchFilter)
                .then(result => {
                    setAuctionList(result);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    function handleButtonFilterClick() {
        filter && fetchAuctionList(filter);
    }

    function handleChangeCatTypeFilter(event: SelectChangeEvent) {
        setFilter(filter?.setType(event.target.value));
    }

    function handleChangeBrandFilter(event: SelectChangeEvent) {
        setFilter(filter?.setBrand(parseInt(event.target.value)));

        const brand = brandList.find(item => item.id == parseInt(event.target.value));

        if (brand) setCArModelList(brand.modelList);
    }

    function handleChangeModelFilter(event: SelectChangeEvent) {
        setFilter(filter?.setModel(event.target.value));
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
        <>
            <Grid container>
                <Grid item sx={{marginBottom: 4}} xs={12}>
                    <Stack direction="row" spacing={4}>
                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">Категорія</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="brand-select"
                                //value="-1"
                                label="Категорія"
                                onChange={handleChangeCategoryFilter}
                            >
                                <MenuItem value="">-</MenuItem>
                                {categoryList.map(item => <MenuItem key={item._id}
                                                                    value={item._id}>{item.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="sort-select-label">Сортування</InputLabel>
                            <Select
                                labelId="sort-select-label"
                                id="brand-select"
                                //value="-1"
                                label="Сортування"
                                onChange={handleChangeSortFilter}
                            >
                                <MenuItem value="">-</MenuItem>
                                {sortList.map((item, index) => <MenuItem key={index}
                                                                         value={item.value}>{item.label}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Stack>


                </Grid>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={4}>
                        <Stack direction="column" spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel id="brand-select-label">Марка автомобіля</InputLabel>
                                <Select
                                    labelId="brand-select-label"
                                    id="brand-select"
                                    //value="-1"
                                    label="Марка автомобіля"
                                    onChange={handleChangeBrandFilter}
                                >
                                    <MenuItem value="-1">-</MenuItem>
                                    {brandList.map(item => <MenuItem key={item.id}
                                                                     value={item.id}>{item.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="model-select-label">Модель автомобіля</InputLabel>
                                <Select
                                    labelId="model-select-label"
                                    id="model-select"
                                    //value="-1"
                                    label="Модель автомобіля"
                                    onChange={handleChangeModelFilter}
                                >
                                    <MenuItem value="-1">-</MenuItem>
                                    {carModelList.map(item => <MenuItem key={item.id}
                                                                        value={item.id}>{item.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => {
                                    setFilter(filter?.setYearFrom(parseInt(e.target.value)))
                                }} label="Рік з" variant="outlined"/>
                                <TextField onChange={(e) => {
                                    setFilter(filter?.setYearTo(parseInt(e.target.value)))
                                }} label="Рік по" variant="outlined"/>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => {
                                    setFilter(filter?.setCarMileageFrom(parseInt(e.target.value)))
                                }} label="Пробіг з" variant="outlined"/>
                                <TextField onChange={(e) => {
                                    setFilter(filter?.setCarMileageTo(parseInt(e.target.value)))
                                }} label="Пробіг по" variant="outlined"/>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField onChange={(e) => {
                                    setFilter(filter?.setPriceFrom(parseInt(e.target.value)))
                                }} label="Ціна з" variant="outlined"/>
                                <TextField onChange={(e) => {
                                    setFilter(filter?.setPriceTo(parseInt(e.target.value)))
                                }} label="Ціна по" variant="outlined"/>
                            </Stack>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Тип автомобіля</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    //value={age}
                                    label="Тип автомобіля"
                                    onChange={handleChangeCatTypeFilter}
                                >
                                    <MenuItem value="">-</MenuItem>
                                    {carTypeList.map(item => <MenuItem key={item.id}
                                                                       value={item.id}>{item.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Button onClick={handleButtonFilterClick} variant="contained"> Фільтр</Button>
                        </Stack>
                        <AuctionPublicTable auctionList={auctionList}/>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default AuctionListPage;
