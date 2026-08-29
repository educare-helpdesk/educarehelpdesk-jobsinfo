import React from 'react';
import { FaqSection } from './FaqSection';

interface FaqsProps {
  initialCategory?: string;
  onNavigateTab?: (tabId: string) => void;
}

export const Faqs: React.FC<FaqsProps> = ({ initialCategory, onNavigateTab }) => {
  return (
    <div className="animate-fadeIn">
      <FaqSection initialCategory={initialCategory} onNavigateTab={onNavigateTab} />
    </div>
  );
};

export default Faqs;
