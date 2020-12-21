import { Box, Button, CheckBox, DataTable, Heading } from "grommet";
import { Compliance } from "grommet-icons";
import { useContext, useEffect } from "react";
import { CatalogContext } from "./CatalogProvider.js";
import { columns } from "./CatalogColumns.js";
import { ProposalContext } from "../Proposals/ProposalProvider.js";

const controlledColumns = columns.map((col) => ({ ...col }));

export const PartsCatalog = (props) => {
  const {
    getItems,
    items,
    addItemToProposal,
    checked,
    setChecked,
    status,
    setStatus
  } = useContext(CatalogContext);
  const { singleProposal } = useContext(ProposalContext);

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter((item) => item !== value));
    }
  };

  const onCheckAll = (event) =>
    setChecked(event.target.checked ? items.map((datum) => datum.id) : []);

  useEffect(() => {
    getItems();
  }, []);

  let itemsApproved = 0
  
  
  const approvedChecked = () => {
      checked.forEach((selectedItems) => {
          addItemToProposal({
              item_id: selectedItems,
              proposal_id: singleProposal.id,
            })
            itemsApproved++
            // .then(setStatus(false))
        }
        )
        setChecked([]);
    };
    
    console.log(itemsApproved);
  return (
    <Box pad="large">
      <Box direction="column" pad="small">

        <DataTable
          columns={[
            {
              property: "checkbox",
              render: (datum) => (
                <CheckBox
                  key={datum.id}
                  checked={checked.indexOf(datum.id) !== -1}
                  onChange={(e) => onCheck(e, datum.id)}
                />
              ),
              header: (
                <CheckBox
                  checked={checked.length === items.length}
                  indeterminate={
                    checked.length > 0 && checked.length < items.length
                  }
                  onChange={onCheckAll}
                />
              ),
              sortable: false,
            },
            ...controlledColumns,
          ].map((col) => ({ ...col }))}
          data={items}
          sortable
          size="small"
        />
        <Button
          primary
          label="Add to Proposal"
          icon={<Compliance />}
          onClick={() => {
            approvedChecked();
          }}
          margin="small"
        />
      </Box>
    </Box>
  );
};

{
  /* <Grid columns={size !== "small" ? "small" : "100%"} gap="small">
<InfiniteScroll items={items} {...props}>
  {(item) => (
    <Card pad="large" key={item.id}>
      {item.id}
    </Card>
  )}
</InfiniteScroll>
</Grid> */
}
