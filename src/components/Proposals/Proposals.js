import {
  Heading,
  Box,
  Button,
  CheckBox,
  List,
  Menu,
  Text,
  DataTable,
} from "grommet";
import { More } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { ProposalContext } from "./ProposalProvider";
import { columns } from "./ProposalColumns";
import { AddCustomerToProposal } from "./AddCustToNewProposal";
import { EditLineItem } from "./EditLineItem";
import { CatalogContext } from "../Catalog/CatalogProvider";

export const Proposals = () => {
  const {
    getProposals,
    proposals,
    getSingleProposal,
    setSingleProposal,
    singleProposal,
    deleteProposal,
    deleteProposalItem,
    createProposal,
  } = useContext(ProposalContext);

  const { updateItem } = useContext(CatalogContext)

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
      event.target.checked ? singleProposal.items.map((datum) => datum.id) : []
    );

  const deleteLineItem = () => {
    checked.forEach((checkedLineItemId) => {
      deleteProposalItem(checkedLineItemId);
    });
    setChecked([]);
  };

  const editLineItem = (margin) => {
      checked.forEach(checkedLineItemId => {
          const matched = singleProposal.items.find(proposalItem => proposalItem.id === checkedLineItemId)
          const updateObj = { id: matched.item.id, margin: margin };
          updateItem(updateObj)

      })
    setOpenEditModal(false)
    setChecked([])
    getSingleProposal(singleProposal.id)

  };

  console.log(checked);
  
  return (
    <Box direction="column">
      <AddCustomerToProposal
        open={openModal}
        onClose={onClose}
        constructNewProposal={constructNewProposal}
      />
      <EditLineItem open={openEditModal} setOpen={setOpenEditModal} editLineItem={editLineItem} />
      <Heading>Proposals</Heading>
      <Box direction="row">
        {open && (
          <Box pad="large">
            <Heading level="3">Open Proposal</Heading>
            <Box gap="xsmall" direction="row">
              <Text color="text-strong" weight="bold">
                Organization
              </Text>
              <Text color="text-xweak">
                {singleProposal.customer.organization}
              </Text>
            </Box>
            <Box gap="xsmall" direction="row">
              <Text color="text-strong" weight="bold">
                Contact Name
              </Text>
              <Text color="text-xweak">
                {singleProposal.customer.first_name}{" "}
                {singleProposal.customer.last_name}
              </Text>
            </Box>
            <Box gap="xsmall" direction="row">
              <Text color="text-strong" weight="bold">
                Contact Email
              </Text>
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
                        checked={checked.length === singleProposal.items.length}
                        indeterminate={
                          checked.length > 0 &&
                          checked.length < singleProposal.items.length
                        }
                        onChange={onCheckAll}
                      />
                    ),
                    sortable: false,
                  },
                  ...columns,
                ].map((col) => ({
                  ...col,
                  search:
                    col.property === "item.make" ||
                    col.property === "item.model",
                }))}
                data={singleProposal.items}
                sortable
                resizeable
              />
            </Box>
            <Button label="delete selected" onClick={deleteLineItem} />
            <Button label="edit selected" onClick={setOpenEditModal} />
          </Box>
        )}
        <Box pad="large">
          <List
            data={proposals}
            primaryKey={(item) =>
              item.customer !== null
                ? item.customer.organization
                : "no customer"
            }
            secondaryKey={(item) =>
              item.customer !== null
                ? (item.customer.first_name, item.customer.last_name)
                : ""
            }
            pad={{ left: "small", right: "none" }}
            action={(item, index) => {
              return (
                <Menu
                  key={index}
                  icon={<More />}
                  hoverIndicator
                  items={[
                    {
                      label: "show",
                      onClick: () => {
                        displayProposal(item.id);
                      },
                    },
                    {
                      label: "delete",
                      onClick: () => {
                        deleteSingleProposal(item.id);
                      },
                    },
                  ]}
                />
              );
            }}
          />
        </Box>
      </Box>

      <Button label="Start New Proposal" onClick={newProposal} />
    </Box>
  );
};
