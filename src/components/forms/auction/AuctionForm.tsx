import React, { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Controller, useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from "hooks/app";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useDashboardContext } from "components/template/dasbboard/DashboardContext";
import { FormObjectProps } from "../FormProps";
import { Auction } from "models/Auction";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CarModel } from "models/CarModel";
import getBase64Image from "hooks/useBase64Image";
import { MuiFileInput } from 'mui-file-input';
import { createAuction } from "store/slice/auction/actions/CreateAuction";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { editAuction } from "store/slice/auction/actions/EditAuction";
import moment, { Moment } from "moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { getCarBrandList } from "store/slice/auction/actions/GetCarBrands";
import { getCountryList } from "store/slice/auction/actions/GetCountries";
import { Location } from "models/Location";

const AuctionForm: React.FC<FormObjectProps<Auction>> = (props) => {
    const { brandList, carTypeList, countryList } = useAppSelector(state => state.auction);
    const { categoryList } = useAppSelector(state => state.category);
    const [modelList, setModelList] = useState<CarModel[]>([]);
    const [locationList, setLocationList] = useState<Location[]>([]);
    const [thumbnail, setThumbnail] = useState<any>(null);
    const [valueDatePicker, setValueDatePicker] = useState<Moment | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        control,
        formState: { errors }
    } = useForm<Auction>({
        mode: 'all',
        shouldUnregister: false,
    });

    const watchBrand = watch('brandId');
    const watchCountry = watch('countryId');
    const { setNotification } = useDashboardContext();
    const [errorMsg, setErrorMsg] = useState<string>();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const colorOptions = [
        { color: "#ff0000", label: "Червоний" },
        { color: "#00ff00", label: "Зелений" },
        { color: "#0000ff", label: "Синій" },
        { color: "#ffff00", label: "Жовтий" },
        { color: "#ffa500", label: "Помаранчевий" },
        { color: "#800080", label: "Фіолетовий" },
        { color: "#000000", label: "Чорний" },
        { color: "#ffffff", label: "Білий" },
        { color: "#808080", label: "Сірий" },
        { color: "#800000", label: "Коричневий" },
        { color: "#008000", label: "Зелений" },
        { color: "#000080", label: "Темно-синій" },
        { color: "#008080", label: "Бірюзовий" },
        { color: "#c0c0c0", label: "Сріблястий" },
        { color: "#ff00ff", label: "Рожевий" },
        { color: "#ffa07a", label: "Лососевий" },
        { color: "#f0e68c", label: "Хакі" },
        { color: "#d3d3d3", label: "Світло-сірий" },
        { color: "#ff4500", label: "Помаранчево-червоний" },
        { color: "#ff69b4", label: "Рожево-фіолетовий" },
        { color: "#f0ffff", label: "Блідо-блакитний" },
        { color: "#f5f5dc", label: "Блідо-золотий" },
        { color: "#f5f5f5", label: "Блідо-сірий" },
        { color: "#f5fffa", label: "М'ятний" },
    ];
    let dispatch = useAppDispatch();

    function onSubmit(data: Auction) {
        setIsSubmitting(true);
        if (!data.dateClose || data.dateClose < moment().unix()) {
            setNotification("Неможливо створити лот минулою датою або без дати закриття");
            setIsSubmitting(false);
            return;
        }
        if (moment().unix() > data.dateClose) {
            setNotification("Неможливо змінювати ціну після закінчення аукціону");
            setIsSubmitting(false);
            return;
        }
        data.brandId = data.brandId ? data.brandId : "";
        data.modelId = data.modelId ? data.modelId : "";
        data.countryId = data.countryId ? data.countryId : "";
        data.locationId = data.locationId ? data.locationId : "";

        dispatch(data._id ? editAuction(data) : createAuction(data))
            .then(unwrapResult)
            .then((result) => {
                setNotification("Запит успішно виконаний");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }).catch(error => {
            setErrorMsg(error);
            setIsSubmitting(false);
        });
    }

    const handleThumbnailChange = async (newValue: any) => {
        setValue("thumbnail_file", newValue);
        const base64 = await getBase64Image(newValue);
        setThumbnail(base64);
    }

    useEffect(() => {
        dispatch(getCarBrandList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCountryList());
    }, [dispatch]);

    useEffect(() => {
        console.log("handleOnCarBrandChange", watchBrand);
        setValue("modelId", undefined);
        let brand = brandList.find(item => item._id === watchBrand);
        if (brand) setModelList(brand.modelList);
    }, [watchBrand, brandList, setValue]);

    useEffect(() => {
        console.log("handleOnCountryChange", watchCountry);
        setValue("locationId", undefined);
        let country = countryList.find(item => item._id === watchCountry);
        if (country) setLocationList(country.locationList);
    }, [watchCountry, countryList, setValue]);

    useEffect(() => {
        if (props.object) {
            Object.entries(props.object).forEach(
                ([name, value]: any) => setValue(name, value)
            );

            let brand = brandList.find(item => item._id === props.object?.brandId);
            if (brand) setModelList(brand.modelList);

            let country = countryList.find(item => item._id === props.object?.countryId);
            if (country) setLocationList(country.locationList);

            setValueDatePicker(moment.unix(props.object.dateClose));
            setThumbnail(`${props.object.thumbnail}`);
        }
    }, [props.object, brandList, countryList, setValue]);

    useEffect(() => {
        props.object && setValue("modelId", props.object.modelId);
    }, [modelList, props.object, setValue]);

    useEffect(() => {
        props.object && setValue("locationId", props.object.locationId);
    }, [locationList, props.object, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack alignItems="flex-start" spacing={2}>
                <FormControl fullWidth error={!!errors.name} variant="standard">
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Категорія обов'язкова" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ""}
                                variant="filled"
                                fullWidth
                                label="Назва"
                            />
                        )}
                    />
                    {errors.name && <FormHelperText id="input-name">{errors.name?.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={errors.categoryId ? true : false} variant="standard">
                    <InputLabel id="category-select-standard-label">Категорія</InputLabel>
                    <Controller
                        name="categoryId"
                        control={control}
                        rules={{ required: "Категорія обов'язкова" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="category-select-standard-label"
                                id="category-select-standard"
                                value={field.value || ""}
                                variant="filled"
                                fullWidth
                                label="Категорія"
                            >
                                {categoryList.map(item => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
                            </Select>
                        )}
                    />
                    {errors.categoryId && <FormHelperText id="input-name">{errors.categoryId?.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={errors.type ? true : false} variant="standard">
                    <InputLabel id="type-select-standard-label">Тип автомобіля</InputLabel>
                    <Controller
                        name="type"
                        control={control}
                        rules={{ required: "Тип автомобіля обов'язковий" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                labelId="type-select-standard-label"
                                label="Тип кузова"
                                id="category-select-standard"
                                value={field.value || ""}
                                variant="filled"
                                fullWidth
                            >
                                {carTypeList.map(item => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
                            </Select>
                        )}
                    />
                    {errors.type && <FormHelperText id="input-name">{errors.type?.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth variant="filled">
                    <DemoContainer components={['DateTimePicker']}>
                        <DemoItem label={"Дата закриття лоту"}>
                            <DateTimePicker
                                value={valueDatePicker || null}
                                defaultValue={props.object?.dateClose ? moment.unix(props.object.dateClose) : null}
                                disablePast
                                onChange={(value) => {
                                    value && setValue("dateClose", value.unix())
                                }}
                            />
                        </DemoItem>
                    </DemoContainer>
                </FormControl>
                <FormControl fullWidth error={!!errors.price} variant="standard">
                    <Controller
                        name="price"
                        control={control}
                        rules={{ required: "Ціна обов'язкова" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ""}
                                variant="filled"
                                fullWidth
                                label="Ціна"
                            />
                        )}
                    />
                    {errors.price && <FormHelperText id="input-name">{errors.price?.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.vinCode} variant="standard">
                    <Controller
                        name="vinCode"
                        control={control}
                        rules={{ required: "ВІН код обов'язковий" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value || ""}
                                variant="filled"
                                fullWidth
                                label="ВІН код"
                            />
                        )}
                    />
                    {errors.vinCode && <FormHelperText id="input-name">{errors.vinCode?.message}</FormHelperText>}
                </FormControl>
                <Grid container>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                            <FormControl fullWidth error={errors.brandId ? true : false} variant="standard">
                                <DemoItem label={"Виробник"}>
                                    {/* The children prop here */}
                                    <Controller
                                        name="brandId"
                                        control={control}
                                        rules={{ required: "Виробник обов'язковий" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="car-brand-select-standard-label"
                                                id="car-brand-select-standard"
                                                value={field.value || ""}
                                                variant="filled"
                                                fullWidth
                                                label="Виробник"
                                            >
                                                {brandList.map(item => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
                                            </Select>
                                        )}
                                    />
                                </DemoItem>
                                {errors.brandId && <FormHelperText id="input-name">{errors.brandId?.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth error={errors.modelId ? true : false} variant="standard">
                                <DemoItem label={"Модель"}>
                                    {/* The children prop here */}
                                    <Controller
                                        name="modelId"
                                        control={control}
                                        rules={{ required: "Модель обов'язкова" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="car-brand-select-standard-label"
                                                id="car-brand-select-standard"
                                                value={field.value || ""}
                                                variant="filled"
                                                fullWidth
                                                label="Модель"
                                            >
                                                {modelList?.map(item => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
                                            </Select>
                                        )}
                                    />
                                </DemoItem>
                                {errors.modelId && <FormHelperText id="input-name">{errors.modelId?.message}</FormHelperText>}
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                            <FormControl fullWidth error={errors.countryId ? true : false} variant="standard">
                                <DemoItem label={"Країна"}>
                                    {/* The children prop here */}
                                    <Controller
                                        name="countryId"
                                        control={control}
                                        rules={{ required: "Країна обов'язкова" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="country-select-standard-label"
                                                id="country-select-standard"
                                                value={field.value || ""}
                                                variant="filled"
                                                fullWidth
                                                label="Країна"
                                            >
                                                {countryList.map(item => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
                                            </Select>
                                        )}
                                    />
                                </DemoItem>
                                {errors.countryId && <FormHelperText id="input-name">{errors.countryId?.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth error={errors.locationId ? true : false} variant="standard">
                                <DemoItem label={"Місто"}>
                                    {/* The children prop here */}
                                    <Controller
                                        name="locationId"
                                        control={control}
                                        rules={{ required: "Місто обов'язкове" }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                labelId="location-select-standard-label"
                                                id="location-select-standard"
                                                value={field.value || ""}
                                                variant="filled"
                                                fullWidth
                                                label="Місто"
                                            >
                                                {locationList?.map(item => <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)}
                                            </Select>
                                        )}
                                    />
                                </DemoItem>
                                {errors.locationId && <FormHelperText id="input-name">{errors.locationId?.message}</FormHelperText>}
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="standard">
                            <MuiFileInput
                                value={thumbnail}
                                label="Оберіть файл для обкладинки"
                                onChange={handleThumbnailChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {thumbnail && <img src={thumbnail} style={{ height: 150 }} alt="thumbnail" />}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <FormControl fullWidth error={!!errors.year} variant="standard">
                                <Controller
                                    name="year"
                                    control={control}
                                    rules={{ required: "Рік виробництва обов'язковий" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            value={field.value || ""}
                                            variant="filled"
                                            fullWidth
                                            label="Рік виробництва"
                                        />
                                    )}
                                />
                                {errors.year && <FormHelperText id="input-name">{errors.year?.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth error={errors.carMileage ? true : false} variant="standard">
                                <Controller
                                    name="carMileage"
                                    control={control}
                                    rules={{ required: "Пробіг обов'язковий" }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            value={field.value || ""}
                                            variant="filled"
                                            fullWidth
                                            label="Пробіг"
                                        />
                                    )}
                                />
                                {errors.carMileage && <FormHelperText id="input-name">{errors.carMileage?.message}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth error={!!errors.color} variant="standard">
                                <InputLabel id="color-select-label">Колір</InputLabel>
                                <Controller
                                    name="color"
                                    control={control}
                                    rules={{ required: "Колір обов'язковий" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            labelId="color-select-label"
                                            id="color-select"
                                            label="Колір"
                                            value={field.value || ""}
                                            onChange={(e) => setValue("color", e.target.value)}
                                        >
                                            {colorOptions.map(option => (
                                                <MenuItem key={option.color} value={option.label}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <div style={{
                                                            backgroundColor: option.color,
                                                            width: 20,
                                                            height: 20,
                                                            marginRight: 10,
                                                            borderRadius: '50%'
                                                        }} />
                                                        {option.label}
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                                {errors.color && <FormHelperText id="input-color">{errors.color?.message}</FormHelperText>}
                            </FormControl>
                        </Stack>
                    </Grid>
                </Grid>
                <FormControl error={errors.description ? true : false} variant="standard">
                    <FormControlLabel
                        control={
                            <Controller
                                name="isCommercial"
                                control={control}
                                defaultValue={props.object?.isCommercial}
                                render={({ field }) => (
                                    <Checkbox
                                        {...field}
                                        value={field.value || false}
                                        checked={!!field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                )}
                            />
                        }
                        label="Комерційне авто"
                    />
                </FormControl>
                <FormControl fullWidth error={errors.description ? true : false} variant="standard">
                    <Controller
                        name="description"
                        control={control}
                        rules={{
                            required: "Опис обов'язковий",
                            maxLength: {
                                value: 60,
                                message: "Опис не може містити більше ніж 60 символів"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                multiline
                                rows={4}
                                value={field.value || ""}
                                variant="filled"
                                fullWidth
                                label="Опис"
                                inputProps={{ maxLength: 60 }}
                                helperText={errors.description ? errors.description.message : `${field.value?.length || 0}/60`}
                            />
                        )}
                    />
                    {errors.description && <FormHelperText id="input-description">{errors.description?.message}</FormHelperText>}
                </FormControl>
                {errorMsg && (
                    <FormControl fullWidth>
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                            {errorMsg}
                        </Alert>
                    </FormControl>
                )}
                <FormControl style={{ maxWidth: 200 }} variant="standard">
                    <Button type="submit" variant="outlined" disabled={isSubmitting}>
                        Застосувати
                    </Button>
                </FormControl>
            </Stack>
        </form>
    );
}

export default AuctionForm;
