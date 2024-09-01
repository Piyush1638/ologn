import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center w-full h-full">
    <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"></div>
  </div>
);

export default Loader;
