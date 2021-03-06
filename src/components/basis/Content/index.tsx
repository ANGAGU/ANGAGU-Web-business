import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import './style.css';
import {
  CompanyProductTemplate,
  CompanyRegisterTemplate,
  CompanyOrderTemplate,
  CompanyInfoTemplate,
  CompanyAdjustTemplate,
  CompanyQnATemplate,
  QnADetailTemplate,
  MainTemplate,
  ProductDetailTemplate,
  AdminProductTemplate,
  AdminAdjustTemplate,
  AdminUserTemplate,
  CompanyRefundTemplate,
} from '../../template';

type ContentProps = {
  sidebarIsOpen: boolean;
  toggleSidebar: VoidFunction;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Content = ({ sidebarIsOpen, toggleSidebar }: ContentProps) => {
  const { path } = useRouteMatch(); // 요청시의 path?
  console.log('path : ', path);
  return (
    <Container fluid className={classNames('content', { 'is-open': sidebarIsOpen })}>
      <div id="content_container">
        <Switch>
          <Route exact path={`${path}/Register`} component={CompanyRegisterTemplate} />
          <Route exact path={`${path}/Product`} component={CompanyProductTemplate} />
          <Route exact path={`${path}/Product/:id`} component={ProductDetailTemplate} />
          <Route exact path={`${path}/ManageOrder`} component={CompanyOrderTemplate} />
          <Route exact path={`${path}/Info`} component={CompanyInfoTemplate} />
          <Route exact path={`${path}/Adjust`} component={CompanyAdjustTemplate} />
          <Route exact path={`${path}/QnA`} component={CompanyQnATemplate} />
          <Route exact path={`${path}/QnA/:id`} component={QnADetailTemplate} />
          <Route exact path={`${path}/ManageProduct`} component={AdminProductTemplate} />
          <Route exact path={`${path}/ManageAdjust`} component={AdminAdjustTemplate} />
          <Route exact path={`${path}/ManageUser`} component={AdminUserTemplate} />
          <Route exact path={`${path}/ManageRefund`} component={CompanyRefundTemplate} />
          <Route exact path={`${path}`} component={MainTemplate} />
        </Switch>
      </div>
    </Container>
  );
};

export default Content;
