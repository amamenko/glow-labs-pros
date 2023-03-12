import { useEffect, useCallback } from "react";

const useDebounce = (effect: Function, dependencies: any[], delay: number) => {
  const callback = useCallback(effect, [...dependencies, effect]);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
};

export default useDebounce;
