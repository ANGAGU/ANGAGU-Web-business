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
import { CheckBox } from '@material-ui/icons';
import { Dummy, date2StringWithTime } from 'utils';
import './style.css';
import { notify } from 'App';
import api from 'api';

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

const StyledButton = withStyles({
  root: {
    color: 'white',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

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
    icon: {
      marginLeft: '6px',
    },
    approveFilter: {
      marginLeft: '6px',
      color: 'rgba(255, 255, 255, 0.3)',
    },
  }),
);
const AdminUserTable = () => {
  const [users, setUsers] = useState([
    {
      id: 0,
      product_id: 0,
      company_id: 0,
      customer_id: 0,
      is_approve: 0,
      count: 0,
      price: 0,
      address_id: 0,
      business_number: '',
      review_id: null,
      name: '',
      email: '',
      create_time: '',
      update_time: '',
    },
  ]);

  const [approveFilter, setApproveFilter] = useState(false);
  const classes = useStyles();
  const [registers, setRegisters]: any = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await api.get('/admin/companies', {});
    if (result.status === 'success') {
      console.log(result.data);
      setUsers(result.data.companies);
    } else {
      console.error('?????? ?????? ??????');
    }
  };
  const approveUser = async (id: number) => {
    const result = await api.post(`/admin/company/approve/${id}`, {});
    if (result.status === 'success') {
      console.log('???????????? ?????? ??????');
      getUsers();
    } else {
      console.error('???????????? ?????? ??????');
    }
  };

  const filterList = (isFilter = false) => {
    return users.filter(user => (!user.is_approve && user.business_number) || !isFilter);
  };

  const userList = () => {
    return filterList(approveFilter).map((row: any, idx: any) => (
      <StyledTableRow key={idx}>
        <StyledTableCell>{row.id}</StyledTableCell>
        <StyledTableCell>{row.name}</StyledTableCell>
        <StyledTableCell>{row.email}</StyledTableCell>
        <StyledTableCell>{row.business_number}</StyledTableCell>
        <StyledTableCell>{row.is_approve ? '??????' : '?????????'}</StyledTableCell>
        <StyledTableCell>{date2StringWithTime(row.create_time)}</StyledTableCell>
        <StyledTableCell>
          <div className={classes.root}>
            <Button
              variant="outlined"
              disabled={row.business_number === null || row.is_approve}
              onClick={e => {
                approveUser(row.id);
              }}
            >
              {filterApproveButton(row.is_approve, row.business_number)}
            </Button>
          </div>
        </StyledTableCell>
      </StyledTableRow>
    ));
  };

  const filterApproveButton = (isApprove: number, businessNum: string): string => {
    if (businessNum === null) return '??????????????? ??????';
    if (isApprove) return '????????????';
    return '??????';
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>?????? ID</StyledTableCell>
            <StyledTableCell>?????????</StyledTableCell>
            <StyledTableCell>email</StyledTableCell>
            <StyledTableCell>?????????????????????</StyledTableCell>
            <StyledTableCell>
              <StyledButton
                onClick={() => {
                  setApproveFilter(!approveFilter);
                }}
              >
                ????????????
                <CheckBox className={approveFilter ? classes.icon : classes.approveFilter} />
              </StyledButton>
            </StyledTableCell>
            <StyledTableCell>????????????</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{userList()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminUserTable;
