export const recurseMap =
  <T>(key: keyof T, predicate: (item: T) => T | undefined) =>
  (items: T[]): T[] => {
    return items.map((item) => {
      const updatedItem = predicate(item)

      if (updatedItem) {
        item = updatedItem
      }

      if (Array.isArray(item[key])) {
        item = { ...item, [key]: recurseMap<T>(key, predicate)(item[key]) }
      }

      return item
    })
  }
