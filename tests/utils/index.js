// utils.js
export const flushPromise = () => {
  return new Promise(resolve => setTimeout(() => resolve(), 0));
};
