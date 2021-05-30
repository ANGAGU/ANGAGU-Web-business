import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button } from 'reactstrap';
import { Dummy, date2String, calculateFee } from 'utils';
import { Fade } from 'react-awesome-reveal';
import { CompanyFilter, MonthSelector, LineChart, DoughnutChart } from '../../molecules';
import { companyProfitTitleList } from '../../../commons/constants/string';

import './style.css';
import api from '../../../api';

type AdjustPageProps = {
  isAdmin: boolean;
};
type AdminAdjust = {
  date: string;
  total_price: string;
};
type CompanyProfit = {
  company_id: number;
  name: string;
  total_price: string; // revenue - commission
};

const AdminAdjustTemplate: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  const [adjustList, setAdjustList] = useState([] as Array<AdminAdjust>);
  const [companyProfitList, setCompanyProfitList] = useState([] as Array<CompanyProfit>);
  // const [company, setCompany] = useState('회사' as string);
  const [toggle, setToggle] = useState(false as boolean);
  const [adminDate, setAdminDate] = useState(new Date());
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [lineGraph, setLineGraph] = useState(Dummy.chartData);
  const [doughnutGraph, setDoughnutGraph] = useState(Dummy.doughnutChartData);

  // methods

  useEffect(() => {
    getAdjust();
    getAdjustCompanies();
  }, [adminDate]);

  useEffect(() => {
    drawLineGraph();
  }, [adjustList]);

  useEffect(() => {
    calculateProfit();
  }, [companyProfitList]);

  useEffect(() => {
    setTotalFee(calculateFee(totalProfit));
    drawDoughnutGraph();
  }, [totalProfit]);

  const calculateProfit = () => {
    let total = 0;
    companyProfitList.map(co => {
      total += Number(co.total_price);
      return 0;
    });
    setTotalProfit(total);
  };

  const getAdjust = async () => {
    // ?? api 응답 형식 달라짐???
    const { status, data } = await api.get('/admin/sale', {});

    if (data.status === 'success') {
      setAdjustList(data.data);
    }
  };

  const getAdjustCompanies = async () => {
    const { status, data } = await api.get('/admin/sale/company', {
      month: `${date2String(adminDate)}-01`,
    });

    if (data.status === 'success') {
      setCompanyProfitList(data.data);
    }
  };

  // api 확인 후 shared로 옮기기
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
      if (idx !== -1) lineData[idx] = Number(ad.total_price);
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

    if (companyProfitList.length === 0) {
      doughnutLabels.push('조회된 기업이 없습니다');
      doughnutData.push(100);
    }
    const isMany = companyProfitList.length > 6;
    let total = 0;
    const tempList = companyProfitList.sort((a, b) => Number(b.total_price) - Number(a.total_price));
    tempList.some((co, idx) => {
      if (idx === 6) return true;
      if (idx === 5 && isMany) {
        doughnutData.push(100 - total);
        doughnutLabels.push('기타');
      }
      let price = 0;
      if (totalProfit !== 0) price = (Number(co.total_price) / totalProfit) * 100;
      total += price;
      doughnutData.push(price);
      doughnutLabels.push(co.name);

      return false;
    });
    const graphData = {
      labels: doughnutLabels,
      datasets: [
        {
          label: '기업 수익량',
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

  const companyProfitHeader = companyProfitTitleList.map(ttl => <th className="column-title">{ttl}</th>);
  const companyProfits = companyProfitList.map(co => (
    <tr key={co.company_id}>
      <td>{co.company_id}</td>
      <td>{co.name}</td>
      <td>{Number(co.total_price)}원</td>
      <td>{Number(calculateFee(Number(co.total_price)))}원</td>
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
        <div className="admin-adjust">
          <div className="adjust-filter">
            <h5>Scanit 정산 검색</h5>
            <div className="filter-form">
              <MonthSelector title="정산일자" selectDateFunc={setAdminDate} />
            </div>
          </div>
          <div className="adjust-block">
            <div className="adjust-content">
              <div className="content__profit">
                <span className="company-name content-highlight">Scanit</span>의
                <span className="adjust-month content-highlight">
                  {`${adminDate.getFullYear()}년 ${adminDate.getMonth() + 1}월`}
                </span>
                수익 수수료는
                <span className="adjust-profit content-highlight">{totalFee}원</span>
                입니다.
              </div>
              <div className="content__profit-detail">
                총 매출 {totalProfit}원 - 기업 수익 {totalProfit - totalFee}원
              </div>
              <Button
                style={{ float: 'right', marginBottom: '20px' }}
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                상세 기업 수익내역
              </Button>
              {toggle && (
                <Table size="sm" className="profit-table">
                  <thead>
                    <tr>{companyProfitHeader}</tr>
                  </thead>
                  <tbody>{companyProfits}</tbody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Fade>
  );
};

export default AdminAdjustTemplate;
