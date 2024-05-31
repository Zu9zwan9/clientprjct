import React, {Fragment} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const CarListPage: React.FC<{}> = () => {

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    filters
                </Grid>
                <Grid item xs={8}>
                    <Stack
                        spacing={4}
                        alignItems="center"
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                    >
                        cars
                    </Stack>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default CarListPage;
