import { Row, Col, Input, CustomInput } from "reactstrap";
import { Box, Button, Select, Text, TextInput } from "grommet"
import { CaretNext, CaretPrevious, ChapterNext, ChapterPrevious } from "grommet-icons"
import { Switch } from "react-router-dom";

export const Pagination = ({    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageIndex,
    pageSize}) => {
    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
      };
    
      const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
      };
      console.log(pageSize)
    return(
    <Box direction="row" gap="small" align="center">
        <Box direction="row" gap="xsmall">
          <Button
            color="primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <ChapterPrevious/>
          </Button>
          <Button
            color="primary"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            <CaretPrevious/>
          </Button>
        </Box>
        <Box direction="column" align="center">
        <Text>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Text>
          <TextInput
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Box>
        <Col md={2}>

          <CustomInput
            type="select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </CustomInput>
          {/* <Select type="select" value={pageSize} key={pageSize} onChange={onChangeInSelect}  options={[10, 20, 30, 40, 50]}/> */}
        </Col>
        <Box direction="row">
          <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
            <CaretNext/>
          </Button>
          <Button
            color="primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ChapterNext/>
          </Button>
        </Box>
      </Box>
    )
}