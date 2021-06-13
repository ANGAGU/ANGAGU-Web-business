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
import { QuestionAnswer } from '@material-ui/icons';
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

const StyledButton = withStyles({
  root: {
    color: 'white',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  img: {
    width: '105px',
  },
  icon: {
    marginLeft: '6px',
  },
  answerFilter: {
    marginLeft: '6px',
    color: 'rgba(255, 255, 255, 0.3)',
  },
});

const CompanyQnATable = () => {
  const [questions, setQuestions] = useState([
    {
      id: 0,
      answer: '',
      answer_time: '',
      title: '',
      content: '',
      product_id: 0,
      customer_id: 0,
      customer_name: '',
      product_name: '',
      create_time: '',
      update_time: '',
    },
  ]);
  const [answerFilter, setAnswerFilter] = useState(false);
  const classes = useStyles();

  const getQuestions = async () => {
    api.setAxiosDefaultHeader();
    const result = await api.get('/company/board', {});
    if (result.status === 'success') {
      console.log(result.data);
      setQuestions(result.data);
    } else {
      console.error('주문 조회 실패');
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const filterList = (isFilter = false) => {
    return questions.filter(question => question.answer === null || question.answer === '' || !isFilter);
  };
  const questionList = () => {
    return filterList(answerFilter).map((row: any) => (
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
        <StyledTableCell>{row.title}</StyledTableCell>
        <StyledTableCell>
          {row.answer === null || row.answer === '' ? '답변 전' : '답변 완료'}
        </StyledTableCell>
        <StyledTableCell>{row.create_time.substr(0, 10)}</StyledTableCell>
        <StyledTableCell>
          <Link to={{ pathname: `/Main/QnA/${row.id}`, state: { que: row } }}>
            <Button style={{ height: 32 }} variant="outlined">
              답변하기
            </Button>
          </Link>
        </StyledTableCell>
      </StyledTableRow>
    ));
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>문의 ID</StyledTableCell>
            <StyledTableCell>문의고객</StyledTableCell>
            <StyledTableCell>상품명</StyledTableCell>
            <StyledTableCell>제목</StyledTableCell>
            <StyledTableCell>
              <StyledButton
                onClick={() => {
                  setAnswerFilter(!answerFilter);
                }}
              >
                문의상태
                <QuestionAnswer className={answerFilter ? classes.icon : classes.answerFilter} />
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell>문의시각</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>{questionList()}</TableBody>
      </Table>
    </TableContainer>
  );
};
export default CompanyQnATable;
