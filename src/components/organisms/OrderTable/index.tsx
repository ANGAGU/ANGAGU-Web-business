import React, { useState, useEffect } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Dummy } from '../../../utils';
import api from '../../../api';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  img: {
    width: '105px',
  },
});

const OrderTable = () => {
  const [orders, setOrders] = useState(Dummy.makeOrder(10));
  const classes = useStyles();
  // const getOrder = async () => {
  //   const key = localStorage.getItem('token');
  //   try {
  //     const result = await api.get('/company/orders', { key: key });
  //     if (result.status === 'success') {
  //       setOrders(result.data);
  //     } else {
  //       console.error('주문 조회 실패');
  //     }
  //   } catch {
  //     console.error('주문 조회 실패');
  //   }
  // };

  // useEffect(() => {
  //   getOrder();
  // }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>주문 ID</StyledTableCell>
            <StyledTableCell>주문고객</StyledTableCell>
            <StyledTableCell>상품명</StyledTableCell>
            <StyledTableCell>상품이미지</StyledTableCell>
            <StyledTableCell>개수&nbsp;(개)</StyledTableCell>
            <StyledTableCell>가격&nbsp;(원)</StyledTableCell>
            <StyledTableCell>배송상태</StyledTableCell>
            <StyledTableCell>배송장번호</StyledTableCell>
            <StyledTableCell>결제 시각</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.customerId}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>
                <img className={classes.img} alt="" src={row.img} />
              </StyledTableCell>
              <StyledTableCell>{row.count}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.deliveryStatus}</StyledTableCell>
              <StyledTableCell>{row.deliveryNumber}</StyledTableCell>
              <StyledTableCell>{row.confirmTime}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default OrderTable;
