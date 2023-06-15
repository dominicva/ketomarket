export function debounce<T extends any[]>(
  fn: (...args: T) => void,
  delay: number
) {
  let timerId: NodeJS.Timeout;
  return function (...args: T) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
