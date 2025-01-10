import React from 'react';

interface DropdownProps {
  isOpen: boolean;
  content: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ isOpen, content }) => {
  return (
    <div className={`dropdown ${isOpen ? 'expanded' : ''}`}>
      <div className="dropdown-content">
        {content}
      </div>
    </div>
  );
};
