import React, { useEffect, useRef, useState } from 'react';
import neonVideo from './neon.mp4';
import soundEffect from './sound.wav';

const EntryVideoWithText = ({ onVideoEnd }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    console.log('EntryVideoWithText mounted');
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      // Show text and play sound at approx the bulb blast time (e.g., 3 seconds)
      if (video.currentTime >= 3 && !showText) {
        setShowText(true);
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [showText]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      <video
        ref={videoRef}
        src={neonVideo}
        autoPlay
        // removed muted to enable sound
        onEnded={onVideoEnd}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <audio ref={audioRef} src={soundEffect} />
      {showText && (
        <div style={{
          position: 'absolute',
          color: '#39ff14',
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px #39ff14, 0 0 20px #39ff14',
          pointerEvents: 'none',
          userSelect: 'none',
          textAlign: 'center',
          width: '100%',
          top: '40%',
        }}>
          Welcome to Eenavis, a brand new game world
        </div>
      )}
    </div>
  );
};

export default EntryVideoWithText;
