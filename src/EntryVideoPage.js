import React from 'react';
import { useNavigate } from 'react-router-dom';
import EntryVideoWithText from './EntryVideoWithText';

const EntryVideoPage = () => {
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    navigate('/home');
  };

  return <EntryVideoWithText onVideoEnd={handleVideoEnd} />;
};

export default EntryVideoPage;
