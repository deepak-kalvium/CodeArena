const express = require('express');
const router = express.Router();

// Mock user data
const users = [
  {
    id: '1',
    username: 'CodeMaster',
    email: 'codemaster@example.com',
    score: 2450,
    rank: 1,
    solvedChallenges: 128,
    joinedAt: '2024-01-15',
    avatar: null,
    bio: 'Passionate about algorithms and data structures',
    location: 'San Francisco, CA',
    githubProfile: 'https://github.com/codemaster',
    preferredLanguages: ['Java', 'Python', 'C++']
  },
  {
    id: '2',
    username: 'AlgoQueen',
    email: 'algoqueen@example.com',
    score: 2380,
    rank: 2,
    solvedChallenges: 115,
    joinedAt: '2024-02-01',
    avatar: null,
    bio: 'Algorithm enthusiast and competitive programmer',
    location: 'New York, NY',
    githubProfile: 'https://github.com/algoqueen',
    preferredLanguages: ['Python', 'JavaScript', 'Go']
  },
  {
    id: '3',
    username: 'DevNinja',
    email: 'devninja@example.com',
    score: 2200,
    rank: 3,
    solvedChallenges: 98,
    joinedAt: '2024-01-28',
    avatar: null,
    bio: 'Full-stack developer with a love for clean code',
    location: 'Austin, TX',
    githubProfile: 'https://github.com/devninja',
    preferredLanguages: ['JavaScript', 'TypeScript', 'Java']
  }
];

// GET /api/users - Get all users with optional filtering
router.get('/', (req, res) => {
  try {
    const { search, limit = 10, offset = 0, sortBy = 'rank' } = req.query;
    let filteredUsers = [...users];

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.bio && user.bio.toLowerCase().includes(searchLower))
      );
    }

    // Sorting
    filteredUsers.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'username':
          return a.username.localeCompare(b.username);
        case 'joinedAt':
          return new Date(b.joinedAt) - new Date(a.joinedAt);
        case 'rank':
        default:
          return a.rank - b.rank;
      }
    });

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
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users',
      message: error.message
    });
  }
});

// GET /api/users/:id - Get a specific user by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
        message: `User with ID ${id} does not exist`
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user',
      message: error.message
    });
  }
});

// GET /api/users/:id/profile - Get user profile with additional stats
router.get('/:id/profile', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Mock additional profile data
    const profile = {
      ...user,
      stats: {
        totalSubmissions: user.solvedChallenges + Math.floor(Math.random() * 50),
        successRate: Math.floor(Math.random() * 30) + 70,
        averageExecutionTime: Math.floor(Math.random() * 500) + 100,
        streakDays: Math.floor(Math.random() * 30),
        favoriteTopics: ['Dynamic Programming', 'Graph Theory', 'Binary Search'],
        recentActivity: [
          { date: '2024-01-20', action: 'Solved Two Sum', points: 50 },
          { date: '2024-01-19', action: 'Solved Valid Parentheses', points: 45 },
          { date: '2024-01-18', action: 'Attempted Binary Tree Traversal', points: 0 }
        ]
      }
    };

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile',
      message: error.message
    });
  }
});

// GET /api/users/:id/submissions - Get user's submissions
router.get('/:id/submissions', (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 10, offset = 0, status } = req.query;
    
    const user = users.find(u => u.id === id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Mock submissions data
    const allSubmissions = [
      {
        id: 'sub1',
        challengeId: '1',
        challengeTitle: 'Two Sum',
        status: 'Passed',
        score: 100,
        executionTime: 45,
        memory: 64,
        language: 'Java',
        submittedAt: '2024-01-20T14:30:00Z'
      },
      {
        id: 'sub2',
        challengeId: '2',
        challengeTitle: 'Valid Parentheses',
        status: 'Passed',
        score: 95,
        executionTime: 38,
        memory: 56,
        language: 'Python',
        submittedAt: '2024-01-19T16:45:00Z'
      },
      {
        id: 'sub3',
        challengeId: '3',
        challengeTitle: 'Longest Substring',
        status: 'Failed',
        score: 0,
        executionTime: 0,
        memory: 0,
        language: 'JavaScript',
        submittedAt: '2024-01-18T10:20:00Z'
      }
    ];

    let filteredSubmissions = allSubmissions;

    // Filter by status
    if (status && status !== 'All') {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.status === status);
    }

    // Pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedSubmissions = filteredSubmissions.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedSubmissions,
      pagination: {
        total: filteredSubmissions.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: endIndex < filteredSubmissions.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user submissions',
      message: error.message
    });
  }
});

module.exports = router;