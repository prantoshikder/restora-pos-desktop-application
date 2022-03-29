import { Col, ConfigProvider, Row } from 'antd';
import { getDataFromDatabase } from 'helpers';
import { useEffect, useState } from 'react';
import CountHistory from 'renderer/components/CountHistory';
import Heading from 'renderer/components/Heading';
import Header from 'renderer/components/partials/Header';
import { Sidebar } from 'renderer/components/partials/Sidebar';
import StatisticsRatio from '../../components/StatisticsRatio';

const DashBoard = ({ settings }) => {
  window.get_dashboard_data.send('get_dashboard_data', { 'status': true })

  const [statisticsData, setStatisticsData] = useState(null)
  const [totalCount, setTotalCount] = useState(null)

  useEffect(() => {
    getDataFromDatabase('get_dashboard_data_response', window.get_dashboard_data).then((args) => {
      setStatisticsData(args.slice(0, 2))
      setTotalCount(args.slice(2, 6))
    })
  }, [])


  return (
    <div className="main_wrapper">
      <div className="pos_system">
        <ConfigProvider direction={settings.site_align}>
          <Row>
            <Col lg={5} xl={3} xxl={3}>
              <Sidebar settings={settings} />
            </Col>

            <Col lg={19} xl={21} xxl={21}>
              <Header dashboard settings={settings} />
              <Heading title="Dashboard" />

              <div style={{ margin: '0rem 1.5rem' }}>
                <CountHistory totalCount={totalCount} />

                <StatisticsRatio statisticsData={statisticsData} />
              </div>
            </Col>
          </Row>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default DashBoard;
