const express = require('express');
const router = express.Router();

// Mock data - in production, this would come from a database
const challenges = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    likes: 1234,
    sampleInput: 'nums = [2,7,11,15], target = 9',
    sampleOutput: '[0,1]',
    constraints: '2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹',
    timeLimit: 1000,
    memoryLimit: 128,
    successRate: 85.2,
    totalSubmissions: 15623,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Easy',
    tags: ['String', 'Stack'],
    likes: 987,
    sampleInput: 's = "()[]{}"',
    sampleOutput: 'true',
    constraints: '1 ≤ s.length ≤ 10⁴\ns consists of parentheses only \'()[]{}\'"',
    timeLimit: 1000,
    memoryLimit: 128,
    successRate: 78.9,
    totalSubmissions: 12456,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    likes: 2156,
    sampleInput: 's = "abcabcbb"',
    sampleOutput: '3',
    constraints: '0 ≤ s.length ≤ 5 * 10⁴\ns consists of English letters, digits, symbols and spaces.',
    timeLimit: 2000,
    memoryLimit: 256,
    successRate: 62.3,
    totalSubmissions: 18934,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  },
  {
    id: '4',
    title: 'Median of Two Sorted Arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    likes: 3421,
    sampleInput: 'nums1 = [1,3], nums2 = [2]',
    sampleOutput: '2.00000',
    constraints: 'nums1.length == m\nnums2.length == n\n0 ≤ m ≤ 1000\n0 ≤ n ≤ 1000',
    timeLimit: 3000,
    memoryLimit: 512,
    successRate: 34.7,
    totalSubmissions: 8967,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  }
];

// GET /api/challenges - Get all challenges with optional filtering
router.get('/', (req, res) => {
  try {
    const { difficulty, tag, search, limit = 10, offset = 0 } = req.query;
    let filteredChallenges = [...challenges];

    // Filter by difficulty
    if (difficulty && difficulty !== 'All') {
      filteredChallenges = filteredChallenges.filter(
        challenge => challenge.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    // Filter by tag
    if (tag && tag !== 'All') {
      filteredChallenges = filteredChallenges.filter(
        challenge => challenge.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }

    // Search in title and description
    if (search) {
      const searchLower = search.toLowerCase();
      filteredChallenges = filteredChallenges.filter(
        challenge => 
          challenge.title.toLowerCase().includes(searchLower) ||
          challenge.description.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedChallenges = filteredChallenges.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedChallenges,
      pagination: {
        total: filteredChallenges.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: endIndex < filteredChallenges.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch challenges',
      message: error.message
    });
  }
});

// GET /api/challenges/:id - Get a specific challenge by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const challenge = challenges.find(c => c.id === id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        error: 'Challenge not found',
        message: `Challenge with ID ${id} does not exist`
      });
    }

    res.json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch challenge',
      message: error.message
    });
  }
});

// GET /api/challenges/:id/stats - Get challenge statistics
router.get('/:id/stats', (req, res) => {
  try {
    const { id } = req.params;
    const challenge = challenges.find(c => c.id === id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        error: 'Challenge not found'
      });
    }

    // Mock statistics - in production, calculate from submissions
    const stats = {
      challengeId: id,
      totalSubmissions: challenge.totalSubmissions,
      successfulSubmissions: Math.floor(challenge.totalSubmissions * (challenge.successRate / 100)),
      successRate: challenge.successRate,
      averageExecutionTime: Math.floor(Math.random() * 500) + 100,
      popularLanguages: [
        { language: 'Java', percentage: 45.2 },
        { language: 'Python', percentage: 32.1 },
        { language: 'JavaScript', percentage: 15.7 },
        { language: 'C++', percentage: 7.0 }
      ],
      difficultyDistribution: {
        easy: challenge.difficulty === 'Easy' ? 100 : 0,
        medium: challenge.difficulty === 'Medium' ? 100 : 0,
        hard: challenge.difficulty === 'Hard' ? 100 : 0
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch challenge statistics',
      message: error.message
    });
  }
});

// GET /api/challenges/tags/popular - Get popular tags
router.get('/tags/popular', (req, res) => {
  try {
    const tagCounts = {};
    
    challenges.forEach(challenge => {
      challenge.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const popularTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({
      success: true,
      data: popularTags
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch popular tags',
      message: error.message
    });
  }
});

module.exports = router;