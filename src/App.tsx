import React, { useState } from 'react';
import { ResumeUploader } from './components/ResumeUploader';
import { AnalysisResults } from './components/AnalysisResults';
import { ChatInterface } from './components/ChatInterface';
import { LoadingState } from './components/LoadingState';
import { analyzeResume, getChatResponse } from './services/openai';
import { extractTextFromFile } from './utils/textExtractor';
import type { ResumeAnalysis, ChatMessage } from './types';
import { FileText, ArrowLeft } from 'lucide-react';

function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI resume assistant. Upload your resume, and I\'ll help you analyze it and answer any questions you have.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    
    try {
      const text = await extractTextFromFile(file);
      const result = await analyzeResume(text);
      
      setAnalysis(result);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: `I've analyzed your resume "${file.name}". Feel free to ask me any questions about the analysis!`,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Sorry, there was an error analyzing your resume. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    }]);

    try {
      const response = await getChatResponse(message, analysis);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      }]);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setMessages([{
      id: '1',
      content: 'Hello! I\'m your AI resume assistant. Upload your resume, and I\'ll help you analyze it and answer any questions you have.',
      sender: 'bot',
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Resume Analyzer</h1>
            </div>
            {analysis && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Analyze Another Resume
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {isLoading && <LoadingState />}
          
          {!isLoading && !analysis && <ResumeUploader onUpload={handleUpload} />}
          
          {!isLoading && analysis && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AnalysisResults analysis={analysis} />
              </div>
              <div className="lg:col-span-1">
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;