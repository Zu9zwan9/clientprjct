import React, {Fragment} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SignInForm from "components/forms/auth/SignInForm";
import {Link as RouteLink} from "react-router-dom";
import Link from "@mui/material/Link";


const LoginPage: React.FC<{}> = () => {

    return (
        <Fragment>

            <Card sx={{maxWidth: 475, minWidth: 400}}>
                <CardContent>

                    <Typography align="center" variant="h5" my={2} component="div">
                        Авторизація
                    </Typography>

                    <SignInForm/>

                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        Немає аккаунта? <Link component={RouteLink} to={'/auth/registration'}>Реєстрація</Link>
                    </Typography>
                </CardContent>
            </Card>

        </Fragment>
    )
}

export default LoginPage;
