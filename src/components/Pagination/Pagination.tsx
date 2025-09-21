import classNames from 'classnames/bind';
import theme from './pagination.module.scss';
import { Button } from '../Button/Button';

const cx = classNames.bind(theme);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <>
      <section className={cx('pagination')}>
        {/* If we are on page 3 or higher, a button to go to the first page appears */}
        {currentPage >= 3 && (
          <Button onClick={() => onPageChange(1)} name={`Page ${currentPage - 1}`}>
            First
          </Button>
        )}

        {/* If not on the first page, create a button that will dynamically take you to the previous page */}
        {currentPage !== 1 && (
          <Button onClick={() => onPageChange(currentPage - 1)} name={`Page ${currentPage - 1}`}>
            {currentPage - 1}
          </Button>
        )}

        {/* Current page button */}
        <Button onClick={() => {}} name={`Page ${currentPage}`} toggle={currentPage === currentPage}>
          {currentPage}
        </Button>

        {/* If not on the lastPage, create a button to go to the next page. */}
        {currentPage !== totalPages && (
          <Button onClick={() => onPageChange(currentPage + 1)} name={`Page ${currentPage + 1}`}>
            {currentPage + 1}
          </Button>
        )}

        {/* If on a page before the page previous to the last one, create a button to go to the last page. */}
        {currentPage < totalPages - 1 && (
          <Button onClick={() => onPageChange(totalPages)} name={`Page ${currentPage - 1}`}>
            Last
          </Button>
        )}
      </section>
    </>
  );
};
