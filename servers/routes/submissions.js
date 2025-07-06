const express = require('express');
const router = express.Router();

// Mock submissions data
const submissions = [
  {
    id: 'sub1',
    challengeId: '1',
    userId: '1',
    code: 'public class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Implementation here\n    }\n}',
    language: 'Java',
    status: 'Passed',
    executionTime: 45,
    memory: 64,
    score: 100,
    testResults: [
      { testCase: 1, passed: true, executionTime: 15 },
      { testCase: 2, passed: true, executionTime: 18 },
      { testCase: 3, passed: true, executionTime: 12 }
    ],
    submittedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'sub2',
    challengeId: '2',
    userId: '2',
    code: 'def isValid(s):\n    # Implementation here\n    pass',
    language: 'Python',
    status: 'Passed',
    executionTime: 38,
    memory: 56,
    score: 95,
    testResults: [
      { testCase: 1, passed: true, executionTime: 12 },
      { testCase: 2, passed: true, executionTime: 14 },
      { testCase: 3, passed: true, executionTime: 12 }
    ],
    submittedAt: '2024-01-19T16:45:00Z'
  }
];

// GET /api/submissions - Get all submissions with filtering
router.get('/', (req, res) => {
  try {
    const { 
      challengeId, 
      userId, 
      status, 
      language,
      limit = 20, 
      offset = 0,
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query;

    let filteredSubmissions = [...submissions];

    // Apply filters
    if (challengeId) {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.challengeId === challengeId);
    }

    if (userId) {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.userId === userId);
    }

    if (status && status !== 'All') {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.status === status);
    }

    if (language && language !== 'All') {
      filteredSubmissions = filteredSubmissions.filter(sub => sub.language === language);
    }

    // Sorting
    filteredSubmissions.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'submittedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

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
      error: 'Failed to fetch submissions',
      message: error.message
    });
  }
});

// GET /api/submissions/:id - Get a specific submission by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const submission = submissions.find(sub => sub.id === id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found',
        message: `Submission with ID ${id} does not exist`
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission',
      message: error.message
    });
  }
});

// GET /api/submissions/challenge/:challengeId/stats - Get submission statistics for a challenge
router.get('/challenge/:challengeId/stats', (req, res) => {
  try {
    const { challengeId } = req.params;
    
    const challengeSubmissions = submissions.filter(sub => sub.challengeId === challengeId);
    
    if (challengeSubmissions.length === 0) {
      return res.json({
        success: true,
        data: {
          challengeId,
          totalSubmissions: 0,
          successfulSubmissions: 0,
          successRate: 0,
          averageExecutionTime: 0,
          languageDistribution: {},
          statusDistribution: {}
        }
      });
    }

    const successfulSubmissions = challengeSubmissions.filter(sub => sub.status === 'Passed');
    const successRate = (successfulSubmissions.length / challengeSubmissions.length) * 100;
    
    const totalExecutionTime = challengeSubmissions.reduce((sum, sub) => sum + sub.executionTime, 0);
    const averageExecutionTime = totalExecutionTime / challengeSubmissions.length;

    // Language distribution
    const languageDistribution = {};
    challengeSubmissions.forEach(sub => {
      languageDistribution[sub.language] = (languageDistribution[sub.language] || 0) + 1;
    });

    // Status distribution
    const statusDistribution = {};
    challengeSubmissions.forEach(sub => {
      statusDistribution[sub.status] = (statusDistribution[sub.status] || 0) + 1;
    });

    const stats = {
      challengeId,
      totalSubmissions: challengeSubmissions.length,
      successfulSubmissions: successfulSubmissions.length,
      successRate: Math.round(successRate * 100) / 100,
      averageExecutionTime: Math.round(averageExecutionTime),
      languageDistribution,
      statusDistribution
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission statistics',
      message: error.message
    });
  }
});

// GET /api/submissions/user/:userId/recent - Get recent submissions for a user
router.get('/user/:userId/recent', (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const userSubmissions = submissions
      .filter(sub => sub.userId === userId)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: userSubmissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent submissions',
      message: error.message
    });
  }
});

module.exports = router;