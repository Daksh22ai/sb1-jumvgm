import React from 'react';
import { Award, BookOpen, Briefcase, BarChart, CheckCircle, XCircle } from 'lucide-react';
import type { ResumeAnalysis } from '../types';

interface Props {
  analysis: ResumeAnalysis;
}

export function AnalysisResults({ analysis }: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Score Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Resume Score</h2>
          <BarChart className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-600 transition-all duration-1000"
                strokeWidth="8"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * analysis.score) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">
                {analysis.score}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Skills Analysis</h2>
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${skill.level === 'expert' ? 'bg-green-100 text-green-800' :
                  skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'}`}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Career Paths Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recommended Career Paths</h2>
          <Briefcase className="w-6 h-6 text-blue-600" />
        </div>
        <div className="space-y-4">
          {analysis.careerPaths.map((path) => (
            <div
              key={path.title}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{path.title}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {path.matchScore}% Match
                </span>
              </div>
              <p className="text-gray-600 mb-3">{path.description}</p>
              <div className="flex flex-wrap gap-2">
                {path.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Improvement Suggestions</h2>
          <Award className="w-6 h-6 text-blue-600" />
        </div>
        <div className="space-y-3">
          {analysis.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              {suggestion.startsWith('Missing') ? (
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              )}
              <p className="text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}