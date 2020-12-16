import { Heading, Box, List, Menu, Text, DataTable } from "grommet";
import { More } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { ProposalContext } from "./ProposalProvider";

import { columns } from "./ProposalColumns";

export const Proposals = () => {
  const {
    getProposals,
    proposals,
    getSingleProposal,
    setSingleProposal,
    singleProposal,
  } = useContext(ProposalContext);

  useEffect(() => {
    getProposals();
  }, []);

  const [open, setOpen] = useState(false);

  const displayProposal = (singleProposalId) => {
    getSingleProposal(singleProposalId);
    console.log(singleProposal);
    
    setOpen(true);
  };

  return (
    <Box direction="column">
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
              columns={columns.map((c) => ({
                ...c,
                search: c.property === "item.make" || c.property === "item.model",
              }))}
              data={singleProposal.items}
              sortable
              resizeable
            />
            </Box>
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
                    { label: "delete", onClick: () => {} },
                  ]}
                />
              );
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
