import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Button, Heading, Text } from "grommet";
import { Compliance, Down, Next } from "grommet-icons";
import { CatalogContext } from "./CatalogProvider";
import { TableModule } from "./TableRT";

export const PartsCatalogRT = (props) => {
  const {
    getItems,
    items,
    checked,
    setChecked,
    createAccessory,
    setAccessoryArray,
    accessoryArray,
    setAddAccessoryState,
    addAccessoryState,
    getItemsByPage,
  } = useContext(CatalogContext);

  const [viewQuantityPopup, setViewQuantityPopup] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    getItemsByPage(pageSize, pageIndex);
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex;
      const endRow = startRow + pageSize;
      setData(items.results);

      // Your server could send back total page count.
      // setPageCount(Math.ceil(callData.results.length / pageSize))

      setLoading(false);
    }
  }, []);

  /*
  click on add accessories
  select an item
  add that item to accessory object as 'item'
  clear checked state
  select an accessory
  add that item to accessory object as 'accessory'
  send POST request
  */

  // const [accessorizedItem, setAccessorizedItem] = useState(0)

  const accessorizedItem = useRef();
  useEffect(() => {
    if (addAccessoryState) {
      //  setAccessorizedItem(checked[0])
      accessorizedItem.current = checked[0];
    }
    if (addAccessoryState && accessorizedItem !== 0) {
      setAccessoryArray(checked);
    }
  }, [addAccessoryState, checked]);

  //get the array of catalog items from the database
  // useEffect(() => {
  //   getItems();
  // }, []);

  //put the items in a useMemo as "required" by React-Table 7
  // const data = useMemo(() => items, [items]);

  //little helper function to convert ISO 8601 to MM/DD/YYYY
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const dateChanger = (dateString) => {
    let parsedDate = Date.parse(dateString);
    return dateTimeFormat.format(parsedDate);
  };

  //little helper function that takes a number and formats for USD $
  const amountFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  //build our columns for the Data Table
  const columns = useMemo(
    () => [
      {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? <Down /> : <Next />}
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
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? <Down /> : <Next />}
            </span>
          ) : null,
      },
      {
        Header: "Manufacturer",
        accessor: "make",
      },
      {
        Header: "Part #",
        accessor: "model",
      },
      {
        Header: "Dealer Cost",
        accessor: (values) => {
          return amountFormatter.format(values.cost);
        },
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Date Created",
        accessor: (values) => {
          return dateChanger(values.created_on);
        },
      },
    ],
    []
  );

  const makeAccessories = () => {
    accessoryArray.forEach((acc) => {
      const accessoryItem = {
        item: accessorizedItem.current,
        accessory: acc,
      };
      createAccessory(accessoryItem);
    });
    setAddAccessoryState(false);
  };

  return (
    <>
      {addAccessoryState && (
        <Box>
          <Heading>Add Accessories</Heading>
          <Button
            label="make accessories"
            onClick={() => {
              makeAccessories();
            }}
          />
        </Box>
      )}
      {accessorizedItem !== 0 && addAccessoryState && (
        <Box>
          <Text>Select an Item to add an accessory to</Text>
        </Box>
      )}
      {addAccessoryState && accessorizedItem > 0 && (
        <Text>Select Accessories</Text>
      )}

      <Box width="small">
        <Button
          primary
          label="Add to Proposal"
          icon={<Compliance />}
          onClick={() => {
            setViewQuantityPopup(true);
          }}
          margin="small"
        />
      </Box>
      <TableModule
        columns={columns}
        data={data}
        viewQuantityPopup={viewQuantityPopup}
        setViewQuantityPopup={setViewQuantityPopup}
        loading={loading}
        pageCount={pageCount}
        fetchData={fetchData}
      />
    </>
  );
};
