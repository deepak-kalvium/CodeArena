import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Database, Users, TrendingUp, Heart } from 'lucide-react';
import { mockChallenges, defaultCode } from '../utils/mockData';
import { TestResult } from '../types';
import DifficultyBadge from '../components/challenges/DifficultyBadge';
import CodeEditor from '../components/editor/CodeEditor';
import TestResults from '../components/editor/TestResults';

const Challenge: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState(mockChallenges.find(c => c.id === id));
  const [code, setCode] = useState(defaultCode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<'Passed' | 'Failed' | 'Runtime Error' | 'Time Limit Exceeded' | null>(null);

  useEffect(() => {
    const foundChallenge = mockChallenges.find(c => c.id === id);
    setChallenge(foundChallenge);
  }, [id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleSubmit = async (submittedCode: string) => {
    setIsSubmitting(true);
    setTestResults([]);
    setSubmissionStatus(null);

    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock test results
    const mockResults: TestResult[] = [
      {
        testCase: 1,
        passed: true,
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        actualOutput: '[0,1]',
        executionTime: 45,
      },
      {
        testCase: 2,
        passed: true,
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        actualOutput: '[1,2]',
        executionTime: 38,
      },
      {
        testCase: 3,
        passed: Math.random() > 0.3,
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        actualOutput: '[0,1]',
        executionTime: 42,
      },
    ];

    const allPassed = mockResults.every(result => result.passed);
    const status = allPassed ? 'Passed' : 'Failed';

    setTestResults(mockResults);
    setSubmissionStatus(status);
    setIsSubmitting(false);
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Challenge not found</h1>
          <Link to="/dashboard" className="text-blue-400 hover:text-blue-300">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{challenge.title}</h1>
                <DifficultyBadge difficulty={challenge.difficulty} />
              </div>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Problem Description</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {challenge.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Sample Input</h3>
                  <pre className="bg-gray-700 p-3 rounded text-gray-300 overflow-x-auto">
                    {challenge.sampleInput}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Sample Output</h3>
                  <pre className="bg-gray-700 p-3 rounded text-gray-300 overflow-x-auto">
                    {challenge.sampleOutput}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Constraints</h3>
                  <pre className="bg-gray-700 p-3 rounded text-gray-300 text-sm whitespace-pre-wrap">
                    {challenge.constraints}
                  </pre>
                </div>
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Challenge Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Time Limit</p>
                    <p className="text-white font-medium">{challenge.timeLimit}ms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Memory Limit</p>
                    <p className="text-white font-medium">{challenge.memoryLimit}MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div>
            <CodeEditor
              initialCode={defaultCode}
              onCodeChange={handleCodeChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />

            {/* Test Results */}
            {testResults.length > 0 && submissionStatus && (
              <div className="mt-6">
                <TestResults
                  results={testResults}
                  status={submissionStatus}
                  executionTime={Math.max(...testResults.map(r => r.executionTime))}
                  memory={64} // Mock memory usage
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;