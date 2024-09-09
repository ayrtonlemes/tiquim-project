type WithCreatedAt = { createdAt: string | Date };

export const sortByDateDesc = <T extends WithCreatedAt>(data: T[]): T[] => {
  const sortedData = data?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return sortedData;
};
