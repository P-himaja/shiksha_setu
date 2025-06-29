'use client';
import { useState } from 'react';
import { Upload, Brain, Users, BookOpen, Loader2 } from 'lucide-react';

export default function Agents() {
  const [activeTab, setActiveTab] = useState('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [query, setQuery] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      alert(`✅ Uploaded! Processed ${data.chunks} chunks`);
    } catch (error) {
      alert('❌ Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuery = async (type) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query, 
          type,
          context: { level: 'high school', grade: '10' }
        }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert('❌ Query failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🤖 ShikshaSetu - AI-Powered Learning Platform
          </h1>
          <p className="text-lg text-gray-600">
            Multi-Agent RAG System for Personalized Education
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 rounded-md flex items-center gap-2 transition-all ${
                activeTab === 'upload' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Upload size={20} />
              Content Upload
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`px-6 py-3 rounded-md flex items-center gap-2 transition-all ${
                activeTab === 'student' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Brain size={20} />
              Student Portal
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-6 py-3 rounded-md flex items-center gap-2 transition-all ${
                activeTab === 'teacher' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              Teacher Portal
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'upload' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="text-blue-500" />
                Upload Educational Content
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  {isLoading ? (
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                  ) : (
                    <Upload className="w-12 h-12 text-gray-400" />
                  )}
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {isLoading ? 'Processing...' : 'Click to upload PDF textbooks'}
                    </p>
                    <p className="text-sm text-gray-500">
                      RAG will process and vectorize your content
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'student' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Brain className="text-green-500" />
                AI Learning Assistant
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ask your question or describe what you learned:
                  </label>
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows={3}
                    placeholder="e.g., I learned about quadratic equations, how are they used in real life?"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleQuery('doubt')}
                    disabled={isLoading}
                    className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '🤔'}
                    Solve Doubt
                  </button>
                  <button
                    onClick={() => handleQuery('application')}
                    disabled={isLoading}
                    className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '🎯'}
                    Find Applications
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teacher' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="text-purple-500" />
                Teacher Assistant
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic for lesson planning:
                  </label>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Photosynthesis, Linear Equations, World War 2"
                  />
                </div>

                <button
                  onClick={() => handleQuery('lesson')}
                  disabled={isLoading}
                  className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '📚'}
                  Generate Lesson Plan
                </button>
              </div>
            </div>
          )}

          {/* Response Display */}
          {response && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg font-semibold">
                  {response.agent} Agent Response
                </h3>
                {'confidence' in response && (
                  <span className="ml-auto text-sm text-gray-500">
                    Confidence: {(response.confidence * 100).toFixed(0)}%
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {response.answer || response.response || 'No response generated'}
                </div>
              </div>

              {response.sources && response.sources.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Sources:</h4>
                  <div className="flex flex-wrap gap-2">
                    {response.sources.map((source, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Agent Status */}
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <h4 className="font-medium text-gray-700 mb-2">🤖 Agent Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>RAG System: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Doubt Solver: Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Teacher Assistant: Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}