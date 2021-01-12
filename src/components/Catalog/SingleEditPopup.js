import {Box, Button, Layer, Text } from "grommet"
import { FormClose, StatusGood} from "grommet-icons"

// popup to remind user that multiple items will not be edited.
export const SingleEditPopUp = ({viewSingleEdit, setViewSingleEdit}) => {

    return(
        <>
        {viewSingleEdit && (
          <Layer
            position="top"
            modal={false}
            margin={{ vertical: "medium", horizontal: "small" }}
            onEsc={()=>{setViewSingleEdit(false)}}
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
                <Text>Heads up, only the first checked item will be edited</Text>
              </Box>
              <Button icon={<FormClose />} onClick={()=>{setViewSingleEdit(false)}} plain />
            </Box>
          </Layer>
    )}
    </>
    )
}