import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = React.memo(function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
});

export default LoadingSpinner;
