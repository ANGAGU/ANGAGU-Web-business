import React, { useState, useEffect } from 'react';
import { Table, Container, Input, Button } from 'reactstrap';
import { Dummy } from 'utils';
import { Fade } from 'react-awesome-reveal';
import { CompanyFilter, MonthSelector, LineChart } from '../../molecules';
import { adjustTitleList, projuctProfitTitleList, monthList } from '../../../commons/constants/string';

import './style.css';
import api from '../../../api';

type AdjustPageProps = {
  isAdmin: boolean;
};
type Adjust = {
  company_id: number;
  create_time: string;
  fee: number;
  id: number;
  order_id: number;
  price: number;
  update_time: string;
};

type ProductProfit = {
  id: number;
  name: string;
  price: string;
  commission: string;
  revenue: string;
  profit: string; // revenue - commission
  sellCount: number;
};
const AdminAdjustTemplate: React.FC<AdjustPageProps> = ({ isAdmin }) => {
  // const [adjustsDummy] = useState(Dummy.makeAdjusts(1) as Array<Adjust>);
  const [adjustList, setAdjustList] = useState([] as Array<Adjust>);
  const [adjust, setAdjust] = useState({
    company_id: 0,
    create_time: '',
    fee: 0,
    id: 0,
    order_id: 0,
    price: 0,
    update_time: '',
  });
  const [productProfitsDummy] = useState(Dummy.makeProductProfits(10) as Array<ProductProfit>);
  const [company, setCompany] = useState('회사' as string);
  const [toggle, setToggle] = useState(false as boolean);
  const [searchMonth, setSearchMonth] = useState('1월' as string);
  const [adminDate, setAdminDate] = useState(new Date());
  const [companyDate, setCompanyDate] = useState(new Date());

  // methods

  useEffect(() => {
    requestAdjust();
  }, []);
  const requestAdjust = async () => {
    // header 설정 여기서 각각 말고 한번에 하기
    api.setAxiosDefaultHeader();
    const { status, data } = await api.get('/admin/sale', {
      from: new Date('2021-04-17T03:24:00'),
      to: new Date(),
    });
    if (status === 'success') {
      // setAdjustList(result.data);

      // eslint-disable-next-line eqeqeq
      if (data == []) setAdjust(data[0]);
    }
  };

  const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target as HTMLInputElement;
    setSearchMonth(value);
  };

  return (
    <Fade>
      <Container className="adjust-page">
        <h3>정산 관리</h3>
        <hr />
        <div>
          <div style={{ flex: 2 }}>
            <LineChart data={Dummy.chartData} options={Dummy.chartOptions} />
          </div>
          <div style={{ flex: 1 }}>
            <span>test</span>
          </div>
        </div>
        <div className="admin-adjust">
          <div className="adjust-filter">
            <h5>Scanit 정산 검색</h5>
            <div className="filter-form">
              <MonthSelector title="정산일자" selectDateFunc={setAdminDate} />
              <Button>검색</Button>
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
                <span className="adjust-profit content-highlight">200000원</span>
                입니다.
              </div>
              <div className="content__profit-detail">
                총 매출 {`250000원`} - 수수료 {`50000원`}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fade>
  );
};

export default AdminAdjustTemplate;
