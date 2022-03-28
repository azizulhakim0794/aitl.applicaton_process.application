import React from 'react';

const Loading = () => {
  return <div className="notFound">
    <div className="spinner-border text-dark" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
};

export default Loading;