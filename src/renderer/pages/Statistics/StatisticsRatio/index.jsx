import { Col, Row } from 'antd';
import { ArcElement, Chart } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../Statistics.style.scss';

const StatisticsRatio = () => {
  Chart.register(ArcElement);

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: ['Red', 'Orange', 'Yellow', 'Blue'],
        borderColor: 'white',
        data: [20, 40, 15, 25],
      },
    ],
  };

  const data2 = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: ['Blue', 'yellow', 'pink', 'purple'],
        borderColor: 'white',
        data: [10, 30, 25, 35],
      },
    ],
  };

  return (
    <div className="statistics_area">
      <h1>Statistics</h1>
      <Row>
        <Col lg={8} push={2}>
          <div style={{ padding: '1rem' }}>
            <Pie data={data} />
          </div>
        </Col>

        <Col lg={8} push={6}>
          <div style={{ padding: '1rem' }}>
            <Pie data={data2} />
          </div>
        </Col>

        {/* <Col lg={6}>
          <div style={{ padding: '1rem' }}>
            <Pie data={data} />
          </div>
        </Col> */}
      </Row>
    </div>
  );
};

export default StatisticsRatio;
