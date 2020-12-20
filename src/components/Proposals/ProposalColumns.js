// const amountFormatter = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     // minimumFractionDigits: 2,
//   })

export const columns = [
    {
      property: 'item.id',
      header: 'Line Item',
      aggregate: "sum",
      footer: {"aggregate": true},
      primary: true,
      size: "xsmall"
    },
    {
      property: 'item.make',
      header: 'Manufacturer',
    },
    {
      property: 'item.model',
      header: 'Part Number',
    },
    {
      property: 'item.description',
      header: 'description',
    },
    {
      property: 'item.cost',
      header: 'cost',
    //   render: datum => amountFormatter.format(datum.cost),
      aggregate: 'sum',
      footer: {"aggregate": true},
      size: "xsmall"
    },
    {
      property: 'item.margin',
      header: 'margin',
      size: "xsmall"
    }
]