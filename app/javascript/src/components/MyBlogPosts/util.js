const normalizeSelectValueToArray = value => {
  if (!value) return [];

  return Array.isArray(value) ? value : [value];
};

const buildFilterSignature = (filters = {}) =>
  JSON.stringify({
    title: (filters.title ?? "").toString().trim(),
    status: filters.status?.value ?? null,
    categories: (filters.categories ?? [])
      .map(category => category.value)
      .filter(Boolean)
      .sort(),
  });

export { buildFilterSignature, normalizeSelectValueToArray };
