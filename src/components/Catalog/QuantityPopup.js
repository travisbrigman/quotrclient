import {Box, Button, Layer, Text, MaskedInput } from "grommet"
import { FormClose, Send} from "grommet-icons"

export const QuantityPopup = ({viewQuantityPopup, setViewQuantityPopup, quant, setQuant, approvedChecked }) => {

const handleClick = () => {
    approvedChecked()
    setViewQuantityPopup(false)
}
    return(
        <>
        {viewQuantityPopup && (
          <Layer
            position="center"
            modal={true}
            // margin={{ vertical: "medium", horizontal: "small" }}
            onEsc={()=>{setViewQuantityPopup(false)}}
            onClickOutside={()=>{setViewQuantityPopup(false)}}
            responsive={false}
          >
            <Box
              align="center"
              direction="row"
              gap="small"
              justify="between"
              round="xsmall"
              elevation="medium"
              pad={{ vertical: "xsmall", horizontal: "small" }}
            >
              <Box align="center" direction="row" gap="xsmall">
                <Text>How many of each checked item</Text>
                <MaskedInput
              name="value"
              mask={[{ regexp: /^\d{1,3}$/ }]}
            //   value={quantity}
              onChange={(event) => setQuant(event.target.value)}
            />
              </Box>
              <Button icon={<Send/>} onClick={handleClick} />
              <Button icon={<FormClose />} onClick={()=>{setViewQuantityPopup(false)}} plain />
            </Box>
          </Layer>
    )}
    </>
    )
}