import React, {Fragment, useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch} from "hooks/app";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useDashboardContext} from "components/template/dasbboard/DashboardContext";
import {useNavigate} from "react-router-dom";
import SectionCaption from "components/ui/caption/SectionCaption";
import {ServiceFactory} from "services/ServiceFactory";
import {Auction} from "models/Auction";
import moment from "moment";
import Chip from "@mui/material/Chip";
import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";
import Hidden from '@mui/material/Hidden';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

const DashboardAuctionPage: React.FC<{}> = () => {
    const [auctionList, setAuctionList] = useState<Auction[]>([]);
    const {setNotification} = useDashboardContext();
    const navigate = useNavigate();
    let dispatch = useAppDispatch();

    const handleDelete = (auction: Auction) => {
        ServiceFactory.getAuctionService().remove(auction).then(result => {
            setNotification("Запит успішно виконаний");
            fetchAuctionList();
        });
    }

    const fetchAuctionList = () => {
        ServiceFactory.getAuctionService().getAll().then(list => {
            setAuctionList(list);
        });
    }

    useEffect(() => {
        fetchAuctionList();
    }, []);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <SectionCaption caption="Список аукціонів"/>
                <Grid item xs={12}>
                    <Hidden smDown>
                        <Stack spacing={4} alignItems="center" direction="row" useFlexGap flexWrap="wrap">
                            <TableContainer component={Paper}>
                                <Table sx={{minWidth: 650}} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{width: "200px"}}>ID</TableCell>
                                            <TableCell>Зображення</TableCell>
                                            <TableCell>Назва</TableCell>
                                            <TableCell>Дата Створення</TableCell>
                                            <TableCell>Дата Закриття</TableCell>
                                            <TableCell>Базова ціна</TableCell>
                                            <TableCell>Статус</TableCell>
                                            <TableCell style={{width: "200px"}}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {auctionList.map((row) => (
                                            <TableRow key={row._id}
                                                      sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell component="th" scope="row">
                                                    {row._id}
                                                </TableCell>
                                                <TableCell>
                                                    {row.thumbnail &&
                                                        <img style={{height: 100}} src={`${row.thumbnail}`}/>}
                                                </TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{moment(row.dateCreate).format('MM Do YYYY, h:mm:ss ')}</TableCell>
                                                <TableCell>{moment.unix(row.dateClose).format('MM Do YYYY, h:mm:ss ')}</TableCell>
                                                <TableCell>{row.price}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.status == AuctionStatusEnum.ACTIVE ? "Активний" : "Завершений"}
                                                        color={row.status == AuctionStatusEnum.ACTIVE ? "success" : "primary"}
                                                        variant="outlined"/>
                                                </TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="contained" aria-label="Basic button group">
                                                        <Button onClick={() => {
                                                            navigate(`/dashboard/auction/${row._id}/edit`)
                                                        }}>
                                                            <EditIcon/>
                                                        </Button>
                                                        <Button onClick={() => handleDelete(row)}><DeleteIcon/></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Stack>
                    </Hidden>
                    <Hidden smUp>
                        <Grid container spacing={2}>
                            {auctionList.map((row) => (
                                <Grid item xs={12} key={row._id}>
                                    <Card>
                                        {row.thumbnail && (
                                            <img style={{height: 100, width: '100%', objectFit: 'cover'}}
                                                 src={`${row.thumbnail}`}/>
                                        )}
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {row.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Дата Створення: {moment(row.dateCreate).format('MM Do YYYY, h:mm:ss ')}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Дата
                                                Закриття: {moment.unix(row.dateClose).format('MM Do YYYY, h:mm:ss ')}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Базова ціна: {row.price}
                                            </Typography>
                                            <Chip
                                                label={row.status === AuctionStatusEnum.ACTIVE ? "Активний" : "Завершений"}
                                                color={row.status === AuctionStatusEnum.ACTIVE ? "success" : "primary"}
                                                variant="outlined"
                                            />
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small"
                                                    onClick={() => navigate(`/dashboard/auction/${row._id}/edit`)}>
                                                <EditIcon/>
                                                Переглянути
                                            </Button>
                                            <Button size="small" onClick={() => handleDelete(row)}>
                                                <DeleteIcon/>
                                                Видалити
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default DashboardAuctionPage;
