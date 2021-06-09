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
import { Fade } from 'react-awesome-reveal';
import { date2StringWithTime } from 'utils';
import api from 'api';
import { View3DModal } from '../../molecules';

interface Product {
  id: number;
  img: string;
  name: string;
  price: string;
  stock: number;
  rate: number;
  thumb_url: string;
  create_time: string;
  '3d_model_url': string;
  '3d_model_status': number;
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
    '3d모델상태',
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
    <Fade cascade damping={0.01}>
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
            {products.map(product => (
              <StyledTableRow key={product.id}>
                <StyledTableCell className="a-center">
                  <input type="checkbox" className="flat" name="table_records" />
                </StyledTableCell>
                <StyledTableCell>{product.id}</StyledTableCell>
                <StyledTableCell>
                  <img
                    className="product__img"
                    alt=""
                    src={`http://d3u3zwu9bmcdht.cloudfront.net/${product.thumb_url}`}
                  />
                </StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>{product.price}</StyledTableCell>
                <StyledTableCell>{product['3d_model_status']}</StyledTableCell>
                <StyledTableCell>{product.stock}</StyledTableCell>
                <StyledTableCell className="a-right a-right ">
                  {date2StringWithTime(product.create_time)}
                </StyledTableCell>
                <StyledTableCell className="last">
                  <Link to={`/Main/Product/${product.id}`}>
                    <Button color="secondary">수정하기</Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <View3DModal
                    productId={product.id}
                    purl={product['3d_model_url']}
                    status={product['3d_model_status']}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fade>
  );
};

export default CompanyProductTemplate;
