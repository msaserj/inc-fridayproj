import {DOTS, usePagination} from "./UsePagination";
import css from "./Paginator.module.css"


type PaginationPropsType = {
    totalCount: number
    siblingCount: number
    currentPage: number
    pageSize: number
    onPageChange: (page: number) => void
}

export const Paginator: React.FC<PaginationPropsType> = (
    {
        onPageChange,
        totalCount,
        siblingCount = 10,
        currentPage,
        pageSize,
    }
) => {

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className={css.paginationContainer}>
      <span className={css.paginationBlock}>
        <span onClick={onPrevious}
              className={currentPage === 1 ? css.disabled : css.paginationItem}
        >
          <div className={`${css.arrow} ${css.left}`}/>
        </span>

          {paginationRange.map((pageNumber, index) => {
              if (pageNumber === DOTS) {
                  return <span key={`${index}-${pageNumber}`} className={css.dots}>&#8230;</span>;
              }
              return (
                  <span key={`${index}-${pageNumber}`}
                        className={pageNumber === currentPage ? css.selected : css.paginationItem}
                        onClick={() => onPageChange(pageNumber)}
                  >
              {pageNumber}
            </span>
              );
          })}
          <span
              className={currentPage === lastPage ? css.disabled : css.paginationItem}
              onClick={onNext}
          >
          <div className={`${css.arrow} ${css.right}`}/>
        </span>
      </span>
        </div>
    );
};
