export const getTemperatureOffsets = (min: number, max: number, currentMin: number, currentMax: number) => {
  const range = max - min;
  const percent = range / 100;

  const leftOffset = Math.round((currentMin - min) / percent);
  const rightOffset = Math.round((max - currentMax) / percent);

  return { leftOffset, rightOffset };
};
