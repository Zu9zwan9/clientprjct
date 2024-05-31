import React, { Fragment, useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDashboardContext } from "components/template/dasbboard/DashboardContext";
import { useNavigate } from "react-router-dom";
import { User } from "models/User";
import { ServiceFactory } from "services/ServiceFactory";
import SectionCaption from "components/ui/caption/SectionCaption";
import Hidden from '@mui/material/Hidden';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

const DashboardUserPage: React.FC<{}> = () => {
    const [userList, setUserList] = useState<User[]>([]);
    const { setNotification } = useDashboardContext();
    const navigate = useNavigate();

    const handleDelete = (user: User) => {
        ServiceFactory
            .getUserService()
            .remove(user)
            .then(result => {
                setNotification("Запит успішно виконаний");
                fetchUserList();
            }).catch(error => {
            console.log(error);
        });
    }

    const fetchUserList = () => {
        ServiceFactory
            .getUserService()
            .getAll()
            .then(list => {
                setUserList(list);
            });
    }

    useEffect(() => {
        fetchUserList();
    }, []);

    return (
        <Fragment>
            <SectionCaption caption="Список учасників" />
            <Grid container spacing={2}>
                <Hidden smDown>
                    <Grid item xs={12}>
                        <Stack
                            spacing={4}
                            alignItems="center"
                            direction="row"
                            useFlexGap
                            flexWrap="wrap"
                        >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: "200px" }}>ID</TableCell>
                                            <TableCell>Ім'я</TableCell>
                                            <TableCell>Електронна адреса</TableCell>
                                            <TableCell>Роль</TableCell>
                                            <TableCell style={{ width: "200px" }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userList.map((row) => (
                                            <TableRow
                                                key={row._id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row._id}
                                                </TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.role}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="contained" aria-label="Basic button group">
                                                        <Button onClick={() => {
                                                            navigate(`/dashboard/user/${row._id}/edit`)
                                                        }}>
                                                            <EditIcon />
                                                        </Button>
                                                        <Button onClick={() => handleDelete(row)}><DeleteIcon /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid container spacing={2}>
                        {userList.map((row) => (
                            <Grid item xs={12} key={row._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {row.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            ID: {row._id}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Електронна адреса: {row.email}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Роль: {row.role}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => navigate(`/dashboard/user/${row._id}/edit`)}>
                                            <EditIcon />
                                            Редагувати
                                        </Button>
                                        <Button size="small" onClick={() => handleDelete(row)}>
                                            <DeleteIcon />
                                            Видалити
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Hidden>
            </Grid>
        </Fragment>
    );
}

export default DashboardUserPage;
