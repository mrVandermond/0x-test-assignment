const enum BackgroundGradient {
  Morning = 'morning-gradient',
  Day = 'day-gradient',
  Twilight = 'twilight-gradient',
  Night = 'night-gradient',
}

/**
 * Returns gradient classname according to user local time
 */
export function getGradientClassByTime() {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) {
    return BackgroundGradient.Morning;
  } else if (hours >= 11 && hours < 17) {
    return BackgroundGradient.Day;
  } else if (hours >= 17 && hours < 21) {
    return BackgroundGradient.Twilight;
  } else if (hours >= 21  || hours < 5) {
    return BackgroundGradient.Night;
  }

  return '';
}
