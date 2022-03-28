import { Col, Row } from 'antd';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

const StatisticsRatio = () => {
  window.get_dashboard_data.once('get_dashboard_data_response', (args) => {
    window.allData = args
  })

  Chart.register(...registerables);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Monthly Sales Amount and Order',
  //     },
  //   },
  // };

  // const data = {
  //   labels: [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December',
  //   ],
  //   datasets: [
  //     {
  //       label: 'Sale Amount',
  //       backgroundColor: ['Red'],
  //       borderColor: 'red',
  //       data: [0, 4, 8, 10, 16, 12, 25, 39, 34, 38, 45, 58],
  //     },
  //     {
  //       label: 'Order Amount',
  //       backgroundColor: ['green'],
  //       borderColor: 'green',
  //       data: [2, 8, 15, 21, 30, 20, 29, 34, 25, 40, 42, 50],
  //     },
  //   ],
  // };

  const options2 = {
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

  const data2 = {
    labels: Object.keys(window.allData[0]),
    datasets: [
      {
        label: 'Order',
        backgroundColor: 'green',
        borderColor: 'green',
        data: Object.values(window.allData[0]),
      },
      {
        label: 'Sales',
        backgroundColor: '#92CD00',
        borderColor: 'red',
        data: Object.values(window.allData[1]),
      },
    ],
  };

  return (
    <div className="statistics_area">
      <h1>Statistics</h1>
      <Row>
        {/* <Col lg={12}>
          <div style={{ padding: '1rem' }}>
            <Line options={options} data={data} />
          </div>
        </Col> */}

        <Col lg={12}>
          <div style={{ padding: '1rem' }}>
            <Bar options={options2} data={data2} />
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
