import { useContext, useEffect, useState } from "react";
import {
  useTable,
  useExpanded,
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
} from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { CatalogContext } from "./CatalogProvider.js";
import { ProposalContext } from "../Proposals/ProposalProvider.js";
import { DefaultColumnFilter, Filter } from "./FiltersRT";
import { QuantityPopup } from "./QuantityPopup";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { Pagination } from "./Pagination";
import { Box } from "grommet";
import { Ascend, Descend } from "grommet-icons";

export const TableModule = ({
  columns: userColumns,
  data,
  viewQuantityPopup,
  setViewQuantityPopup,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) => {
  const { addItemToProposal, setChecked, checked, } = useContext(
    CatalogContext
  );

  const { singleProposal } = useContext(ProposalContext);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns: userColumns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
      getSubRows: (row) => row.accessories?.map((a) => a.accessory) || [],
      autoResetPage: false,
      autoResetExpanded: false,
      autoResetGroupBy: false,
      autoResetSelectedRows: false,
      autoResetSortBy: false,
      autoResetFilters: false,
      autoResetRowState: false,
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  //this watches for changes to the table and fetches new data if the pageSize, page, or data changes
  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  //gets the quantity from the quantity popup
  const [quant, setQuant] = useState(0);

  //little function to create sorting caret symbols
  const generateSortingIndicator = (column) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <Descend />
      ) : (
        <Ascend />
      )
    ) : (
      ""
    );
  };

  //this gets the array of checked item ids
  const checkedItems = selectedFlatRows.map((d) => {
    return d.original.id;
  });

  //watches if an item has been checked. if so, updates the checked state variable with whatever is checkedItems
  useEffect(() => {
    setChecked(checkedItems);
  }, [selectedRowIds]);

  //this takes the quant state variable, and the checked array and multiplies everything in the array then sorts it
  const quantityMultiplier = (array, quantity) => {
    var newArray = [];
    for (let iteration = 0; iteration < quantity; iteration++) {
      array.map((item) => newArray.push(item));
    }
    newArray.sort(function (a, b) {
      return a - b;
    });
    return newArray;
  };

  let checkedWithQuantity = quantityMultiplier(checked, quant);

  //Iterate through the above created array and post to proposalItem table
  const approvedChecked = () => {
    checkedWithQuantity.forEach((selectedItems) => {
      addItemToProposal({
        item_id: selectedItems,
        proposal_id: singleProposal.id,
      })
    });
    toggleAllRowsSelected(false);
  };
  return (
    <>
      <QuantityPopup
        viewQuantityPopup={viewQuantityPopup}
        setViewQuantityPopup={setViewQuantityPopup}
        quant={quant}
        setQuant={setQuant}
        approvedChecked={approvedChecked}
      />
      <Box direction="column" align="center">
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    <Box {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </Box>
                    <Filter column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            <TableRow>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <TableCell colSpan="10000">Loading...</TableCell>
            ) : (
              <TableCell colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </TableCell>
            )}
          </TableRow>
          </TableBody>
        </MaUTable>
        <br />

        <Pagination
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </Box>
    </>
  );
};

