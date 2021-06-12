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

const AdminProductTable = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));
  const [registers, setRegisters]: any = useState([]);
  const classes = useStyles();

  useEffect(() => {
    // setRegisters(ManageRegister.getRegisterProduct());
    setRegisters(Dummy.makeRegister(10));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>상품 ID</StyledTableCell>
            <StyledTableCell>기업 ID</StyledTableCell>
            <StyledTableCell>상품명</StyledTableCell>
            <StyledTableCell>상품이미지</StyledTableCell>
            <StyledTableCell>3D모델확인</StyledTableCell>
            <StyledTableCell>재고&nbsp;(개)</StyledTableCell>
            <StyledTableCell>가격&nbsp;(원)</StyledTableCell>
            <StyledTableCell>등록 시각</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registers.map((row: any, idx: any) => (
            <StyledTableRow key={idx}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.company}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>
                <img className={classes.img} alt="" src={row.img} />
              </StyledTableCell>
              <StyledTableCell>
                <PureModal
                  title={'3D모델 확인'}
                  buttonLabel={'3D 모델 확인'}
                  className={'3dModelUrl'}
                  name={row.url_3d}
                />
              </StyledTableCell>
              <StyledTableCell>{row.count}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
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
export default AdminProductTable;
