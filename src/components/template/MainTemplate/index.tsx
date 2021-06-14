import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Container, Input, Button } from 'reactstrap';
import { Dummy, date2String, calculateFee, makeMoneyStr, drawDoughnutGraph, drawLineGraph } from 'utils';
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
  total_price: string;
};

type ProductProfit = {
  product_id: number;
  name: string;
  total_price: string; // revenue - commission
  total_count: number;
};

type CompanyProfit = {
  company_id: number;
  name: string;
  total_price: string; // revenue - commission
};

type Order = {
  delivery_number: number | null;
};

const MainTemplate: React.FC = () => {
  const history = useHistory();
  const [curDate, setCurDate] = useState(new Date());

  const [adjustList, setAdjustList] = useState([] as Array<Adjust>);
  const [companyProfitList, setCompanyProfitList] = useState([] as Array<CompanyProfit>);
  const [productProfitList, setProductProfitList] = useState([] as Array<ProductProfit>);
  const [company, setCompany] = useState('회사' as string);
  const [totalProductCount, setTotalProductCount] = useState(0 as number);
  const [totalOrderCount, setTotalOrderCount] = useState(0 as number);

  const [companyCount, setCompanyCount] = useState(0 as number);
  const [approveCount, setApproveCount] = useState(0 as number);
  const [companyEmail, setCompanyEmail] = useState('' as string);
  const [companyDate, setCompanyDate] = useState(new Date());
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [lineGraph, setLineGraph] = useState(Dummy.chartData);
  const [doughnutGraph, setDoughnutGraph] = useState(Dummy.doughnutChartData);
  const [isAdmin, setIsAdmin] = useState(null as boolean | null);
  const [countOrders, setCountOrders] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') === '') {
      setIsAdmin(false);
      getAdjust();
      getAdjustProducts();
      getCompanyOrder();
      getCompanyInfo();
      getProducts();
    } else {
      setIsAdmin(true);
      getAdminAdjust();
      getAdjustCompanies();
      getCompanies();
    }
  }, []);

  useEffect(() => {
    calculateProfit();
  }, [productProfitList]);

  useEffect(() => {
    calculateAdminProfit();
  }, [companyProfitList]);

  useEffect(() => {
    setTotalFee(calculateFee(totalProfit));
    setDoughnutGraph(
      drawDoughnutGraph(isAdmin ? companyProfitList : productProfitList, totalProfit, isAdmin),
    );
  }, [totalProfit]);

  useEffect(() => {
    setLineGraph(drawLineGraph(adjustList, isAdmin));
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

  const getProducts = async () => {
    api.setAxiosDefaultHeader();
    const { status, data } = await api.get('/company/products', {});
    if (status === 'success') {
      setTotalProductCount(data.length);
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
      setTotalOrderCount(data.length);
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

  const getCompanies = async () => {
    const { status, data } = await api.get('/admin/companies', {});
    if (status === 'success') {
      let cnt = 0;
      setCompanyCount(data.companies.length);
      data.companies.map((el: any) => {
        if (el.is_approve === 0) cnt = +1;
        return '';
      });
      setApproveCount(cnt);
    } else {
      console.log('기업 정보 호출 실패');
    }
  };
  const calculateAdminProfit = () => {
    let total = 0;
    companyProfitList.map(co => {
      total += Number(co.total_price);
      return 0;
    });
    setTotalProfit(total);
  };

  const getAdminAdjust = async () => {
    // ?? api 응답 형식 달라짐???
    const { status, data } = await api.get('/admin/sale', {});

    if (data.status === 'success') {
      setAdjustList(data.data);
    }
  };

  const getAdjustCompanies = async () => {
    const { status, data } = await api.get('/admin/sale/company', {
      month: `${date2String(companyDate)}-01`,
    });

    if (data.status === 'success') {
      setCompanyProfitList(data.data);
    }
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
                    {isAdmin ? 'Scanit' : company}
                  </span>
                  님
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {companyEmail}
                </Typography>
                {isAdmin ? (
                  <Typography variant="body2" component="p">
                    가입한 기업 수: {companyCount}
                  </Typography>
                ) : (
                  <Typography variant="body2" component="p">
                    등록된 상품 수: {totalProductCount}개
                    <br />총 주문건수: {totalOrderCount}개
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    if (!isAdmin) history.push('/Main/Info');
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
                {isAdmin ? (
                  <div className="content__profit">
                    <span className="company-name content-highlight">Scanit</span>의
                    <span className="adjust-month content-highlight"> 이번 달 </span>
                    수익 예정 수수료는
                    <span className="adjust-profit content-highlight">
                      {makeMoneyStr(totalFee.toString())}원
                    </span>
                    입니다.
                  </div>
                ) : (
                  <div className="content__profit">
                    <span className="company-name content-highlight">{company}</span>의
                    <span className="adjust-month content-highlight"> 이번 달 </span>
                    입금 예정 금액은
                    <span className="adjust-profit content-highlight">
                      {makeMoneyStr((totalProfit - totalFee).toString())}원
                    </span>
                    입니다.
                  </div>
                )}
                <div className="content-detail">정산관리 페이지에서 더 자세히 알아보세요!</div>
              </div>
              <Button
                className="content-btn"
                onClick={() => {
                  if (isAdmin) history.push('/Main/ManageAdjust');
                  else history.push('/Main/Adjust');
                }}
              >
                정산관리 페이지 가기
              </Button>
            </div>
            {isAdmin ? (
              <div className="main-block">
                <div className="main-content">
                  <div className="content__profit">
                    <span className="company-name content-highlight">Scanit</span>의
                    <span>&nbsp;&nbsp;&nbsp;현재 대기 중인 회원 승인 건수는</span>
                    <span className="adjust-profit content-highlight"> {approveCount}개</span>
                    입니다.
                  </div>
                  <div className="content-detail">회원관리 페이지에서 자세한 사항을 확인해주세요!</div>
                </div>
                <Button
                  className="content-btn"
                  onClick={() => {
                    history.push('/Main/ManageUser');
                  }}
                >
                  회원관리 페이지 가기
                </Button>
              </div>
            ) : (
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
            )}
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
