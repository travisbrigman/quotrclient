import { useContext, useEffect, useMemo } from "react";
import { CatalogContext } from "./CatalogProvider";
import { Styles } from "./StylesRT";
import { TableModule } from "./TableRT"

export const PartsCatalogRT = () => {

  const { getItems, items } = useContext(CatalogContext)

  //get the array of catalog items from the database
  useEffect(() => {
    getItems();
  }, []);

  //put the items in a useMemo as "required" by React-Table 7
  const data = useMemo(() => items,
    [items]
  );

  //little helper function to convert ISO 8601 to MM/DD/YYYY
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  
  const dateChanger = (dateString) => {
    let parsedDate = Date.parse(dateString)
    return dateTimeFormat.format(parsedDate)
  
  }
  
  //little helper function that takes a number and formats for USD $
  const amountFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

  //build our columns for the Data Table
  const columns = useMemo(
    () => [
      {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? "👇" : "👉"}
          </span>
        ),
        Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 2}rem`
                }
              })}
            >
              {row.isExpanded ? "👇" : "👉"}
            </span>
          ) : null
      },
      {
        Header: "Manufacturer",
        accessor: "make"
      },
      {
        Header: "Part #",
        accessor: "model"
      },
      {
        Header: "Dealer Cost",
        accessor: (values)=>{ return amountFormatter.format(values.cost)}
      },
      {
        Header: "Description",
        accessor: "description"
      },
      {
        Header: "Date Created",
        accessor: (values)=>{ return dateChanger(values.created_on)}
      }
    ],
    []
  );

  return (
    <Styles>
    <TableModule columns={columns} data={data} />
  </Styles>
  )

}