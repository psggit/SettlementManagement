import React from "react"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import "./table.scss"

function TableLoadingShell() {
  return (
    <TableRow className="table-loading-shell">
      {
        [1, 2, 3, 4, 5, 6].map((i) => (
          <TableCell key={i} align="left"></TableCell>
        ))
      }
    </TableRow>
  )
}

export default TableLoadingShell
