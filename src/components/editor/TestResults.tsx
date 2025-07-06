import React from 'react';
import { CheckCircle, XCircle, Clock, Zap } from 'lucide-react';
import { TestResult } from '../../types';

interface TestResultsProps {
  results: TestResult[];
  status: 'Passed' | 'Failed' | 'Runtime Error' | 'Time Limit Exceeded';
  executionTime: number;
  memory: number;
}

const TestResults: React.FC<TestResultsProps> = ({
  results,
  status,
  executionTime,
  memory,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Passed':
        return 'text-green-400';
      case 'Failed':
        return 'text-red-400';
      case 'Runtime Error':
        return 'text-orange-400';
      case 'Time Limit Exceeded':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'Passed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      default:
        return <XCircle className="h-5 w-5 text-red-400" />;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <h3 className={`text-lg font-semibold ${getStatusColor()}`}>
            {status}
          </h3>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{executionTime}ms</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="h-4 w-4" />
            <span>{memory}MB</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className={`border rounded-lg p-4 ${
              result.passed
                ? 'border-green-600 bg-green-900/20'
                : 'border-red-600 bg-red-900/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">
                Test Case {result.testCase}
              </span>
              <div className="flex items-center space-x-2">
                {result.passed ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
                <span className="text-xs text-gray-400">
                  {result.executionTime}ms
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400 mb-1">Input:</p>
                <pre className="bg-gray-700 p-2 rounded text-gray-300 overflow-x-auto">
                  {result.input}
                </pre>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Expected:</p>
                <pre className="bg-gray-700 p-2 rounded text-gray-300 overflow-x-auto">
                  {result.expectedOutput}
                </pre>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Actual:</p>
                <pre className={`p-2 rounded overflow-x-auto ${
                  result.passed
                    ? 'bg-green-900/30 text-green-300'
                    : 'bg-red-900/30 text-red-300'
                }`}>
                  {result.actualOutput}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;