import {Box, Button, Layer, Text } from "grommet"
import { FormClose, StatusGood} from "grommet-icons"
//shows that a customer cant be deleted because they are associated with a proposal

export const CantDelete = ({viewCantDelete, setViewCantDelete}) => {

    return(
        <>
        {viewCantDelete && (
          <Layer
            position="top"
            modal={false}
            margin={{ vertical: "medium", horizontal: "small" }}
            onEsc={()=>{setViewCantDelete(false)}}
            onClickOutside={()=>{setViewCantDelete(false)}}
            responsive={false}
            plain
          >
            <Box
              align="center"
              direction="row"
              gap="small"
              justify="between"
              round="medium"
              elevation="medium"
              pad={{ vertical: "xsmall", horizontal: "small" }}
              background="status-warning"
            >
              <Box align="center" direction="row" gap="xsmall">
                <StatusGood />
                <Text>This customer is associated with a Proposal and can't be deleted.</Text>
              </Box>
              <Button icon={<FormClose />} onClick={()=>{setViewCantDelete(false)}} plain />
            </Box>
          </Layer>
    )}
    </>
    )
}