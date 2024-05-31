import React, {Fragment} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {useAppSelector} from "hooks/app";
import CategoryCard from "components/ui/cards/category/CategoryCard";
import CategorySectionCard from "components/ui/cards/category/CategorySectionCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {useNavigate} from "react-router-dom";

const IndexPage: React.FC<{}> = () => {

    const navigate = useNavigate();

    const {categoryList} = useAppSelector((state) => state.category);

    return (
        <Fragment>
            <Grid sx={{marginBottom: 4}} container spacing={2}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                        <CategorySectionCard
                            caption="Нові надходження"
                            onClick={() => navigate('/auction?action=new')}
                            icon={<LibraryAddIcon fontSize="large"/>}
                        />

                        <CategorySectionCard
                            caption="Найпопулярніші"

                            onClick={() => {
                                console.log(2)
                            }}
                            icon={<FavoriteBorderIcon fontSize="large"/>}
                        />
                        <CategorySectionCard
                            caption="Комерційні авто"

                            onClick={() => {
                                console.log(3)
                            }}
                            icon={<LocalShippingIcon fontSize="large"/>}
                        />

                    </Stack>

                </Grid>
            </Grid>
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

export default IndexPage;
