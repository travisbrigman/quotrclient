import { Box, Button, DataTable, Heading, Text } from "grommet";
import { createRef, useContext } from "react";
import { exportColumns } from "./ProposalColumns";
import { ProposalContext } from "./ProposalProvider";
import Pdf from "react-to-pdf";

//PDF Generator window
export const CustomerProposal = (props) => {
  const { singleProposal } = useContext(ProposalContext);
  const PdfRef = createRef();
  return (
    <Box margin="small" pad="xsmall">
      <Pdf
        targetRef={PdfRef}
        filename={`Quotr-${singleProposal.organization}.pdf`}
      >
        {({ toPdf }) => <Box width="small"><Button fill={false} onClick={toPdf} label="Generate PDF" primary/></Box>}
      </Pdf>
      <Box  as="PDF-Section" ref={PdfRef}>
        <Box margin="small" pad="xsmall" background="background-contrast" elevation="xsmall">
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
                  property: "index",
                  render: (datum) =>
                    singleProposal.proposalitems.findIndex(
                      (index) => index.id === datum.id
                    ) + 1,
                  header: "Line Item",
                },
                ...exportColumns,
              ]}
              data={singleProposal.proposalitems}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
