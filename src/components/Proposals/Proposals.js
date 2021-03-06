import { Heading, Box, Button, CheckBox, Menu, Text, DataTable } from "grommet";
import { More } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { ProposalContext } from "./ProposalProvider";
import { columns, customerColumns } from "./ProposalColumns";
import { AddCustomerToProposal } from "./AddCustToNewProposal";
import { EditLineItem } from "./EditLineItem";
import { CatalogContext } from "../Catalog/CatalogProvider";
import { Link } from "react-router-dom";

export const Proposals = () => {
  const {
    getProposals,
    proposals,
    getSingleProposal,
    singleProposal,
    deleteProposal,
    deleteProposalItem,
    createProposal,
  } = useContext(ProposalContext);

  const { patchItem } = useContext(CatalogContext);

  useEffect(() => {
    getProposals();
  }, []);

  //CONDITIONALLY RENDERS THE OPEN PROPOSAL TABLE
  const [open, setOpen] = useState(false);

  //MODAL STUFF
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const newProposal = () => {
    setOpenModal(true);
  };

  const constructNewProposal = (selectedCustomerId) => {
    const propObject = { customer_id: selectedCustomerId };
    createProposal(propObject);
  };

  //𝒇𝒇𝒇 FUNCTIONS FOR PROPOSAL LIST ACTIONS 𝒇𝒇𝒇
  const displayProposal = (singleProposalId) => {
    getSingleProposal(singleProposalId);
    setOpen(true);
  };

  const deleteSingleProposal = (proposalToDelete) => {
    deleteProposal(proposalToDelete);
  };

  //✅ CHECKBOX GLUE ✅
  const [checked, setChecked] = useState([]);

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, value]);
    } else {
      setChecked(checked.filter((item) => item !== value));
    }
  };
  const onCheckAll = (event) =>
    setChecked(
      event.target.checked ? singleProposal.proposalitems.map((datum) => datum.id) : []
    );

  const deleteLineItem = () => {
    checked.forEach((checkedLineItemId) => {
      deleteProposalItem(checkedLineItemId);
    });
    setChecked([]);
    getSingleProposal(singleProposal.id);
  };

  const editLineItem = (margin) => {
    checked.forEach((checkedLineItemId) => {
      const matched = singleProposal.proposalitems.find(
        (proposalItem) => proposalItem.id === checkedLineItemId
      );
      const updateObj = { id: matched.item.id, margin: margin };
      patchItem(updateObj);
    });
    setOpenEditModal(false);
    setChecked([]);
    getSingleProposal(singleProposal.id);
  };

  return (
    <Box direction="column">
      <AddCustomerToProposal
        open={openModal}
        onClose={onClose}
        constructNewProposal={constructNewProposal}
      />
      <EditLineItem
        open={openEditModal}
        setOpen={setOpenEditModal}
        editLineItem={editLineItem}
      />
      <Box direction="row" pad="medium" align="start">
        {open && (
          <Box pad="large">
            <Heading level="3">Open Proposal</Heading>
            <Link to="/export">
              <Button label="Export Proposal" primary />
            </Link>
            <Box gap="xsmall" direction="row" align="baseline">
              <Heading
                level={5}
                margin="xsmall"
                color="text-strong"
                weight="bold"
              >
                Organization
              </Heading>
              <Text color="text-xweak">
                {singleProposal.customer.organization}
              </Text>
            </Box>
            <Box gap="xsmall" direction="row" align="baseline">
              <Heading
                level={5}
                margin="xsmall"
                color="text-strong"
                weight="bold"
              >
                Contact Name
              </Heading>
              <Text color="text-xweak">
                {singleProposal.customer.first_name}{" "}
                {singleProposal.customer.last_name}
              </Text>
            </Box>
            <Box gap="xsmall" direction="row" align="baseline">
              <Heading
                level={5}
                margin="xsmall"
                color="text-strong"
                weight="bold"
              >
                Contact Email
              </Heading>
              <Text color="text-xweak">{singleProposal.customer.email}</Text>
            </Box>
            <Box margin="small">
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
                        checked={
                          checked.length === singleProposal.proposalitems.length
                        }
                        indeterminate={
                          checked.length > 0 &&
                          checked.length < singleProposal.proposalitems.length
                        }
                        onChange={onCheckAll}
                      />
                    ),
                    sortable: false,
                  },
                  {
                    property: "index",
                    render: (datum) =>
                      singleProposal.proposalitems.findIndex(
                        (index) => index.id === datum.id
                      ) + 1,
                    header: "Line Item",
                  },
                  ...columns,
                ].map((col) => ({
                  ...col,
                  search:
                    col.property === "item.make" ||
                    col.property === "item.model",
                }))}
                data={singleProposal.proposalitems}
                sortable
                resizeable
              />
            </Box>
            <Button label="delete selected" onClick={deleteLineItem} />
            <Button label="edit selected" onClick={setOpenEditModal} />
          </Box>
        )}
        <Box pad="large">
          <DataTable
            columns={[
              ...customerColumns,
              {
                render: (datum) => (
                  <Menu
                    key={datum.id}
                    icon={<More />}
                    hoverIndicator
                    items={[
                      {
                        label: "show",
                        onClick: () => {
                          displayProposal(datum.id);
                        },
                      },
                      {
                        label: "delete",
                        onClick: () => {
                          deleteSingleProposal(datum.id);
                        },
                      },
                    ]}
                  />
                ),
              },
            ]}
            data={proposals}
          />
        </Box>
      </Box>

      <Button label="Start New Proposal" onClick={newProposal} />
    </Box>
  );
};
