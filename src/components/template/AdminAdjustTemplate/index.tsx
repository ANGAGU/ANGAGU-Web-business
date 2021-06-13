import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button } from 'reactstrap';
import { Dummy, date2String, calculateFee, drawLineGraph, drawDoughnutGraph, makeMoneyStr } from 'utils';
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
    setLineGraph(drawLineGraph(adjustList, true));
  }, [adjustList]);

  useEffect(() => {
    calculateProfit();
  }, [companyProfitList]);

  useEffect(() => {
    setTotalFee(calculateFee(totalProfit));
    setDoughnutGraph(drawDoughnutGraph(companyProfitList, totalProfit, true));
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
                <span className="adjust-profit content-highlight">{makeMoneyStr(totalFee.toString())}원</span>
                입니다.
              </div>
              <div className="content__profit-detail">
                총 매출 {makeMoneyStr(totalProfit.toString())}원 - 기업 수익{' '}
                {makeMoneyStr((totalProfit - totalFee).toString())}원
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
