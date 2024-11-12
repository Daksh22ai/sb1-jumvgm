import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface Props {
  onUpload: (file: File) => void;
}

export function ResumeUploader({ onUpload }: Props) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  }, [onUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div 
      className="w-full max-w-2xl mx-auto p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="text-center">
        <Upload className="w-12 h-12 mx-auto text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Upload Your Resume
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop your resume here or click to browse
        </p>
        <label className="inline-block">
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
          />
          <span className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            Browse Files
          </span>
        </label>
        <p className="mt-2 text-sm text-gray-500">
          Supported formats: PDF, DOC, DOCX
        </p>
      </div>
    </div>
  );
}