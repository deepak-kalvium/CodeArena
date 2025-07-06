import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users, TrendingUp } from 'lucide-react';
import { Challenge } from '../../types';
import DifficultyBadge from './DifficultyBadge';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <Link
      to={`/challenge/${challenge.id}`}
      className="block bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
          {challenge.title}
        </h3>
        <DifficultyBadge difficulty={challenge.difficulty} />
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {challenge.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {challenge.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Heart className="h-4 w-4" />
            <span>{challenge.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{challenge.totalSubmissions}</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>{challenge.successRate.toFixed(1)}%</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{challenge.timeLimit}ms</span>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;