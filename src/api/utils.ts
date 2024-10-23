function formatObjectKeysPascalToCamel(data: Record<string, unknown>) {
  return Object.keys(data).reduce((acc, key) => {
    const camelCaseKey = key[0].toLocaleLowerCase() + key.slice(1);

    acc[camelCaseKey] = data[key];

    return acc;
  }, {} as Record<string, unknown>);
}

export function weatherResponseFormatter(data: unknown): unknown {
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    return formatObjectKeysPascalToCamel(data as Record<string, unknown>);
  }

  if (Array.isArray(data)) {
    return data.map(item => weatherResponseFormatter(item));
  }

  return data;
}
