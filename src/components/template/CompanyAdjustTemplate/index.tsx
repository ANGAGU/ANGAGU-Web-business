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
  const [adjustList, setAdjustList] = useState([] as Array<Adjust>);
  const [productProfitList, setProductProfitList] = useState([] as Array<ProductProfit>);
  const [company, setCompany] = useState('회사' as string);
  const [toggle, setToggle] = useState(false as boolean);
  const [companyDate, setCompanyDate] = useState(new Date());
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [lineGraph, setLineGraph] = useState(Dummy.chartData);
  const [doughnutGraph, setDoughnutGraph] = useState(Dummy.doughnutChartData);
  // methods

  useEffect(() => {
    getAdjust();
    getAdjustProducts();
  }, [companyDate]);

  // useEffect(() => {
  //   getAdjustProducts();
  // }, [companyDate]);

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
            <LineChart data={lineGraph} options={Dummy.chartOptions} />
          </div>
          <div style={{ flex: 1 }}>
            <DoughnutChart data={doughnutGraph} />
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
              상세 상품 수익내역
            </Button>
            {toggle && (
              <Table size="sm" className="profit-table">
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
