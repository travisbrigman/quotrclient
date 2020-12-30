import { Box, Button, DataTable, Text } from "grommet";
import { createRef, useContext } from "react";
import { exportColumns } from "./ProposalColumns";
import { ProposalContext } from "./ProposalProvider";
import Pdf from "react-to-pdf";

export const CustomerProposal = (props) => {
  const { singleProposal } = useContext(ProposalContext);
  const PdfRef = createRef();
  return (
    <Box margin="small" pad="xsmall">
      <Pdf targetRef={PdfRef} filename={`Quotr-${singleProposal.organization}.pdf`}>
        {({ toPdf }) => <Button onClick={toPdf}>Generate Pdf</Button>}
      </Pdf>
      <Box as="PDF-Section" ref={PdfRef}>
        <Box margin="small" pad="xsmall">
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
              columns={exportColumns}
              data={singleProposal.proposalitems}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
