export const getPaginatedIds = (allIds: number[], currentPage: number, itemsPerPage: number) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return allIds.slice(startIndex, endIndex);
};
