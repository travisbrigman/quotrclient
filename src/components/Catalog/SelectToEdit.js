import {Box, Button, Layer, Text } from "grommet"
import { FormClose, StatusGood} from "grommet-icons"

export const SelectToEdit = ({viewSelectToEdit, setViewSelectToEdit}) => {

    return(
        <>
        {viewSelectToEdit && (
          <Layer
            position="top"
            modal={false}
            margin={{ vertical: "medium", horizontal: "small" }}
            onEsc={()=>{setViewSelectToEdit(false)}}
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
                <Text>Check an item's checkbox to edit</Text>
              </Box>
              <Button icon={<FormClose />} onClick={()=>{setViewSelectToEdit(false)}} plain />
            </Box>
          </Layer>
    )}
    </>
    )
}