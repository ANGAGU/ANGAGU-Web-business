/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const CompanyRefundTable = () => {
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
      refund_state: 0, // 0: 일반, 1: 요청, 2: 승인완료
      refund_text: '',
      review_id: null,
      customer_name: '',
      product_name: '',
      create_time: '',
      update_time: '',
    },
  ]);
  const [deliverNum, setDeliverNum] = useState('');
  const classes = useStyles();
  const getRefund = async () => {
    try {
      api.setAxiosDefaultHeader();
      const result = await api.get('/company/order', {});
      if (result.status === 'success') {
        console.log(result.data);
        setOrders(result.data);
      } else {
        console.error('환불 조회 실패');
      }
    } catch {
      console.error('환불 조회 실패');
    }
  };
  const updateRefund = async (id: number, number: any) => {
    try {
      api.setAxiosDefaultHeader();
      const result = await api.get(`/company/refund/${id}`, {});
      if (result.status === 'success') {
        console.log('환불 승인 성공');
        getRefund();
      } else {
        console.error('환불 승인 실패');
      }
    } catch {
      console.error('환불 승인 실패');
    }
  };
  useEffect(() => {
    getRefund();
  }, []);

  const tableHeader = (
    <TableHead>
      <TableRow>
        <StyledTableCell>주문 ID</StyledTableCell>
        <StyledTableCell>환불요청 고객</StyledTableCell>
        <StyledTableCell>상품명</StyledTableCell>
        <StyledTableCell>개수&nbsp;(개)</StyledTableCell>
        <StyledTableCell>가격&nbsp;(원)</StyledTableCell>
        <StyledTableCell>배송상태</StyledTableCell>
        <StyledTableCell>배송장번호</StyledTableCell>
        <StyledTableCell>환불사유</StyledTableCell>
        <StyledTableCell> </StyledTableCell>
      </TableRow>
    </TableHead>
  );
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        {tableHeader}
        <TableBody>
          {orders.map((row: any) => {
            if (row.refund_state === 0) return null;
            return (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.customer_name}</StyledTableCell>
                <StyledTableCell>
                  <Link
                    to={{
                      pathname: `/Main/Product/${row.product_id}`,
                    }}
                  >
                    {row.product_name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell>{row.count}</StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
                <StyledTableCell>{row.delivery_number === null ? '배송 전' : '배송 중'}</StyledTableCell>
                <StyledTableCell>{row.delivery_number}</StyledTableCell>
                <StyledTableCell>{row.refund_text}</StyledTableCell>
                <StyledTableCell>
                  {row.refund_state === 1 ? (
                    <Button
                      style={{ height: 32 }}
                      variant="outlined"
                      onClick={e => {
                        updateRefund(row.id, deliverNum);
                      }}
                    >
                      환불 승인
                    </Button>
                  ) : null}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CompanyRefundTable;
