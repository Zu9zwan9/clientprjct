import React, {Fragment, useEffect} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {useAppSelector} from "hooks/app";
import CategoryCard from "components/ui/cards/category/CategoryCard";
import {useParams} from "react-router-dom";

const CategoryPage: React.FC<{}> = () => {

    const {categoryList} = useAppSelector((state) => state.category);

    let {url} = useParams();

    useEffect(() => {

        console.log(url);
    }, [url]);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Stack
                        spacing={4}
                        alignItems="center"
                        direction="row"
                        useFlexGap
                        flexWrap="wrap"
                    >
                        {categoryList.map((item) =>
                            <CategoryCard item={item} key={item._id}/>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default CategoryPage;
