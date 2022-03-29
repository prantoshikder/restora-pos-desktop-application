import { Col, Row } from 'antd';
import { Chart, registerables } from 'chart.js';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const StatisticsRatio = ({ statisticsData }) => {

  Chart.register(...registerables);

  const [statisticsData, setStatisticsData] = useState(null);

  useEffect(() => {
    getDataFromDatabase(
      'get_dashboard_data_response',
      window.get_dashboard_data
    ).then((args = []) => {
      console.log('args', args);
      setStatisticsData(args);
    });
  }, []);

  // const months = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Oct',
  //   'Nov',
  //   'Dec',
  // ],

  // const labels = statisticsData ? Object.keys(statisticsData[0]) : '';
  // const data = months.concat(labels);
  // let uniqueChars = [...new Set(data)];

  // console.log("labels", uniqueChars);
  // console.log("statisticsData", statisticsData);

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
    labels: (statisticsData) ? Object.keys(statisticsData[0]) : '',
    datasets: [
      {
        label: 'Order',
        backgroundColor: 'green',
        borderColor: 'green',
        data: (statisticsData) ? Object.values(statisticsData[0]) : 0
      },
      {
        label: 'Sales',
        backgroundColor: '#92CD00',
        borderColor: 'red',
        data: (statisticsData) ? Object.values(statisticsData[1]) : 0,
      },
    ],
  };

  return (
    <div className="statistics_area">
      <h1>Statistics</h1>
      <Row>
        <Col lg={24}>
          <div style={{ padding: '1rem' }}>
            <Bar options={options2} data={data2} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsRatio;
