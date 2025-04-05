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
    const previousValueRef = useRef(null);

    useEffect(() => {
      if (value <= 0) return;

      const sessionKey = "counter-session-initialized";
      const isFirstLoad = !sessionStorage.getItem(sessionKey);

      const counterKey = `counter-value-${value}`;
      const storedValue = parseInt(
        sessionStorage.getItem(counterKey) || "0",
        10
      );

      if (isFirstLoad || value !== storedValue) {
        const startValue = isFirstLoad ? 0 : storedValue;

        const delayMs = delay * 1000;
        const delayTimer = setTimeout(() => {
          const end = Math.floor(value);
          const steps = Math.max(1, end - startValue);
          const incrementTime = (duration * 1000) / steps;
          let current = startValue;

          setCounter(current);

          const timer = setInterval(() => {
            current += 1;
            setCounter(current);
            if (current >= end) {
              clearInterval(timer);
              sessionStorage.setItem(counterKey, String(value));
              if (isFirstLoad) {
                sessionStorage.setItem(sessionKey, "true");
              }
            }
          }, incrementTime);

          return () => clearInterval(timer);
        }, delayMs);

        return () => clearTimeout(delayTimer);
      } else {
        setCounter(value);
      }

      previousValueRef.current = value;
    }, [value, duration, delay]);

    return <span className={className}>{formatter(counter)}</span>;
  }
);

export default AnimatedCounter;
