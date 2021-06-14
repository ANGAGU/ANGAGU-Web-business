/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { date2StringWithTime } from 'utils';
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
  Breadcrumbs,
} from '@material-ui/core';
import { Fade } from 'react-awesome-reveal';
import { NumericLiteral } from 'typescript';
import api from '../../../api';
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
  '3d_model_status': string;
  sell_count: number;
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
    '모델상태',
    '재고',
    '판매량',
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
    }
  };
  const getStatus = (num: any) => {
    if (num === 0) {
      return '등록 대기중';
    } else if (num === 1) {
      return '등록 중';
    } else if (num === 2) {
      return '등록 완료';
    } else if (num === 3) {
      return '등록 실패';
    } else {
      return '등록된 모델 없음';
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
                <StyledTableCell>{getStatus(product['3d_model_status'])}</StyledTableCell>
                <StyledTableCell>{product.stock}</StyledTableCell>
                <StyledTableCell>{product.sell_count}</StyledTableCell>
                <StyledTableCell className="a-right a-right ">
                  {date2StringWithTime(product.create_time)}
                </StyledTableCell>
                <StyledTableCell className="last">
                  <Link to={`/Main/Product/${product.id}`}>
                    <Button color="secondary">수정하기</Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <View3DModal pid={product.id} purl={product['3d_model_url']} />
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
