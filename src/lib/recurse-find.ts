export const recurseFind =
  <A>(key: keyof A, predicate: (item: A) => boolean) =>
  (items: A[]): A | undefined => {
    let foundItem: A | undefined = undefined
    items.forEach((item) => {
      if (predicate(item)) {
        foundItem = item
      }

      if (!foundItem && Array.isArray(item[key])) {
        foundItem = recurseFind<A>(key, predicate)(item[key])
      }
    })

    return foundItem
  }
