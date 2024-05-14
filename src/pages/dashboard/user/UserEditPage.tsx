import React, {Fragment, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import SectionCaption from "components/ui/caption/SectionCaption";
import UserForm from "components/forms/user/UserForm";
import {User} from "models/User";
import {ServiceFactory} from "services/ServiceFactory";

const DashboardUserEditPage: React.FC<{}> = () => {

    const {id} = useParams();

    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (id)
            ServiceFactory
                .getUserService()
                .findById(id)
                .then(_user => {
                    console.log(_user);

                    setUser(_user);
                }).catch(error => {
                console.log(error)
            });

    }, [id]);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <SectionCaption caption="Редагування даних про користувача"/>
                <Grid item xs={12}>

                    <Stack spacing={4}>
                        <Card variant="outlined">
                            <CardContent>

                                <Stack spacing={4}>

                                    <UserForm object={user}/>
                                </Stack>
                            </CardContent>
                        </Card>

                    </Stack>


                </Grid>
            </Grid>
        </Fragment>
    )
}

export default DashboardUserEditPage;
