import { Typography } from 'antd';
import React from 'react';
import './Heading.style.scss';

const { Title } = Typography;

const Heading = ({ title, ...rest }) => {
  return (
    <Title level={3} className="heading" {...rest} className="heading">
      {title}
    </Title>
  );
};

export default Heading;
