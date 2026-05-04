export const formatTime = (ms: number): string => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
