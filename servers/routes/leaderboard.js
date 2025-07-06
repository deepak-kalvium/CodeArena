const express = require('express');
const router = express.Router();

// Mock leaderboard data
const leaderboardUsers = [
  {
    id: '1',
    username: 'CodeMaster',
    score: 2450,
    rank: 1,
    solvedChallenges: 128,
    avatar: null,
    country: 'USA',
    streak: 15
  },
  {
    id: '2',
    username: 'AlgoQueen',
    score: 2380,
    rank: 2,
    solvedChallenges: 115,
    avatar: null,
    country: 'Canada',
    streak: 12
  },
  {
    id: '3',
    username: 'DevNinja',
    score: 2200,
    rank: 3,
    solvedChallenges: 98,
    avatar: null,
    country: 'UK',
    streak: 8
  },
  {
    id: '4',
    username: 'ByteWarrior',
    score: 2150,
    rank: 4,
    solvedChallenges: 89,
    avatar: null,
    country: 'Germany',
    streak: 6
  },
  {
    id: '5',
    username: 'LogicLord',
    score: 2080,
    rank: 5,
    solvedChallenges: 76,
    avatar: null,
    country: 'Japan',
    streak: 10
  }
];

// GET /api/leaderboard - Get global leaderboard
router.get('/', (req, res) => {
  try {
    const { 
      timeframe = 'all', 
      limit = 50, 
      offset = 0,
      country 
    } = req.query;

    let filteredUsers = [...leaderboardUsers];

    // Filter by country if specified
    if (country && country !== 'All') {
      filteredUsers = filteredUsers.filter(user => 
        user.country.toLowerCase() === country.toLowerCase()
      );
    }

    // In a real application, you would filter by timeframe here
    // For now, we'll just use the same data regardless of timeframe

    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        total: filteredUsers.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: endIndex < filteredUsers.length
      },
      metadata: {
        timeframe,
        lastUpdated: new Date().toISOString(),
        totalUsers: 50247
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard',
      message: error.message
    });
  }
});

// GET /api/leaderboard/top/:count - Get top N users
router.get('/top/:count', (req, res) => {
  try {
    const count = parseInt(req.params.count) || 10;
    const { timeframe = 'all' } = req.query;

    if (count > 100) {
      return res.status(400).json({
        success: false,
        error: 'Count cannot exceed 100'
      });
    }

    const topUsers = leaderboardUsers.slice(0, count);

    res.json({
      success: true,
      data: topUsers,
      metadata: {
        count,
        timeframe,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch top users',
      message: error.message
    });
  }
});

// GET /api/leaderboard/user/:id/position - Get user's position in leaderboard
router.get('/user/:id/position', (req, res) => {
  try {
    const { id } = req.params;
    const { timeframe = 'all' } = req.query;

    const userIndex = leaderboardUsers.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'User not found in leaderboard'
      });
    }

    const user = leaderboardUsers[userIndex];
    const position = userIndex + 1;

    // Get surrounding users (5 above and 5 below)
    const start = Math.max(0, userIndex - 5);
    const end = Math.min(leaderboardUsers.length, userIndex + 6);
    const surroundingUsers = leaderboardUsers.slice(start, end);

    res.json({
      success: true,
      data: {
        user,
        position,
        surroundingUsers,
        totalUsers: leaderboardUsers.length
      },
      metadata: {
        timeframe,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user position',
      message: error.message
    });
  }
});

// GET /api/leaderboard/stats - Get leaderboard statistics
router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalUsers: 50247,
      activeUsers: 2840,
      totalSubmissions: 1234567,
      averageScore: 1250,
      topCountries: [
        { country: 'USA', userCount: 12500 },
        { country: 'India', userCount: 8900 },
        { country: 'China', userCount: 7600 },
        { country: 'Germany', userCount: 4200 },
        { country: 'Canada', userCount: 3800 }
      ],
      scoreDistribution: {
        '0-500': 15000,
        '501-1000': 18000,
        '1001-1500': 12000,
        '1501-2000': 4000,
        '2001+': 1247
      }
    };

    res.json({
      success: true,
      data: stats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard statistics',
      message: error.message
    });
  }
});

module.exports = router;