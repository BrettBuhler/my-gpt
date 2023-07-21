import React from 'react';

interface CustomTooltipProps {
  text: string;
  position: { x: number; y: number };
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ text, position }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: position.x - 180,
        top: position.y - 30,
        background: '#022c22',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '14px',
        width: '150px',
      }}
    >
      {text}
    </div>
  );
};

export default CustomTooltip;