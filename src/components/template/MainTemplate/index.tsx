import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Container, Input, Button } from 'reactstrap';
import { Dummy, date2String, calculateFee, makeMoneyStr } from 'utils';
import { Fade } from 'react-awesome-reveal';
import { DoughnutChart, LineChart } from 'components/molecules';
import { CompanyAdjustForm } from 'components/organisms';
import { Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import api from '../../../api';

import './style.css';
import userImg from '../../../assets/images/user.png';

type Adjust = {
  company_id: number;
  create_time: string;
  date: string;
  fee: number;
  id: number;
  order_id: number;
  price: number;
  update_time: string;
};

type ProductProfit = {
  product_id: number;
  name: string;
  total_price: string; // revenue - commission
  total_count: number;
};

type Order = {
  delivery_number: number | null;
};

const MainTemplate: React.FC = () => {
  const history = useHistory();
  const [curDate, setCurDate] = useState(new Date());

  const [adjustList, setAdjustList] = useState([] as Array<Adjust>);
  const [productProfitList, setProductProfitList] = useState([] as Array<ProductProfit>);
  const [company, setCompany] = useState('회사' as string);
  const [companyEmail, setCompanyEmail] = useState('' as string);
  const [companyDate, setCompanyDate] = useState(new Date('1995-12-17T03:24:00'));
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [lineGraph, setLineGraph] = useState(Dummy.chartData);
  const [doughnutGraph, setDoughnutGraph] = useState(Dummy.doughnutChartData);

  const [countOrders, setCountOrders] = useState(0);

  useEffect(() => {
    getAdjust();
    getAdjustProducts();
    getCompanyOrder();
    getCompanyInfo();
  }, []);

  useEffect(() => {
    calculateProfit();
  }, [productProfitList]);

  useEffect(() => {
    setTotalFee(calculateFee(totalProfit));
    drawDoughnutGraph();
  }, [totalProfit]);

  useEffect(() => {
    drawLineGraph();
  }, [adjustList]);

  const getAdjust = async () => {
    const { status, data } = await api.get('/company/sale', {});
    if (status === 'success') {
      setAdjustList(data);
    }
  };
  const getAdjustProducts = async () => {
    const { status, data } = await api.get('/company/sale/product', {
      month: `${date2String(companyDate)}-01`,
    });
    if (status === 'success') {
      setProductProfitList(data);
    }
  };

  const getCompanyOrder = async () => {
    const { status, data } = await api.get('/company/order', {});
    if (status === 'success') {
      let cnt = 0;
      data.map((el: Order) => {
        if (el.delivery_number === null) cnt += 1;
        return 0;
      });
      setCountOrders(cnt);
    }
  };

  const getCompanyInfo = async () => {
    const { status, data } = await api.get('/company/info', {});
    if (status === 'success') {
      setCompany(data.name);
      setCompanyEmail(data.email);
    }
  };
  const calculateProfit = () => {
    let total = 0;
    productProfitList.map(product => {
      total += Number(product.total_price);
      return 0;
    });
    setTotalProfit(total);
  };

  const drawLineGraph = () => {
    const lineLabels = ['', '', '', '', '', ''];
    const lineData = [0, 0, 0, 0, 0, 0];
    let monthAgo = new Date();
    monthAgo = new Date(monthAgo.getFullYear(), monthAgo.getMonth(), 1);

    for (let i = 1; i <= 6; i += 1) {
      monthAgo = new Date(monthAgo.getFullYear(), monthAgo.getMonth() - 1, 1);
      lineLabels[6 - i] = date2String(monthAgo);
    }

    adjustList.map(ad => {
      const date = ad.date.substr(0, 7);
      const idx = lineLabels.findIndex(el => date === el);
      if (idx !== -1) lineData[idx] = ad.price;
      return 0;
    });
    const graphData = {
      labels: lineLabels,
      datasets: [
        {
          label: '월별 수익',
          data: lineData,
          fill: false,
          backgroundColor: 'rgb(97, 157, 160)',
          borderColor: 'rgba(97, 157, 160, 0.5)',
        },
      ],
    };
    setLineGraph(graphData);
  };

  const drawDoughnutGraph = () => {
    const doughnutLabels = [] as Array<string>;
    const doughnutData = [] as Array<number>;

    if (productProfitList.length === 0) {
      doughnutLabels.push('판매된 상품이 없습니다');
      doughnutData.push(100);
    }
    const isMany = productProfitList.length > 6;
    let total = 0;
    const tempList = productProfitList.sort((a, b) => Number(b.total_price) - Number(a.total_price));
    tempList.some((pro, idx) => {
      if (idx === 6) return true;
      if (idx === 5 && isMany) {
        doughnutData.push(100 - total);
        doughnutLabels.push('기타');
      }
      let price = 0;
      if (totalProfit !== 0) price = (Number(pro.total_price) / totalProfit) * 100;
      total += price;
      doughnutData.push(price);
      doughnutLabels.push(pro.name);

      return false;
    });
    const graphData = {
      labels: doughnutLabels,
      datasets: [
        {
          label: '상품 판매량',
          data: doughnutData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    setDoughnutGraph(graphData);
  };

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      height: '95%',
      borderRadius: '20px',
      padding: '20px 40px',
      marginRight: '20px',
      boxShadow: 'none',
      backgroundColor: '#f9f9f9',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();

  return (
    <Fade>
      <Container className="main-page">
        {/* <h3>환영합니다</h3> */}
        {/* <hr /> */}
        <div style={{ display: 'flex', padding: '10px 10px' }}>
          <div style={{ flex: 1 }}>
            <Card className={classes.root}>
              <CardContent>
                <img style={{ width: '50px', margin: '10px 0' }} alt="" src={userImg} />
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  안녕하세요.
                </Typography>
                <Typography variant="h5" component="h2">
                  <span style={{ marginLeft: '0px' }} className="company-name content-highlight">
                    {company}
                  </span>
                  님
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {companyEmail}
                </Typography>
                <Typography variant="body2" component="p">
                  등록된 상품 수: 4개
                  <br />총 주문건수: 39개
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    history.push('/Main/Info');
                  }}
                >
                  회원 정보 수정
                </Button>
              </CardActions>
            </Card>
          </div>
          <div style={{ flex: 2 }}>
            <div className="main-block">
              <div className="main-content">
                <div className="content__profit">
                  <span className="company-name content-highlight">{company}</span>의
                  <span className="adjust-month content-highlight"> 이번 달 </span>
                  입금 예정 금액은
                  <span className="adjust-profit content-highlight">
                    {' '}
                    {makeMoneyStr((totalProfit - totalFee).toString())}원
                  </span>
                  입니다.
                </div>
                <div className="content-detail">정산관리 페이지에서 더 자세히 알아보세요!</div>
              </div>
              <Button
                className="content-btn"
                onClick={() => {
                  history.push('/Main/Adjust');
                }}
              >
                정산관리 페이지 가기
              </Button>
            </div>
            <div className="main-block">
              <div className="main-content">
                <div className="content__profit">
                  <span className="company-name content-highlight">{company}</span>의
                  <span>&nbsp;&nbsp;&nbsp;현재 대기 중인 주문건수는</span>
                  <span className="adjust-profit content-highlight"> {countOrders}개</span>
                  입니다.
                </div>
                <div className="content-detail">상품 배송 후 송장번호를 입력해 주세요!</div>
              </div>
              <Button
                className="content-btn"
                onClick={() => {
                  history.push('/Main/ManageOrder');
                }}
              >
                주문관리 페이지 가기
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div style={{ display: 'flex', padding: '30px 10px 80px ' }}>
          <div style={{ flex: 2 }}>
            <h4
              style={{
                color: 'gray',
                borderLeft: 'solid 4px cadetblue',
                paddingLeft: '10px',
                marginBottom: '50px',
              }}
            >
              월별 수익 차트
            </h4>
            {/* <div style={{ width: '80px',  }} /> */}
            <LineChart data={lineGraph} options={Dummy.chartOptions} />
          </div>
          <div style={{ flex: 1 }}>
            <h4
              style={{
                color: 'gray',
                borderLeft: 'solid 4px cadetblue',
                paddingLeft: '10px',
                marginBottom: '50px',
              }}
            >
              상품별 수익 차트
            </h4>

            <DoughnutChart data={doughnutGraph} />
          </div>
        </div>
      </Container>
    </Fade>
  );
};

export default MainTemplate;
