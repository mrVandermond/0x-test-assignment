/**
 * Calculates left and right offsets for current day in comparison to the range of the whole period
 * left offset >= 0 and right offset >= 0
 * @param min - minimal temperature across all period
 * @param max - maximum temperature across all period
 * @param currentMin - minimum temperature for current day
 * @param currentMax - maximum temperature for current day
 */
export const getTemperatureOffsets = (min: number, max: number, currentMin: number, currentMax: number) => {
  const range = max - min;
  const percent = range / 100;

  const leftOffset = Math.round((currentMin - min) / percent);
  const rightOffset = Math.round((max - currentMax) / percent);

  return { leftOffset, rightOffset };
};
