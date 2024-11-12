import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Analyzing Your Resume
      </h3>
      <p className="text-gray-600">
        Our AI is processing your document and extracting insights...
      </p>
    </div>
  );
}