import { useTable, useExpanded, useFilters, usePagination, useSortBy } from "react-table";
import { Table, Row, Col, Button, Input, CustomInput } from "reactstrap"
import { DefaultColumnFilter, Filter } from "./FiltersRT";

export const TableModule = ({ columns: userColumns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      // rows,
      page,
      prepareRow,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize,expanded }
      // state: { expanded }
    } = useTable(
      {
        columns: userColumns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: 10 },
        getSubRows: (row) => row.accessories?.map((a) => a.accessory) || []
      },
      useFilters,
      useSortBy,
      useExpanded,
      usePagination
    );
  
    const generateSortingIndicator = (column) => {
      return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
    };

    const onChangeInSelect = event => {
      setPageSize(Number(event.target.value))
    }
    
    const onChangeInInput = event => {
      const page = event.target.value ? Number(event.target.value) - 1 : 0
      gotoPage(page)
    }
  
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  //   {column.render("Header")}
                  //   {generateSortingIndicator(column)}
                  // </th>
                  <th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <pre>
          <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
        </pre>
        <Row style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
    <Col md={3}>
      <Button
        color="primary"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </Button>
      <Button
        color="primary"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        {"<"}
      </Button>
    </Col>
    <Col md={2} style={{ marginTop: 7 }}>
      Page{" "}
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>
    </Col>
    <Col md={2}>
      <Input
        type="number"
        min={1}
        style={{ width: 70 }}
        max={pageOptions.length}
        defaultValue={pageIndex + 1}
        onChange={onChangeInInput}
      />
    </Col>
    <Col md={2}>
      <CustomInput type="select" value={pageSize} onChange={onChangeInSelect}>
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </CustomInput>
    </Col>
    <Col md={3}>
      <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
        {">"}
      </Button>
      <Button
        color="primary"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {">>"}
      </Button>
    </Col>
  </Row>
      </>
    );
  }