import React from 'react';

function Loader() {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary'>
      <div className='flex gap-5 text-6xl font-semibold'>
        <h1 className='text-secondary animate-fade delay-0'>Y</h1>
        <h1 className='text-white animate-fade delay-300'>S</h1>
        <h1 className='text-third animate-fade delay-600'>F</h1>
      </div>
    </div>
  );
}

export default Loader;
