import { useCallback, useEffect } from 'react';

enum BackgroundGradient {
  Morning = 'morning-gradient',
  Day = 'day-gradient',
  Twilight = 'twilight-gradient',
  Night = 'night-gradient',
}

/**
 * Syncs background for application depending on part of the day (morning, day, twilight, night)
 */
export const useBackground = () => {
  const handler = useCallback(() => {
    const rootElement = document.getElementById('root');

    if (!rootElement) return;

    const hours = new Date().getHours();
    let className = '';

    if (hours >= 5 && hours < 11) {
      className = BackgroundGradient.Morning;
    } else if (hours >= 11 && hours < 17) {
      className = BackgroundGradient.Day;
    } else if (hours >= 17 && hours < 21) {
      className = BackgroundGradient.Twilight;
    } else if (hours >= 21  || hours < 5) {
      className = BackgroundGradient.Night;
    }

    rootElement.classList.remove(...Object.values(BackgroundGradient));
    rootElement.classList.add(className);
  }, []);

  useEffect(() => {
    handler();
    window.addEventListener('focus', handler);

    return () => window.removeEventListener('focus', handler);
  }, []);
}
