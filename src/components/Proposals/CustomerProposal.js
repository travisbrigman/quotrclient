import { Box, DataTable, Text } from "grommet";
import { useContext } from "react";
import { exportColumns } from "./ProposalColumns";
import { ProposalContext } from "./ProposalProvider";

export const CustomerProposal = (props) => {
  const { singleProposal, PdfRef } = useContext(ProposalContext);
  console.log(singleProposal);
  

  return (
    <Box pad="medium" margin="medium" as="PDF-Section" ref={PdfRef}>
      <Box gap="xsmall" direction="row">
        <Text color="text-strong" weight="bold">
          Organization
        </Text>
        <Text color="text-xweak">{singleProposal.customer.organization}</Text>
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
          columns={exportColumns}
          data={singleProposal.proposalitems}
        />
      </Box>
    </Box>
  );
};
