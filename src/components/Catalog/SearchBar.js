import { useContext, useEffect } from "react";
import { CatalogContext } from "./CatalogProvider";
import { Box, TextInput } from "grommet";
import { Search } from "grommet-icons";
//TODO: Make a version of this that works with React-Table
export const SearchBar = (props) => {
  const { getItems, setTerms } = useContext(CatalogContext);  

useEffect(() => {
    getItems()
},[])
  

  return (
    <Box width="medium">
      <TextInput onKeyUp={(keyEvent)=>{setTerms(keyEvent.target.value)}} icon={<Search />} reverse placeholder="search ..." />

    </Box>
  );
};
