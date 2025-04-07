import { useState, useEffect, memo, useRef } from "react";

const AnimatedCounter = memo(
  ({
    value,
    duration = 2,
    className = "",
    formatter = (val) => val.toLocaleString(),
    delay = 0,
  }) => {
    const [counter, setCounter] = useState(0);
    const previousValueRef = useRef(0);
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        setCounter(value);
        previousValueRef.current = value;
        isFirstRender.current = false;
        return;
      }

      if (value === previousValueRef.current) {
        return;
      }

      // Animate from previous value to new value
      const startValue = previousValueRef.current;
      const endValue = value;
      const difference = endValue - startValue;

      if (difference === 0) return;

      const steps = Math.abs(difference);
      const incrementValue = difference / steps;
      const incrementTime = (duration * 1000) / steps;

      const delayTimer = setTimeout(() => {
        let current = startValue;

        setCounter(current);

        const timer = setInterval(() => {
          current += incrementValue;

          if (
            (incrementValue > 0 && current >= endValue) ||
            (incrementValue < 0 && current <= endValue)
          ) {
            clearInterval(timer);
            setCounter(endValue);
            previousValueRef.current = endValue;
          } else {
            setCounter(current);
          }
        }, incrementTime);

        return () => clearInterval(timer);
      }, delay * 1000);

      return () => clearTimeout(delayTimer);
    }, [value, duration, delay]);

    return <span className={className}>{formatter(Math.round(counter))}</span>;
  }
);

export default AnimatedCounter;
