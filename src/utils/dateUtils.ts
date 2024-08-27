export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
}

// Additional utility functions that might be useful:

export function formatTime(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return date.toLocaleTimeString('en-US', options);
}

export function formatDateShort(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return isSameDay(date, today);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

export function getDayOfWeek(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
  return date.toLocaleDateString('en-US', options);
}

export function isMidday(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return Math.abs(12 - (hours + minutes / 60));
}

export function groupForecastsByDay(forecasts: any[]): any[][] {
  const grouped: any[][] = [];
  let currentDay: Date | null = null;
  let currentGroup: any[] = [];

  forecasts.forEach(forecast => {
    const forecastDate = new Date(forecast.dt * 1000);
    if (!currentDay || !isSameDay(currentDay, forecastDate)) {
      if (currentGroup.length > 0) {
        grouped.push(currentGroup);
      }
      currentDay = forecastDate;
      currentGroup = [forecast];
    } else {
      currentGroup.push(forecast);
    }
  });

  if (currentGroup.length > 0) {
    grouped.push(currentGroup);
  }

  return grouped;
}
