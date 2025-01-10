import React, { useState } from 'react';
import { Modal } from './Modal';
import { Dropdown } from './Dropdown';
import { useScreenSize } from '../hooks/useScreenSize';

interface CardProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ id, title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useScreenSize();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card">
      <div className="card-header" onClick={handleToggle}>
        <h3>{title}</h3>
      </div>
      
      {isMobile ? (
        <Dropdown isOpen={isExpanded} content={content} />
      ) : (
        <Modal 
          isOpen={isExpanded} 
          onClose={() => setIsExpanded(false)}
          title={title}
          content={content}
        />
      )}
    </div>
  );
};
