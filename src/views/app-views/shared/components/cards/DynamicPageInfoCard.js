

import React from 'react';
import { Card, Col, Image, Row } from 'antd';

export default function DynamicPageInfoCard({ data, withCard = true }) {
  if (!data) {
    return null;
  }

  const UI = (
    <>
      {data.headerText && (
        <p
          className='text-uppercase'
          style={{ fontSize: '12px', fontWeight: 600 }}>
          {data.headerText}
        </p>
      )}
      <Row>
        {data.rows &&
          data.rows.map((row, index) => (
            <Col
              key={index}
              xs={{ span: row.size?.xs ||  24 }}
              sm={{ span: row.size?.sm ||  24 }}
              md={{ span: row.size?.md ||  24 }}
              lg={{ span: row.size?.lg ||  24 }}
              className={row.columClass}>
              <div className='d-flex align-items-center mb-2'>
                {row.icon && <div className='mr-3 text-danger' style={row.iconStyle}>{row.icon}</div>}
                {row.key && (
                  <div className='mr-2 text-muted font-weight-semi-bold'>
                    {row.key}
                  </div>
                )}
                {row.value && (
                  <div className='font-weight-bold'>{row.value}</div>
                )}
              </div>
            </Col>
          ))}
      </Row>
      {data.text && (
        <div className='d-flex align-items-center mb-2'>
          <strong>{data.text}</strong>
        </div>
      )}
      {data.image && (
        <div
          style={{
            alignSelf: 'center',
            top: 30,
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <Image width='100%' src={data.image} />
        </div>
      )}
      {data.component && data.component}
    </>
  );

  return withCard === true ? <Card>{UI}</Card> : UI;
}
