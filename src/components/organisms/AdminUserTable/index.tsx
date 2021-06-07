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
import { Dummy } from 'utils';
import './style.css';
import { notify } from 'App';
import api from 'api';
import ManageRegister from './libs';

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
  const [registers, setRegisters]: any = useState([]);

  useEffect(() => {
    setRegisters(Dummy.makeRegister(10));
  }, []);

  const getUsers = async () => {
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
  const approveUser = async (id: number, number: any) => {
    api.setAxiosDefaultHeader();
    const result = await api.put('/company/order', {
      deliveryNumber: number,
      orderId: id,
    });
    if (result.status === 'success') {
      console.log('기업회원 승인 성공');
      getUsers();
    } else {
      console.error('기업회원 승인 실패');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>회원 ID</StyledTableCell>
            <StyledTableCell>회원명</StyledTableCell>
            <StyledTableCell>사업자등록번호</StyledTableCell>
            <StyledTableCell>승인상태</StyledTableCell>
            <StyledTableCell>요청시각</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registers.map((row: any, idx: any) => (
            <StyledTableRow key={idx}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.company}</StyledTableCell>
              <StyledTableCell>{row.count}</StyledTableCell>
              <StyledTableCell>완료</StyledTableCell>

              <StyledTableCell>{row.confirmTime}</StyledTableCell>
              <StyledTableCell>
                <div className={classes.root}>
                  <Button
                    variant="outlined"
                    onClick={e => {
                      ManageRegister.registerProduct(row.id);
                    }}
                  >
                    승인
                  </Button>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminUserTable;
