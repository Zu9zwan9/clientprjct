import React, {useEffect, useState} from "react";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import {Controller, useForm} from "react-hook-form";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useAppDispatch} from "hooks/app";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNavigate} from "react-router-dom";
import {Category} from "models/Category";
import {createCategory} from "store/slice/category/actions/CreateCategory";
import TextField from "@mui/material/TextField";
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {FormObjectProps} from "../FormProps";
import {editCategory} from "store/slice/category/actions/EditCategory";


const CategoryForm: React.FC<FormObjectProps<Category>> = (props) => {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: {errors}
    } = useForm<Category>({

        //resolver: useYupValidationResolver(CustomDomainSchema),
        mode: 'all',
        shouldUnregister: false,
    });

    const {setNotification} = useDashboardContext();

    const [errorMsg, setErrorMsg] = useState<string>();

    const navigate = useNavigate();

    let dispatch = useAppDispatch();

    function onSubmit(data: Category) {

        setErrorMsg("");
        dispatch(data._id ? editCategory(data) : createCategory(data))
            .then(unwrapResult)
            .then((result) => {
                setNotification("Запит успішно виконаний");
                //reset();
                //console.log("result",result)
                //navigate("/");
            }).catch(error => {
            setErrorMsg(error);

        });

    }

    useEffect(() => {

        if (props.object) {
            Object.entries(props.object).forEach(
                ([name, value]: any) => setValue(name, value));
        }
    }, [props.object])

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack alignItems="flex-end" spacing={2}>
                <FormControl fullWidth error={!!errors.name} variant="standard">
                    <Controller
                        name="name"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                value={field.value ? field.value : ""}
                                variant="filled"
                                fullWidth
                                label="Назва"
                            />
                        )}
                    />
                    {errors.name && <FormHelperText id="input-name">{errors.name?.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={!!errors.name} variant="standard">
                    <Controller
                        name="description"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                multiline
                                rows={4}
                                value={field.value ? field.value : ""}
                                variant="filled"
                                fullWidth
                                label="Опис категорії"
                            />
                        )}
                    />

                </FormControl>
                {errorMsg && errorMsg.length &&
                    <FormControl fullWidth>
                        <Alert icon={<CheckIcon fontSize="inherit"/>} severity="error">
                            {errorMsg}
                        </Alert>
                    </FormControl>
                }
                <FormControl style={{maxWidth: 200}} variant="standard">
                    <Button type="submit" variant="outlined">Застосувати</Button>
                </FormControl>
            </Stack>
        </form>
    )
}

export default CategoryForm;
