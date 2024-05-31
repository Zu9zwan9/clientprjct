import React, {Fragment} from "react";
import Grid from '@mui/material/Grid';
import CategoryForm from "components/forms/category/CategoryForm";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Stack} from "@mui/material";
import SectionCaption from "components/ui/caption/SectionCaption";

const DashboardCategoryCreatePage: React.FC<{}> = () => {


    return (
        <Fragment>
            <SectionCaption caption="Створити категорію"/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={4}>
                                <CategoryForm/>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DashboardCategoryCreatePage;
