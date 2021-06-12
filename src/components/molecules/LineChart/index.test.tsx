import { render } from '@testing-library/react';
import LineChart from './index';
import Dummy from '../../../utils/dummy';

describe('LineChart', () => {
  it('renders LineChart', () => {
    render(<LineChart data={Dummy.chartData} options={Dummy.chartOptions} />);
  });
});
