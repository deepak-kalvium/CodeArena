import React from 'react';

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  size?: 'sm' | 'md';
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, size = 'md' }) => {
  const getStyles = () => {
    const baseStyles = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
    
    switch (difficulty) {
      case 'Easy':
        return `${baseStyles} bg-green-100 text-green-800 border border-green-300`;
      case 'Medium':
        return `${baseStyles} bg-yellow-100 text-yellow-800 border border-yellow-300`;
      case 'Hard':
        return `${baseStyles} bg-red-100 text-red-800 border border-red-300`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-800 border border-gray-300`;
    }
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${getStyles()}`}>
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;