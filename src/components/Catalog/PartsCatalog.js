import { Box, Button, CheckBox, DataTable, Heading } from "grommet";
import { Compliance } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
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
    setStatus,
    searchTerms,
  } = useContext(CatalogContext);
  const { singleProposal } = useContext(ProposalContext);

  const [filteredItems, setFiltered] = useState([]);

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching items
      const subsetMake = items.filter((item) =>
        item.make.toLowerCase().includes(searchTerms.toLowerCase())
      );
      setFiltered(subsetMake);
    } else {
      // If the search field is blank, display all animals
      setFiltered(items);
    }
  }, [searchTerms, items]);

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

  let itemsApproved = 0;

  const approvedChecked = () => {
    checked.forEach((selectedItems) => {
      addItemToProposal({
        item_id: selectedItems,
        proposal_id: singleProposal.id,
      }).then(console.log(status));

      // .then(setStatus(false))
    });
    setChecked([]);
  };

  return (
    <Box pad="large">
      <Box direction="column" pad="small">
        <Box width="small">
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
        <DataTable
          columns={[
            {
              size: "40px",
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
          data={filteredItems}
          sortable
          resizeable
          size="medium"
        />
      </Box>
    </Box>
  );
};
