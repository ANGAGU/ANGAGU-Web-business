import React, { useState, useEffect } from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Dummy } from '../../../utils';
import ManageRegister from './libs';
import { ModalMol } from '../../molecules';

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

const ManageProductTable = () => {
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
          {registers.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.company}</StyledTableCell>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>
                <img className={classes.img} alt="" src={row.img} />
              </StyledTableCell>
              <StyledTableCell>
                <ModalMol
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
export default ManageProductTable;
