import { Heading } from "grommet";
import { useContext, useEffect } from "react"
import { CatalogContext } from "./CatalogProvider.js"


export const PartsCatalog = () => {

    const {getItems, items } = useContext(CatalogContext)

    useEffect(() => {
        getItems()
    },[]);

    console.log(items);
    

    return (
        <Heading>Catalog</Heading>
    )
}