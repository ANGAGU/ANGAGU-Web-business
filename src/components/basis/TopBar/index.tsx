import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarToggler, Collapse, Nav } from 'reactstrap';
import { useRouteMatch, useHistory } from 'react-router-dom';
import TopBarLibs from './libs';
import { NavBarStyle, ButtonStyle, ButtonMargin } from './style';
import api from '../../../api';

type TopBarProps = {
  toggleSidebar: VoidFunction;
};

const TopBar = ({ toggleSidebar }: TopBarProps) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  const history = useHistory();
  const { path } = useRouteMatch();
  const [data, setData] = useState({
    name: 'test',
    phoneNumber: '010-0000-0000',
    email: 'test@test.com',
    password: 'test',
    businessNumber: '1302938741-1231323312',
    accountNumber: '1234-0000-123123',
    accountHolder: 'test',
    accountBank: '국민',
    is_approve: 0,
  });
  const admin: any = localStorage.getItem('isAdmin');
  const getCominfo = async () => {
    api.setAxiosDefaultHeader();
    const result = await api.get('/company/info', {});
    if (result.status === 'success') {
      setData({
        name: result.data.name,
        phoneNumber: result.data.phone_number,
        email: result.data.email,
        password: result.data.password,
        businessNumber: result.data.business_number,
        accountNumber: result.data.account_number,
        accountHolder: result.data.account_holder,
        accountBank: result.data.account_bank,
        is_approve: result.data.is_approve,
      });
    } else {
      console.error(result);
    }
  };
  useEffect(() => {
    getCominfo();
  }, []);
  console.log(data);
  return (
    <Navbar className="navbar shadow-sm p-3   " expand="md" style={NavBarStyle}>
      <Button color="info" style={ButtonStyle} onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          {data.is_approve === 1 ? null : (
            <Button
              outline
              color="secondary"
              onClick={e => {
                TopBarLibs.goToRegister(history, `${path}/Register`);
              }}
              style={ButtonMargin}
            >
              사업자 등록 필요
            </Button>
          )}

          <Button
            outline
            color="secondary"
            onClick={e => {
              TopBarLibs.Logout(e, history);
            }}
          >
            로그아웃
          </Button>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default TopBar;
