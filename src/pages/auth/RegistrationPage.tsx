import React, {Fragment} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link as RouteLink} from "react-router-dom";
import Link from "@mui/material/Link";
import RegistrationForm from "components/forms/auth/RegistrationForm";


const RegistrationPage: React.FC<{}> = () => {

    return (
        <Fragment>
            <Card sx={{maxWidth: 475, minWidth: 400}}>
                <CardContent>

                    <Typography align="center" variant="h5" my={2} component="div">
                        Реєстрація
                    </Typography>

                    <RegistrationForm/>

                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Вже є аккаунт? <Link component={RouteLink} to={'/auth/login'}>Авторизація</Link>
                    </Typography>
                </CardContent>
            </Card>


        </Fragment>
    )
}

export default RegistrationPage;
