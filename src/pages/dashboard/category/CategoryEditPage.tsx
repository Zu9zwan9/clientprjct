import React, {Fragment, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import CategoryForm from "components/forms/category/CategoryForm";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "store/config";
import {Category} from "models/Category";
import SectionCaption from "components/ui/caption/SectionCaption";

const DashboardCategoryEditPage: React.FC<{}> = () => {

    const {id} = useParams();

    const [cactegory, setCategory] = useState<Category>();

    useEffect(() => {

        axios
            .get(`${BASE_URL}/api/category/${id}`)
            .then((result) => {
                setCategory(result.data);
            }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    return (
        <Fragment>
            <SectionCaption caption="Редагування категорії"/>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <Stack spacing={4}>

                        <Card variant="outlined">
                            <CardContent>

                                <Stack spacing={4}>

                                    <CategoryForm object={cactegory}/>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>


                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DashboardCategoryEditPage;
