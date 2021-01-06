
const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const dateChanger = (dateString) => {
  let parsedDate = Date.parse(dateString)
  return dateTimeFormat.format(parsedDate)

}

const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})


export const columns = [
    {
      property: 'make',
      header: 'Manufacturer',
      search: true,
      align: "start"
    },
    {
      property: 'model',
      header: 'Part #',
      search: true
    },
    {
      property: 'cost',
      render: datum => amountFormatter.format(datum.cost),
      header: 'Dealer Cost',
    },
    {
      property: 'description',
      header: 'Short Description',
      search: true
    },
    {
      property: 'created_on',
      render: datum => dateChanger(datum.created_on),
      header: 'Date Created'
    }
  ];