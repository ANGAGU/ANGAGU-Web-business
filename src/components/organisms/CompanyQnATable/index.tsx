/* eslint-disable @typescript-eslint/ban-types */
import { useState, useEffect, useRef } from 'react';
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

const CompanyQnATable = () => {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      product_id: 0,
      company_id: 0,
      customer_id: 0,
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
        setQuestions(result.data);
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
            <StyledTableCell>문의 ID</StyledTableCell>
            <StyledTableCell>문의고객</StyledTableCell>
            <StyledTableCell>상품명</StyledTableCell>
            <StyledTableCell>제목</StyledTableCell>
            <StyledTableCell>문의상태</StyledTableCell>
            <StyledTableCell>문의시각</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.customer_name}</StyledTableCell>
              <StyledTableCell>
                <Link to={`/Main/Product/${row.product_id}`}>{row.product_name}</Link>
              </StyledTableCell>
              <StyledTableCell>문의 제목이 들어갈거에여</StyledTableCell>
              <StyledTableCell>{row.delivery_number === null ? '답변 전' : '답변 완료'}</StyledTableCell>
              <StyledTableCell>{row.create_time.substr(0, 10)}</StyledTableCell>
              <StyledTableCell>
                <Link to={`/Main/QnA/${row.id}`}>
                  <Button style={{ height: 32 }} variant="outlined">
                    답변하기
                  </Button>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default CompanyQnATable;
