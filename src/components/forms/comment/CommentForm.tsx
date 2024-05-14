import React, {useEffect, useState} from "react";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import {Controller, useForm} from "react-hook-form";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "hooks/app";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import {unwrapResult} from '@reduxjs/toolkit';
import {useNavigate} from "react-router-dom";
import {Comment} from "models/Comment";
import {createCategory} from "store/slice/category/actions/CreateCategory";
import TextField from "@mui/material/TextField";
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {FormObjectProps} from "../FormProps";
import {editCategory} from "store/slice/category/actions/EditCategory";
import { createComment } from "store/slice/comment/actions/createComment";

export interface CommentFormProps extends FormObjectProps<Comment> {
    auctionId: string;
}

const CommentForm: React.FC<CommentFormProps> = (props) => {



    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: {errors}
    } = useForm<Comment>();

    const {setNotification} = useDashboardContext();

    const [errorMsg, setErrorMsg] = useState<string>();

    const navigate = useNavigate();

    let dispatch = useAppDispatch();
    const { activeUser  } = useAppSelector(state => state.user)

    function onSubmit(data: Comment) {

        dispatch(createComment({
                ...data,
                userId: activeUser?._id,
                userName: activeUser?.name,
                auctionId: props.auctionId
            }))
            .then(unwrapResult)
            .then(_comment => {
                props.onCreate && props.onCreate(_comment);
            }).catch(error => {

            })

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack alignItems="flex-end" spacing={2}>
               
                <FormControl fullWidth   variant="standard">
                    <Controller
                        name="comment"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                multiline
                                rows={4}
                               
                                variant="filled"
                                fullWidth
                                label="comment..."
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

export default CommentForm;
