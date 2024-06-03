import React, {useEffect, useState} from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import {Controller, useForm} from "react-hook-form";
import {User} from "models/User";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "hooks/app";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {FormObjectProps} from "../FormProps";
import {ServiceFactory} from "services/ServiceFactory";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Role} from "types/enums/RoleEnum";
import {setActiveUser} from "store/slice/user/UserSlice";
import getBase64Image from "hooks/useBase64Image";


const UserForm: React.FC<FormObjectProps<User>> = (props) => {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: {errors},
        getValues
    } = useForm<User>({

        mode: 'all',
        shouldUnregister: false,
    });

    const {activeUser} = useAppSelector(state => state.user);
    const [userRole, setUserRole] = useState<string[]>([Role.CLIENT, Role.ROOT]);
    const {setNotification} = useDashboardContext();
    const [errorMsg, setErrorMsg] = useState<string>();
    const [thumbnail, setThumbnail] = useState<any>();
    const navigate = useNavigate();
    let dispatch = useAppDispatch();

    const handleThumbnailChange = async (newValue: any) => {
        setValue("thumbnail_file", newValue);
        const base64 = await getBase64Image(newValue);
        setThumbnail(base64);
    }


    function onSubmit(data: User) {

        setErrorMsg("");

        ServiceFactory
            .getUserService()
            .edit(data)
            .then(_user => {
                setNotification("Запит успішно виконаний");
                if (activeUser?._id == _user._id) {
                    dispatch(setActiveUser(_user));
                }
            }).catch(error => {
            console.log(error)
        });
    }

    useEffect(() => {
        if (props.object) {
            Object.entries(props.object).forEach(([name, value]: any) => setValue(name, value));
        }
    }, [props.object]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack spacing={2}>
                <Controller
                    name="role"
                    control={control}
                    defaultValue={props.object?.role || Role.CLIENT}  // Задаємо початкове значення ролі користувача, якого редагуємо
                    render={({field}) => (
                        <FormControl fullWidth error={!!errors.role} variant="outlined">
                            <InputLabel id="role-label">Роль</InputLabel>
                            <Select
                                {...field}
                                labelId="role-label"
                                label="Role"
                                disabled={activeUser?.role !== Role.ROOT}
                            >
                                <MenuItem value={Role.CLIENT}>Client</MenuItem>
                                <MenuItem value={Role.ROOT}>Root</MenuItem>
                            </Select>
                            {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
                        </FormControl>
                    )}
                />

                {/*{activeUser?.role == Role.ROOT  */}
                {/*    ?<FormControl>*/}
                {/*    <Grid container>*/}
                {/*        <Grid item xs={6}>*/}
                {/*            <FormControl fullWidth variant="standard">*/}
                {/*                <MuiFileInput*/}
                {/*                    value={thumbnail}*/}
                {/*                    label="Оберіть файл для обкладинки"*/}

                {/*                    onChange={handleThumbnailChange}*/}
                {/*                />*/}
                {/*            </FormControl>*/}

                {/*        </Grid>*/}
                {/*        <Grid item xs={6}>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</FormControl>*/}

                {/*    : ""*/}

                {/*}*/}

                {/* */}


                <FormControl fullWidth error={errors.name ? true : false} variant="standard">
                    <Controller
                        name="name"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                value={field.value ? field.value : ""}
                                variant="filled"
                                fullWidth
                                label="І'мя"
                            />
                        )}
                    />
                    {errors.name && <FormHelperText id="input-name">{errors.name?.message}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={errors.email ? true : false} variant="standard">
                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                value={field.value ? field.value : ""}
                                variant="filled"
                                fullWidth
                                label="Електронна адреса"
                            />
                        )}
                    />
                    {errors.email && <FormHelperText id="input-name">{errors.email?.message}</FormHelperText>}
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

export default UserForm;
