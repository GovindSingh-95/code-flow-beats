
import React from 'react';

interface WaveformProps {
  isPlaying: boolean;
}

export const Waveform: React.FC<WaveformProps> = ({ isPlaying }) => {
  return (
    <div className="waveform-container w-full h-12">
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          className={`waveform-bar ${isPlaying ? "" : "pause"}`}
          style={{
            height: `${Math.max(20, Math.random() * 100)}%`,
            '--delay': `${index * 50}ms`,
            '--duration': `${600 + Math.random() * 800}ms`,
            opacity: isPlaying ? 1 : 0.4,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
