export const debounce = (func, delay) => {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId); // Отменяем предыдущий таймер, если он был установлен
    }
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};