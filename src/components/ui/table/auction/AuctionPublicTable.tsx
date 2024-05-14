import React from "react";
import {
    Button,
    ButtonGroup,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Paper from '@mui/material/Paper';
import {BASE_URL} from "store/config";
import EditIcon from '@mui/icons-material/Visibility';
import {AuctionStatusEnum} from "types/enums/AuctionStatusEnum";
import moment from "moment";
import {Auction} from "models/Auction";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "hooks/app";

export interface AuctionPublicTableProps {
    auctionList: Auction[]
}

const AuctionPublicTable: React.FC<AuctionPublicTableProps> = (props) => {

    const {carTypeList, brandList} = useAppSelector(state => state.auction);

    const navigate = useNavigate();

    function getCarCaption(item: Auction) {

        const brand = brandList.find(_item => _item.id == item.brandId);

        let caption = "";
        if (brand) {

            caption = caption.concat(brand.name);
            const model = brand.modelList.find(_item => _item.id == item.modelId);

            if (model) {

                caption = caption.concat(" / ").concat(model.name);
            }
        }
        return caption;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Зображення</TableCell>
                        <TableCell>Назва</TableCell>
                        <TableCell>Виробник/Модель</TableCell>
                        <TableCell>Дата Закриття</TableCell>
                        <TableCell>Стартова ціна</TableCell>
                        <TableCell>Рік</TableCell>
                        <TableCell>Пробіг</TableCell>
                        <TableCell>Тип Авто</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell style={{width: "100px"}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.auctionList.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >

                            <TableCell>
                                {row.thumbnail &&
                                    <img style={{height: 100}} src={`${BASE_URL}/files/${row.thumbnail}`}/>
                                }
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{getCarCaption(row)}</TableCell>
                            <TableCell>{moment.unix(row.dateClose).format('MM Do YYYY, h:mm:ss ')}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{row.carMileage}</TableCell>
                            <TableCell>
                                {carTypeList.find(item => item.id == row.type)?.name}
                            </TableCell>
                            <TableCell>
                                <Chip label={
                                    row.status == AuctionStatusEnum.ACTIVE ? "Активний" : "Завершений"
                                } color={

                                    row.status == AuctionStatusEnum.ACTIVE ? "success" : "primary"

                                } variant="outlined"/>
                            </TableCell>

                            <TableCell>
                                <ButtonGroup variant="contained" aria-label="Basic button group">
                                    <Button onClick={() => {
                                        navigate(`/auction/${row._id}`)
                                    }}>
                                        <EditIcon/>
                                    </Button>

                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AuctionPublicTable;
