import { useSearchParams } from 'react-router';

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentPage = (() => {
    const page = Number(searchParams.get('page')) || 1;
    return page > totalPages ? 1 : page;
  })();

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return { currentPage, totalPages, goToPage };
};
