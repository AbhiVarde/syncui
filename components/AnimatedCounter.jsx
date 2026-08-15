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
    const rafRef = useRef(null);

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

      const startValue = previousValueRef.current;
      const endValue = value;
      const difference = endValue - startValue;

      if (difference === 0) return;

      const delayTimer = setTimeout(() => {
        let startTime = null;

        const step = (timestamp) => {
          if (startTime === null) startTime = timestamp;

          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / (duration * 1000), 1);
          const current = startValue + difference * progress;

          setCounter(current);

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(step);
          } else {
            setCounter(endValue);
            previousValueRef.current = endValue;
          }
        };

        rafRef.current = requestAnimationFrame(step);
      }, delay * 1000);

      return () => {
        clearTimeout(delayTimer);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [value, duration, delay]);

    return <span className={className}>{formatter(Math.round(counter))}</span>;
  },
);

export default AnimatedCounter;
