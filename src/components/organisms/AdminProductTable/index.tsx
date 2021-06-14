import React, { useState, useEffect } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core';
import api from '../../../api';
import { Dummy } from '../../../utils';
import ManageRegister from './libs';
import { PureModal } from '../../molecules';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    img: {
      width: '105px',
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);
interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  stock: number;
  rate: number;
  thumb_url: string;
  create_time: string;
  '3d_model_url': string;
  '3d_model_status': string;
}
const AdminProductTable = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));
  const [products, setProducts] = useState([] as Array<Product>);

  const classes = useStyles();
  const getProducts = async () => {
    // 나중에 한번에 api.ts에서 통합하기
    api.setAxiosDefaultHeader();
    const result = await api.get('/admin/products', {});
  
    if (result.status === 'success') {
      setProducts(result.data);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  console.log(products);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>상품 ID</StyledTableCell>
            <StyledTableCell>기업 ID</StyledTableCell>
            <StyledTableCell>상품명</StyledTableCell>
            <StyledTableCell>상품이미지</StyledTableCell>
            <StyledTableCell>재고&nbsp;(개)</StyledTableCell>
            <StyledTableCell>가격&nbsp;(원)</StyledTableCell>
            <StyledTableCell>등록 시각</StyledTableCell>
            <StyledTableCell>3D 유무</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row: any, idx: any) => (
            <StyledTableRow key={idx}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.company_id}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>
                <img className={classes.img} alt="" src={`http://d3u3zwu9bmcdht.cloudfront.net/${row.thumb_url}`} />
              </StyledTableCell>
              <StyledTableCell>{row.stock}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.update_time}</StyledTableCell>
              <StyledTableCell>{row['3d_model_status'] === null ? '등록필요' : '등록완료'}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdminProductTable;
