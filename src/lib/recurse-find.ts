export const recurseFind =
  <A>(key: keyof A, predicate: (item: A, parent?: A) => A | undefined) =>
  (items: A[], parent?: A): A | undefined => {
    let foundItem: A | undefined = undefined
    for (const item of items) {
      const result = predicate(item, parent)
      if (result) {
        foundItem = result
        break
      }

      if (Array.isArray(item[key])) {
        foundItem = recurseFind<A>(key, predicate)(item[key], item)
        if (foundItem) {
          break
        }
      }
    }

    return foundItem
  }
