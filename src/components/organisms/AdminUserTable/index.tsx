/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect, useRef } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Button,
} from '@material-ui/core';
import { Dummy } from '../../../utils';
import './style.css';
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
        height: '64px',
      },
      '&:nth-of-type(even)': {
        height: '64px',
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

const AdminUserTable = () => {
  const [orders, setOrders] = useState([
    {
      id: 0,
      product_id: 0,
      company_id: 0,
      customer_id: 0,
      import_1: '',
      import_2: '',
      count: 0,
      price: 0,
      address_id: 0,
      delivery_number: null,
      review_id: null,
      customer_name: '',
      product_name: '',
      create_time: '',
      update_time: '',
    },
  ]);
  const [deliverNum, setDeliverNum] = useState('');
  const classes = useStyles();
  const getOrder = async () => {
    try {
      api.setAxiosDefaultHeader();
      const result = await api.get('/company/order', {});
      if (result.status === 'success') {
        console.log(result.data);
        setOrders(result.data);
      } else {
        console.error('주문 조회 실패');
      }
    } catch {
      console.error('주문 조회 실패');
    }
  };
  const updateOrder = async (id: number, number: any) => {
    try {
      api.setAxiosDefaultHeader();
      const result = await api.put('/company/order', {
        deliveryNumber: number,
        orderId: id,
      });
      if (result.status === 'success') {
        console.log('주문 수정 성공');
        getOrder();
      } else {
        console.error('주문 수정 실패');
      }
    } catch {
      console.error('주문 수정 실패');
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>주문 ID</StyledTableCell>
            <StyledTableCell>주문고객</StyledTableCell>
            <StyledTableCell>상품명</StyledTableCell>
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
              <StyledTableCell>{row.customer_name}</StyledTableCell>
              <StyledTableCell>
                <a href={`http://localhost:3000/Main/Product/${row.product_id}`}>{row.product_name}</a>
              </StyledTableCell>
              <StyledTableCell>{row.count}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
              <StyledTableCell>{row.delivery_number === null ? '배송 전' : '배송 완료'}</StyledTableCell>
              <StyledTableCell>
                {row.delivery_number ? (
                  <a
                    href={`https://www.ilogen.com/web/personal/trace/${row.delivery_number}123451`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {row.delivery_number}
                  </a>
                ) : (
                  <>
                    <TextField
                      style={{ height: 32 }}
                      inputProps={{ style: { height: 32, padding: '0 14px' } }}
                      InputLabelProps={{ style: { height: 32 } }}
                      id="outlined-basic"
                      variant="outlined"
                      onChange={(event: any) => {
                        setDeliverNum(event.target.value);
                      }}
                    />
                    <Button
                      style={{ height: 32 }}
                      variant="outlined"
                      onClick={e => {
                        updateOrder(row.id, deliverNum);
                      }}
                    >
                      등록
                    </Button>
                  </>
                )}
              </StyledTableCell>
              <StyledTableCell>{row.create_time.substr(0, 10)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdminUserTable;
