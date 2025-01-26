import React, { useEffect, useState, useCallback } from 'react';
import classes from './TimerCountDown.module.css';

interface ITimerCountDownProps {
  initTimeInMs: number;
  icon?: boolean;
  onEndCountDown?: () => void;
  className?: string;
}

export const TimerCountDown: React.FC<ITimerCountDownProps> = ({ initTimeInMs, onEndCountDown, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState(initTimeInMs);
  const [hasEnded, setHasEnded] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [timeLeft]);

  useEffect(() => {
    const { days, hours, minutes, seconds } = calculateTimeLeft();
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0 && onEndCountDown && !hasEnded) {
      onEndCountDown();
      setHasEnded(true);
    }
  }, [timeLeft, calculateTimeLeft, onEndCountDown, hasEnded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { days, hours, minutes, seconds } = calculateTimeLeft();

  return (
    <div className={`${classes.time} ${className}`}>
      {days > 0 && (
        <span className={classes.timeSegment}>
          {days}
          <span className={classes.superscript}>d</span>{' '}
        </span>
      )}
      <span className={classes.timeSegment}>
        {hours.toString().padStart(2, '0')}
        <span className={classes.superscript}>h</span>{' '}
      </span>
      <span className={classes.timeSegment}>
        {minutes.toString().padStart(2, '0')}
        <span className={classes.superscript}>m</span>{' '}
      </span>
      <span className={classes.timeSegment}>
        {seconds.toString().padStart(2, '0')}
        <span className={classes.superscript}>s</span>
      </span>
    </div>
  );
};
