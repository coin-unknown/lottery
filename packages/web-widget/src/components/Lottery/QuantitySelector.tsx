import React, { useState } from 'react';
import classes from './QuantitySelector.module.scss';

interface QuantitySelectorProps {
  initialValue?: number; // Начальное значение (по умолчанию 1)
  onChange?: (newValue: number) => void; // Коллбек, если нужно обрабатывать внешне
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ initialValue = 1, onChange, className = '' }) => {
  const [quantity, setQuantity] = useState(initialValue);

  // Уменьшаем, но не ниже 1
  const handleDecrement = () => {
    setQuantity((prev) => {
      const newValue = prev > 1 ? prev - 1 : 1;
      onChange?.(newValue);
      return newValue;
    });
  };

  // Увеличиваем
  const handleIncrement = () => {
    setQuantity((prev) => {
      const newValue = prev + 1;
      onChange?.(newValue);
      return newValue;
    });
  };

  return (
    <div className={`${classes.quantityContainer} ${className}`}>
      <div className={classes.button} onClick={handleDecrement}>
        -
      </div>

      <div className={classes.value}>{quantity}</div>

      <div className={classes.button} onClick={handleIncrement}>
        +
      </div>
    </div>
  );
};

export default QuantitySelector;
