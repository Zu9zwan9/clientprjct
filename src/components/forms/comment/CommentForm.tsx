import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from "hooks/app";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { unwrapResult } from '@reduxjs/toolkit';
import { Comment } from "models/Comment";
import TextField from "@mui/material/TextField";
import { useDashboardContext } from "components/template/dasbboard/DashboardContext";
import { createComment } from "store/slice/comment/actions/createComment";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export interface CommentFormProps {
    auctionId: string;
    onCreate?: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = (props) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Comment>();
    const { setNotification } = useDashboardContext();
    const [errorMsg, setErrorMsg] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedComments, setSubmittedComments] = useState<Comment[]>([]);

    const dispatch = useAppDispatch();
    const { activeUser } = useAppSelector(state => state.user);

    const onSubmit = async (data: Comment) => {
        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true); // Disable the button
        try {
            const resultAction = await dispatch(createComment({
                ...data,
                userId: activeUser?._id,
                userName: activeUser?.name,
                auctionId: props.auctionId,
            }));
            const comment = unwrapResult(resultAction);
            if (props.onCreate) {
                props.onCreate(comment);
            }
            setSubmittedComments(prev => [comment, ...prev]); // Add the new comment to the list
            reset({ comment: '' }); // Clear the comment field after submission
        } catch (error) {
            if (error instanceof Error) {
                setErrorMsg(error.message || "An error occurred");
            }
        } finally {
            setIsSubmitting(false); // Re-enable the button
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Stack alignItems="flex-end" spacing={2}>
                    <FormControl fullWidth variant="standard">
                        <Controller
                            name="comment"
                            control={control}
                            rules={{ required: 'Напишіть коментар' }} // Validation rule
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    multiline
                                    rows={4}
                                    variant="filled"
                                    fullWidth
                                    label="Напишіть коментар"
                                    error={!!errors.comment} // Show error state
                                    helperText={errors.comment ? errors.comment.message : ''} // Display error message
                                />
                            )}
                        />
                    </FormControl>

                    {errorMsg && (
                        <FormControl fullWidth>
                            <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                                {errorMsg}
                            </Alert>
                        </FormControl>
                    )}
                    <FormControl style={{ maxWidth: 200 }} variant="standard">
                        <Button type="submit" variant="outlined" disabled={isSubmitting}>Надіслати</Button>
                    </FormControl>
                </Stack>
            </form>
        </div>
    );
};

export default CommentForm;
