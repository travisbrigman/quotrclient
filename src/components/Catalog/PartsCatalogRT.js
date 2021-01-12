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

export const PartsCatalogRT = () => {
  const {
    checked,
    createAccessory,
    setAccessoryArray,
    accessoryArray,
    setAddAccessoryState,
    addAccessoryState,
    getItemsByPage,
    data,
    pageCount,
    setAccessoryItemState,
    accessoryItemState
  } = useContext(CatalogContext);

  //state variable for modal
  const [viewQuantityPopup, setViewQuantityPopup] = useState(false);

  //this stuff helps accomplish server calls for manual table pagination
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0)

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    // This will get called when the table needs new data
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;
    const pageOffset = pageSize * pageIndex
    // Set the loading state
    setLoading(true);
    
    // Only update the data if this is the latest fetch
    if (fetchId === fetchIdRef.current) {
      getItemsByPage(pageSize, pageOffset);
      setLoading(false);
    }
  }, []);


  //TODO: Get accessories working
  /*
  click on add accessories
  select an item
  add that item to accessory object as 'item'
  clear checked state
  select an accessory
  add that item to accessory object as 'accessory'
  send POST request
  */

  const accessorizedItem = useRef(-1);
  
  useEffect(() => {
    if (addAccessoryState && setAccessoryItemState) {
      accessorizedItem.current = checked[0];
      if (accessorizedItem.current !== undefined) {

        setAccessoryItemState(false)
      }
    }
    if (addAccessoryState && !accessoryItemState) {
      // toggleAllRowsSelected(false)
      setAccessoryArray(checked);
    }
  }, [addAccessoryState, checked, accessoryItemState]);

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

  //🏛🏛 Column Setup 🏛🏛
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
