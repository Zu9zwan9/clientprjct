import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Stack, FormControl } from '@mui/material';

function CarBrandModelForm() {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        // Here you can handle the form submission
        // For example, you can send a request to the server to create a new CarBrand and CarModel
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <FormControl fullWidth variant="standard">
                    <Controller
                        name="brand"
                        control={control}
                        rules={{ required: 'This field is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="filled"
                                fullWidth
                                label="Brand"
                                error={!!errors.brand}

                            />
                        )}
                    />
                </FormControl>
                <FormControl fullWidth variant="standard">
                    <Controller
                        name="model"
                        control={control}
                        rules={{ required: 'This field is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="filled"
                                fullWidth
                                label="Model"
                                error={!!errors.model}
                            />
                        )}
                    />
                </FormControl>
                <Button type="submit" variant="contained">Submit</Button>
            </Stack>
        </form>
    );
}

export default CarBrandModelForm;
