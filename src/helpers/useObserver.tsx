import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export type ObserverPosition = "below" | "show" | "above";

export type ObserverState = {
  current: ObserverPosition;
  last: ObserverPosition;
};

type ObserverOptions = {
  amount?: number;
  once?: boolean;
};

const useObserver = <T extends Element>({ amount = 0.5, once = false }: ObserverOptions = {}): [
  RefObject<T | null>,
  state: ObserverState
] => {
  const ref = useRef<T>(null);
  const [initialized, setInitialized] = useState(false);
  const [position, setPosition] = useState<ObserverState>({ current: "below", last: "below" });

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (once && initialized) return;

      const [entry] = entries;
      if (entry.isIntersecting) {
        setPosition((pos) => ({ current: "show", last: pos.current }));
        setInitialized(true);
      } else {
        setPosition((pos) => ({ current: entry.boundingClientRect.y < 0 ? "above" : "below", last: pos.current }));
      }
    },
    [once, initialized]
  );

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(callback, {
      threshold: amount,
    });
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [amount, callback]);

  return [ref, position];
};

export default useObserver;
