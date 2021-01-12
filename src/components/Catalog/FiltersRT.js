import { TextInput } from "grommet"
// filters for React-Table 
export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
    </div>
  )
}

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <TextInput
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`search (${length}) ...`}
    />
  )
}