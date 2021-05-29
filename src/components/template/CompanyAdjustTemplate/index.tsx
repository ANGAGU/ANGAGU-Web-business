import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button } from 'reactstrap';
import { Dummy, date2String, calculateFee } from 'utils';
import { Fade } from 'react-awesome-reveal';
import { CompanyFilter, MonthSelector, LineChart, DoughnutChart } from '../../molecules';
import { projuctProfitTitleList } from '../../../commons/constants/string';
import api from '../../../api';

import './style.css';

type AdjustPageProps = {
  isAdmin: boolean;
};
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
const CompanyAdjustTemplate: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  // const [adjustsDummy] = useState(Dummy.makeAdjusts(1) as Array<Adjust>);
  const [adjustList, setAdjustList] = useState([] as Array<Adjust>);
  const [productProfitList, setProductProfitList] = useState([] as Array<ProductProfit>);
  const [adjust, setAdjust] = useState({
    company_id: 0,
    create_time: '',
    fee: 0,
    id: 0,
    order_id: 0,
    price: 0,
    update_time: '',
  });

  // const [productProfitsDummy] = useState(Dummy.makeProductProfits(10) as Array<ProductProfit>);
  const [company, setCompany] = useState('회사' as string);
  const [toggle, setToggle] = useState(false as boolean);
  const [companyDate, setCompanyDate] = useState(new Date());
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [adjustGraph, setAdjustGraph] = useState({
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '월별 수익',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(97, 157, 160)',
        borderColor: 'rgba(97, 157, 160, 0.5)',
      },
    ],
  });
  // methods

  useEffect(() => {
    getAdjust();
    getAdjustProducts();
  }, []);

  useEffect(() => {
    calculateProfit();
  }, [productProfitList]);

  useEffect(() => {
    setTotalFee(calculateFee(totalProfit));
  }, [totalProfit]);

  useEffect(() => {
    drawAdjustGraph();
  }, [adjustList]);
  const getAdjust = async () => {
    // header 설정 여기서 각각 말고 한번에 하기

    const { status, data } = await api.get('/company/sale', {});
    if (status === 'success') {
      // eslint-disable-next-line eqeqeq
      setAdjustList(data);
    }
  };
  const getAdjustProducts = async () => {
    // header 설정 여기서 각각 말고 한번에 하기

    const { status, data } = await api.get('/company/sale/product', {
      month: `${date2String(companyDate)}-01`,
    });
    if (status === 'success') {
      setProductProfitList(data);
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

  const drawAdjustGraph = () => {
    const lineLabels = ['', '', '', '', '', ''];
    const lineData = [0, 0, 0, 0, 0, 0];
    let monthAgo = new Date();
    monthAgo = new Date(monthAgo.getFullYear(), monthAgo.getMonth(), 1);

    for (let i = 1; i <= 6; i += 1) {
      monthAgo = new Date(monthAgo.getFullYear(), monthAgo.getMonth() - 1, 1);
      lineLabels[6 - i] = date2String(monthAgo);
    }
    for (let i = 0; i < adjustList.length; i += 1) {
      const date = adjustList[i].date.substr(0, 7);
      const idx = lineLabels.findIndex(el => date === el);
      if (idx !== -1) lineData[idx] = adjustList[i].price;
    }
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
    setAdjustGraph(graphData);
  };

  const productProfitHeader = projuctProfitTitleList.map(ttl => <th className="column-title">{ttl}</th>);

  const productProfits = productProfitList.map(product => (
    <tr key={product.product_id}>
      <td>{product.product_id}</td>
      <td>{product.name}</td>
      <td>{Number(product.total_price) / product.total_count}원</td>
      <td>{product.total_count}</td>
      <td>{Number(product.total_price) - calculateFee(Number(product.total_price))}원</td>
    </tr>
  ));

  return (
    <Fade>
      <Container className="adjust-page">
        <h3>정산 관리</h3>
        <hr />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 2 }}>
            <LineChart data={adjustGraph} options={Dummy.chartOptions} />
          </div>
          <div style={{ flex: 1 }}>
            <DoughnutChart data={Dummy.doughnutChartData} />
          </div>
        </div>
        <hr />
        <div className="company-adjust">
          <div className="adjust-filter">
            <h5>기업 정산 검색</h5>
            <div className="filter-form">
              <div className="filter-form__content">
                <MonthSelector title="정산일자" selectDateFunc={setCompanyDate} />
              </div>
              <Button onClick={getAdjustProducts}>검색</Button>
            </div>
          </div>
          <div className="adjust-block">
            <div className="adjust-content">
              <div className="content__profit">
                <span className="company-name content-highlight">{company}</span>의
                <span className="adjust-month content-highlight">
                  {`${companyDate.getFullYear()}년 ${companyDate.getMonth() + 1}월`}
                </span>
                입금 금액은
                <span className="adjust-profit content-highlight">{totalProfit - totalFee}원</span>
                입니다.
              </div>
              <div className="content__profit-detail">
                총 매출 {totalProfit}원 - 수수료 {totalFee}원
              </div>
            </div>
            <Button
              className="content__toggle-btn"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              상세 상품 내역
            </Button>

            {toggle && (
              <Table size="sm" className="product-profit-table">
                <thead>
                  <tr>{productProfitHeader}</tr>
                </thead>

                <tbody>{productProfits}</tbody>
              </Table>
            )}
          </div>
        </div>
      </Container>
    </Fade>
  );
};

export default CompanyAdjustTemplate;
