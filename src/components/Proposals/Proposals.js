import { Heading, Box, Button, CheckBox, Menu, Text, DataTable } from "grommet";
import { Edit, More, Trash } from "grommet-icons";
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
    setSingleProposal,
    deleteProposal,
    deleteProposalItem,
    createProposal,
  } = useContext(ProposalContext);
  const { checked } = useContext(CatalogContext);

  const { patchItem } = useContext(CatalogContext);

  //fetches list of proposals
  useEffect(() => {
    getProposals();
  }, []);

  //if there is a single propsosal loaded into state, get that proposal
  useEffect(() => {
    if (singleProposal.id !== undefined) {
      getSingleProposal(singleProposal.id);
    }
  }, [checked, proposals]);

  //CONDITIONALLY RENDERS THE OPEN PROPOSAL TABLE
  const [open, setOpen] = useState(false);

  //MODAL STUFF
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const newProposal = () => {
    setOpenModal(true);
  };

  //builds an empty proposal
  const constructNewProposal = (selectedCustomerId) => {
    const propObject = { customer_id: selectedCustomerId };
    createProposal(propObject);
  };

  //if theres a proposal set into state, render it to the page
  if (singleProposal.id !== undefined && open !== true) {
    setOpen(true);
  }

  //𝒇𝒇𝒇 FUNCTIONS FOR PROPOSAL LIST ACTIONS 𝒇𝒇𝒇
  const displayProposal = (singleProposalId) => {
    getSingleProposal(singleProposalId);
    setOpen(true);
  };

  //deletes proposal
  const deleteSingleProposal = (proposalToDelete) => {
    setOpen(false)
    deleteProposal(proposalToDelete);
    if (singleProposal.id === proposalToDelete) {
      setSingleProposal([]);
    }
  };

  //✅ CHECKBOX GLUE ✅
  const [proposalChecked, setProposalChecked] = useState([]);

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setProposalChecked([...proposalChecked, value]);
    } else {
      setProposalChecked(proposalChecked.filter((item) => item !== value));
    }
  };
  const onCheckAll = (event) =>
    setProposalChecked(
      event.target.checked
        ? singleProposal.proposalitems.map((datum) => datum.id)
        : []
    );

    //deletes checked line item
  const deleteLineItem = () => {
    proposalChecked.forEach((checkedLineItemId) => {
      deleteProposalItem(checkedLineItemId);
    });
    setProposalChecked([]);
    getSingleProposal(singleProposal.id);
  };

  //updates the margin of the line item
  const editLineItem = (margin) => {
    proposalChecked.forEach((checkedLineItemId) => {
      const matched = singleProposal.proposalitems.find(
        (proposalItem) => proposalItem.id === checkedLineItemId
      );
      const updateObj = { id: matched.item.id, margin: margin };
      patchItem(updateObj);
    });
    setOpenEditModal(false);
    setProposalChecked([]);
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
      <Box direction="row" pad="medium" align="start" wrap={true}>
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
                        checked={proposalChecked.indexOf(datum.id) !== -1}
                        onChange={(e) => onCheck(e, datum.id)}
                      />
                    ),
                    header: (
                      <CheckBox
                        checked={
                          proposalChecked.length ===
                          singleProposal.proposalitems.length
                        }
                        indeterminate={
                          proposalChecked.length > 0 &&
                          proposalChecked.length <
                            singleProposal.proposalitems.length
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
            <Box direction="row" gap="small">
              <Button
                icon={<Trash />}
                label="delete selected"
                onClick={deleteLineItem}
              />
              <Button
                icon={<Edit />}
                label="edit margins of selected"
                onClick={setOpenEditModal}
              />
            </Box>
          </Box>
        )}
        <Box margin="large" elevation="small">
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
            background="background-front"
          />
        </Box>
      </Box>
      <Box width="small">
        <Button label="Start New Proposal" onClick={newProposal} primary />
      </Box>
    </Box>
  );
};
