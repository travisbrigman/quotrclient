const amountFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  })

const percentFormatter =  new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "exceptZero"
})

const marginValueChecker = (marginValue) => {
    let margin = 0
    if (marginValue > 1) {
       margin = marginValue/100
    } else {
        margin = marginValue
    }
    return percentFormatter.format(margin)
}

export const columns = [
    {
      property: 'datum',
      render: (datum) => console.log(datum),
      header: 'Line Item',
      aggregate: "sum",
      footer: {"aggregate": true},
      primary: true,
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
      render: datum => amountFormatter.format(datum.item.cost),
      aggregate: 'sum',
      footer: {"aggregate": true},
    },
    {
      property: 'item.margin',
      header: 'margin',
      render: datum => marginValueChecker(datum.item.margin)
    },
    {
        property: 'item.sell_price',
        header: 'price',
        render: datum => amountFormatter.format(datum.item.sell_price),
        aggregate: 'sum',
        footer: {'aggregate': true}
    }
]

export const customerColumns =[
    {
        property:"customer.first_name",
        header:"First Name"
    },
    {
        property:"customer.last_name",
        header:"Last Name"
    },
    {
        property:"customer.organization",
        header:"Organization"
    },
]