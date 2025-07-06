import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Target } from 'lucide-react';
import { mockChallenges } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import ChallengeCard from '../components/challenges/ChallengeCard';
import DifficultyBadge from '../components/challenges/DifficultyBadge';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const allTags = ['All', ...Array.from(new Set(mockChallenges.flatMap(c => c.tags)))];

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
    const matchesTag = selectedTag === 'All' || challenge.tags.includes(selectedTag);
    
    return matchesSearch && matchesDifficulty && matchesTag;
  });

  const stats = [
    {
      icon: Target,
      label: 'Problems Solved',
      value: user?.solvedChallenges || 0,
      color: 'text-green-400',
      bg: 'bg-green-900/20 border-green-700',
    },
    {
      icon: TrendingUp,
      label: 'Current Rank',
      value: `#${user?.rank || 0}`,
      color: 'text-blue-400',
      bg: 'bg-blue-900/20 border-blue-700',
    },
    {
      icon: Clock,
      label: 'Total Score',
      value: user?.score || 0,
      color: 'text-purple-400',
      bg: 'bg-purple-900/20 border-purple-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-400">
            Ready to tackle some challenges? Let's level up your coding skills.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`border rounded-lg p-6 ${stat.bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty} Difficulty
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Filter */}
            <div>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'All' ? 'All Tags' : tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Challenge Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Challenges ({filteredChallenges.length})
            </h2>
            <div className="flex items-center space-x-2">
              {selectedDifficulty !== 'All' && (
                <DifficultyBadge difficulty={selectedDifficulty as any} size="sm" />
              )}
              {selectedTag !== 'All' && (
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
                  {selectedTag}
                </span>
              )}
            </div>
          </div>

          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">
                No challenges found
              </div>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;