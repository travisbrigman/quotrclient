import { useContext, useState } from "react";
import {
  useTable,
  useExpanded,
  useFilters,
  usePagination,
  useRowSelect,
  useSortBy,
} from "react-table";
import { CatalogContext } from "./CatalogProvider.js";
import { ProposalContext } from "../Proposals/ProposalProvider.js";
import { DefaultColumnFilter, Filter } from "./FiltersRT";
import { QuantityPopup } from "./QuantityPopup";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { Pagination } from "./Pagination";

export const TableModule = ({ columns: userColumns, data, viewQuantityPopup, setViewQuantityPopup, addAccessoryState, setAddAccessoryState }) => {
  const { addItemToProposal, status, setChecked, checked } = useContext(
    CatalogContext
  );

  const { singleProposal } = useContext(ProposalContext);
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
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, expanded, selectedRowIds },
  } = useTable(
    {
      columns: userColumns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
      getSubRows: (row) => row.accessories?.map((a) => a.accessory) || [],
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

  const [quant, setQuant] = useState(0);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };
  
  const checkedItems = selectedFlatRows.map((d) => {
    return d.original.id;
  });
  
  // setChecked([])
  console.log(checked);
  
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

  let checkedWithQuantity = quantityMultiplier(checkedItems, quant);

  const approvedChecked = () => {
    checkedWithQuantity.forEach((selectedItems) => {
      addItemToProposal({
        item_id: selectedItems,
        proposal_id: singleProposal.id,
      }).then(console.log(status));

    });
    toggleAllRowsSelected(false)
  };

    /*
  click on add accessories
  select an item
  add that item to accessory object as 'item'
  clear checked state
  select an accessory
  add that item to accessory object as 'accessory'
  send POST request
  */
 

 const [accessoryObject, setAccessoryObject] = useState({
   item: -1,
   accessory: -1,
 });

 if (
   addAccessoryState &&
   checkedItems.length === 1 &&
   accessoryObject.item === -1
 ) {
   setAccessoryObject({ item: checkedItems[0] });
   toggleAllRowsSelected(false)
 } else if (addAccessoryState && accessoryObject.item !== -1) {
   setAccessoryObject({...accessoryObject, accessory: checkedItems[0] })
   setAddAccessoryState(false);
 }

console.log(accessoryObject);

  return (
    <>
      <QuantityPopup
        viewQuantityPopup={viewQuantityPopup}
        setViewQuantityPopup={setViewQuantityPopup}
        quant={quant}
        setQuant={setQuant}
        approvedChecked={approvedChecked}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
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
        <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds,
                "selectedFlatRows[].original": selectedFlatRows.map(
                  (d) => d.original
                ),
              },
              null,
              2
            )}
          </code>
        </pre>
      </pre>
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
    </>
  );
};
