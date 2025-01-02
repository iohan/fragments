export const recurseDelete =
  <T>(key: keyof T, predicate: (item: T) => boolean) =>
  (items: T[]): T[] => {
    const filtered = items.filter((item) => !predicate(item))

    return filtered.map((item) => {
      if (Array.isArray(item[key])) {
        return {
          ...item,
          [key]: recurseDelete(key, predicate)(item[key]),
        }
      }
      return item
    })
  }
