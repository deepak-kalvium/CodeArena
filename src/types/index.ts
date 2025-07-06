export interface User {
  id: string;
  username: string;
  email: string;
  score: number;
  rank: number;
  solvedChallenges: number;
  avatar?: string;
  joinedAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  likes: number;
  sampleInput: string;
  sampleOutput: string;
  constraints: string;
  timeLimit: number;
  memoryLimit: number;
  successRate: number;
  totalSubmissions: number;
}

export interface Submission {
  id: string;
  challengeId: string;
  userId: string;
  code: string;
  language: string;
  status: 'Passed' | 'Failed' | 'Runtime Error' | 'Time Limit Exceeded';
  executionTime: number;
  memory: number;
  score: number;
  submittedAt: string;
}

export interface TestResult {
  testCase: number;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}