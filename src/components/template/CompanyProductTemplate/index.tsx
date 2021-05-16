import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { Model3DForm } from '../../organisms';

// import './style.css';

// 임시
import testImg from '../../../assets/product_test.jpeg';

interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  stock: number;
  rate: number;
  create_time: string;
  '3d_model_url': string;
}
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
const CompanyProductTemplate: React.FC = () => {
  const productsTitleList = [
    '',
    '상품 아이디',
    '이미지',
    '상품명',
    '판매가',
    '별점',
    '재고',
    '등록일자',
    '',
    '3D',
  ];
  // set state
  const classes = useStyles();
  const [products, setProducts] = useState([] as Array<Product>);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    // 나중에 한번에 api.ts에서 통합하기
    api.setAxiosDefaultHeader();
    const result = await api.get('/company/products', {});
    if (result.status === 'success') {
      setProducts(result.data);
    } else {
      console.log('ERROR: in customer products');
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {productsTitleList.map((row, idx) => (
                <StyledTableCell key={`product_title ${idx}`}>{row}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <StyledTableRow
                key={`product_body ${index}`}
                className={index % 2 === 0 ? 'even pointer' : 'odd pointer'}
              >
                <StyledTableCell className="a-center">
                  <input type="checkbox" className="flat" name="table_records" />
                </StyledTableCell>
                <StyledTableCell className=" ">{product.id}</StyledTableCell>
                <StyledTableCell className=" ">
                  <img className="product__img" alt="" src={testImg} />
                </StyledTableCell>
                <StyledTableCell className=" ">
                  {product.name} <i className="success fa fa-long-arrow-up" />
                </StyledTableCell>
                <StyledTableCell className=" ">{product.price}</StyledTableCell>
                <StyledTableCell className=" ">{5.0}</StyledTableCell>
                <StyledTableCell className=" ">{product.stock}</StyledTableCell>
                <StyledTableCell className="a-right a-right ">{product.create_time}</StyledTableCell>
                <StyledTableCell className="last">
                  <Link to="/Main/Product/1">
                    <Button color="secondary">수정하기</Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <Model3DForm pid={product.id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CompanyProductTemplate;
