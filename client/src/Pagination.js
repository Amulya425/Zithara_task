import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button key={i} onClick={() => onPageChange(i)} disabled={i === currentPage}>
        {i}
      </button>
    );
  }

  return <div className="pagination">{pages}</div>;
}

export default Pagination;
