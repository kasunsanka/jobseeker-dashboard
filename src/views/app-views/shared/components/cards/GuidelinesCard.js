
import { Card } from 'antd';
import React from 'react';

export default function GuidelinesCard({
  hint,
  title,
  headerText,
  videoSource,
  loading,
}) {
  return (
    <div>
      <Card title={title} loading={loading}>
        {headerText && (
          <p
            className='text-uppercase'
            style={{ fontSize: '12px', fontWeight: 600 }}>
            {headerText}
          </p>
        )}
        {videoSource && videoSource.show && (
          <div
            style={{
              width: '100%',
              height: '120px',
              backgroundColor: '#ccc',
              borderRadius: '4px',
              display: 'grid',
              placeItems: 'center',
              marginBottom: '1.5rem',
            }}>
            video player placeholder
          </div>
        )}
        {hint && hint}
      </Card>
    </div>
  );
}
