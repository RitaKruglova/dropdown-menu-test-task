/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom';

type TIntersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void;

class IntersectionObserver {
  callback: TIntersectionObserverCallback;
  constructor(callback: TIntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(element: Element) {
    this.callback([{ isIntersecting: true, target: element } as IntersectionObserverEntry], this);
  }

  unobserve() {}

  disconnect() {}
}

(window as any).IntersectionObserver = IntersectionObserver;
