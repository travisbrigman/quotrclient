import { useContext, useEffect, useMemo } from "react";
import { CatalogContext } from "./CatalogProvider";
import { Styles } from "./StylesRT";
import { TableModule } from "./TableRT"

export const PartsCatalogRT = () => {

  const { getItems, items } = useContext(CatalogContext)
  useEffect(() => {
    getItems();
  }, []);

  const data = useMemo(() => items,
    [items]
  );

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
        Header: "manufacturer",
        accessor: "make"
      },
      {
        Header: "model",
        accessor: "model"
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