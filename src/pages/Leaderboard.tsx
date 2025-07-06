import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users, Target } from 'lucide-react';
import { mockUsers } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-600/30';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: '50,247',
      color: 'text-blue-400',
    },
    {
      icon: Target,
      label: 'Problems Solved',
      value: '1,234,567',
      color: 'text-green-400',
    },
    {
      icon: TrendingUp,
      label: 'Active Today',
      value: '2,840',
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-400 text-lg">
            See how you rank among the best coders in the arena
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeframe Filter */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Rankings</h2>
            <div className="flex space-x-2">
              {(['all', 'month', 'week'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    timeframe === period
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {period === 'all' ? 'All Time' : period === 'month' ? 'This Month' : 'This Week'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current User Rank (if not in top 10) */}
        {user && user.rank > 10 && (
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <span className="text-white font-bold">#{user.rank}</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">{user.username} (You)</p>
                <p className="text-gray-400 text-sm">{user.solvedChallenges} problems solved</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-400">{user.score}</p>
                <p className="text-gray-400 text-sm">points</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="space-y-4">
          {mockUsers.slice(0, 20).map((leaderUser, index) => (
            <div
              key={leaderUser.id}
              className={`border rounded-lg p-6 transition-all duration-200 hover:scale-105 ${
                getRankBackground(leaderUser.rank)
              } ${user?.id === leaderUser.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="flex items-center space-x-6">
                {/* Rank */}
                <div className="flex items-center justify-center w-16 h-16">
                  {getRankIcon(leaderUser.rank)}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-xl font-semibold text-white">
                      {leaderUser.username}
                    </h3>
                    {user?.id === leaderUser.id && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">
                    {leaderUser.solvedChallenges} problems solved
                  </p>
                  <p className="text-gray-500 text-sm">
                    Joined {new Date(leaderUser.joinedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right">
                  <p className="text-3xl font-bold text-white mb-1">
                    {leaderUser.score.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm">points</p>
                </div>

                {/* Progress Indicator */}
                <div className="hidden sm:block">
                  <div className="w-16 h-16 relative">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-gray-700"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={`${(leaderUser.solvedChallenges / 150) * 176} 176`}
                        className="text-blue-400"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-300">
                        {Math.round((leaderUser.solvedChallenges / 150) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;