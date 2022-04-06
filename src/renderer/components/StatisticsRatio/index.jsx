import { Col, Row } from 'antd';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const StatisticsRatio = ({ statisticsData }) => {
  Chart.register(...registerables);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly total order vs total sales',
      },
    },
  };

  const data = {
    labels: statisticsData ? Object.keys(statisticsData[0]) : '',
    datasets: [
      {
        label: 'Order',
        backgroundColor: 'green',
        borderColor: 'green',
        data: statisticsData ? Object.values(statisticsData[0]) : 0,
      },
      {
        label: 'Sales',
        backgroundColor: '#92CD00',
        borderColor: '#92CD00',
        data: statisticsData ? Object.values(statisticsData[1]) : 0,
      },
    ],
  };

  return (
    <div className="statistics_area">
      <h1>Statistics</h1>
      <Row>
        <Col lg={24}>
          <div style={{ padding: '1rem' }}>
            <Bar options={options} data={data} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsRatio;
