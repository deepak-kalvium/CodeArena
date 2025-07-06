import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Play, RotateCcw, Settings } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  onCodeChange: (code: string) => void;
  onSubmit: (code: string) => void;
  isSubmitting?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  onCodeChange,
  onSubmit,
  isSubmitting = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [fontSize, setFontSize] = useState(14);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleSubmit = () => {
    onSubmit(code);
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange(initialCode);
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-750 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-300">Java</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Settings className="h-4 w-4 text-gray-400" />
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-gray-700 text-gray-300 text-sm border border-gray-600 rounded px-2 py-1"
            >
              <option value={12}>12px</option>
              <option value={14}>14px</option>
              <option value={16}>16px</option>
              <option value={18}>18px</option>
            </select>
          </div>
          
          <button
            onClick={handleReset}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="h-96">
        <MonacoEditor
          height="100%"
          language="java"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
          }}
        />
      </div>

      {/* Submit Button */}
      <div className="px-4 py-3 bg-gray-750 border-t border-gray-700">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
        >
          <Play className="h-4 w-4" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Solution'}</span>
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;