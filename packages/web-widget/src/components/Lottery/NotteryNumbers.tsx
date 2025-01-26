import React from 'react';
import classes from './NotteryNumbers.module.scss';

interface NotteryNumbersProps {
  digits: string; // Строка цифр, например "667970"
  secondary?: boolean; // Вторичный стиль (серый)
  className?: string;
  matched?: number;
}

const NotteryNumbers: React.FC<NotteryNumbersProps> = ({ digits, className = '', secondary, matched = 0 }) => {
  // Для каждой позиции будет свой класс ballPos0, ballPos1, ...
  // Если цифр больше 6, можно либо обрезать, либо повторять цвета циклично.
  // Ниже — код с обрезкой до 6, как на картинке.

  const limitedDigits = digits.slice(0, 6).split(''); // максимум 6 символов

  return (
    <div className={`${classes.numbersContainer} ${secondary ? classes.numbersSecondary : ''} ${className}`}>
      {limitedDigits.map((char, index) => {
        // index — это позиция (0..5), которая определяет цвет шара
        const ballPosClass = `ballPos${index}`; // например "ballPos0"
        return (
          <div
            key={index}
            className={`${classes.lotteryBall} ${classes[ballPosClass]} ${matched > index ? classes.matched : ''}`}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
};

export default NotteryNumbers;
