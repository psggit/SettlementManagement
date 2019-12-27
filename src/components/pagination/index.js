import React from "react"
import ReactPagination from "react-js-pagination"
import "./pagination.scss"
import PropTypes from "prop-types"

function pagination (props) {

  const resetPagination = () => {
    props.setPage({
      activePage: 1,
      offset: 0
    })
  }

  const handlePageChange = (activePage) => {
    const offset = props.itemsCountPerPage * (activePage - 1)
    props.setPage({
      activePage,
      offset
    })
  }

  return (
    <ReactPagination
      activePage={props.activePage}
      itemsCountPerPage={props.itemsCountPerPage}
      totalItemsCount={props.totalItemsCount}
      pageRangeDisplayed={props.pageRangeDisplayed}
      onChange={handlePageChange}
    />
  )
}

pagination.propTypes = {
  activePage: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  totalItemsCount: PropTypes.number,
  pageRangeDisplayed: PropTypes.number,
  setPage: PropTypes.func
}

export default pagination