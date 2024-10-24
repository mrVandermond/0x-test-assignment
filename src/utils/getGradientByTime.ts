const gradientsMap = {
  morning: 'linear-gradient(to bottom, #81C5E6, #DC927F)',
  day: 'linear-gradient(to bottom, #4982AD, rgba(144, 187, 216, 0.5))',
  twilight: 'linear-gradient(to bottom, #6F6D8C, rgba(188, 97, 90, 0.5))',
  night: 'linear-gradient(to bottom, #011E33, rgba(61, 53, 81, 0.8))',
}

export function getGradientByTime() {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) {
    return gradientsMap.morning;
  } else if (hours >= 11 && hours < 17) {
    return gradientsMap.day;
  } else if (hours >= 17 && hours < 21) {
    return gradientsMap.twilight;
  } else if (hours >= 21  || hours < 5) {
    return gradientsMap.night;
  }

  return '';
}
