import * as React from "react";
import "./TablePager.scss";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import ContentPasteOffOutlinedIcon from "@mui/icons-material/ContentPasteOffOutlined";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { TableType } from "../../model/enum/tableTypeEnum";
import { getColumnWithType } from "./TableColumn";
import { NavLink } from "react-router-dom";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import Button from "@mui/material/Button";
import { ButtonColorType } from "../../model/enum/buttonEnum";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/Reducer";
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  id: string;
  label: string;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  tableType: TableType;
  hasCheckBox?: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    tableType,
    hasCheckBox,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const manageColumnOptions = getColumnWithType(tableType);
  return (
    <TableHead sx={{ backgroundColor: "#e6e6e6" }}>
      <TableRow>
        {hasCheckBox && (
          <TableCell padding="checkbox" sx={{ backgroundColor: "#e6e6e6" }}>
            <Checkbox
              color="primary"
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {manageColumnOptions.map((headCell) => (
          <TableCell
            sx={{ backgroundColor: "#e6e6e6" }}
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

// function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
//     const { numSelected } = props;

//     return (
//         <Toolbar
//             sx={{
//                 pl: { sm: 2 },
//                 pr: { xs: 1, sm: 1 },
//                 ...(numSelected > 0 && {
//                     bgcolor: (theme) =>
//                         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 }),
//             }}
//         >
//             {numSelected > 0 ? (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     color="inherit"
//                     variant="subtitle1"
//                     component="div"
//                 >
//                     {numSelected} selected
//                 </Typography>
//             ) : (
//                 <Typography
//                     sx={{ flex: '1 1 100%' }}
//                     variant="h6"
//                     id="tableTitle"
//                     component="div"
//                 >
//                     Nutrition
//                 </Typography>
//             )}
//             {numSelected > 0 ? (
//                 <Tooltip title="Delete">
//                     <IconButton>
//                         <DeleteIcon />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Tooltip title="Filter list">
//                     <IconButton>
//                         <FilterListIcon />
//                     </IconButton>
//                 </Tooltip>
//             )}
//         </Toolbar>
//     );
// }
interface TablePagerProps<T> {
  batchActionElements?: JSX.Element[];
  tableType: TableType;
  rowData: T[];
  hasCheckBox?: boolean;
  page: number;
  handleChangePage: (page: number) => void;
  total: number;
  hasNavigate?: boolean
  navigateLink?: string
}

export default function TablePagerCheckBox<T>(props: TablePagerProps<T>) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("appointmentId");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectedC, setSelectedC] = React.useState<readonly T[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [{ selection }, dispatch] = useStateValue();
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelected: string[] = []
    if (event.target.checked) {
      // props.rowData.forEach((row: any, i) => { return props.hasNavigate ? newSelected.push(row[Object.keys(row)[0]]?.props.children) : newSelected.push(row[Object.keys(row)[0]]) });
      props.rowData.forEach((row: any, i) => { return newSelected.push(row[Object.keys(row)[0]]) });
      setSelected(newSelected);

      const newSelectedC = props.rowData
      setSelectedC(newSelectedC)

      dispatch({
        type: actionType.SET_SELECTION,
        selection: {
          ...selection,
          selectedItems: newSelectedC,
          selectedCount: newSelectedC.length,
        },
      });
      return;
    }
    setSelected([]);
    dispatch({
      type: actionType.SET_SELECTION,
      selection: {
        ...selection,
        selectedItems: [],
        selectedCount: 0,
      },
    });
  };

  const handleClick = (event: React.MouseEvent<unknown>, rowChild: any) => {
    let rowChildText: string = rowChild[Object.keys(rowChild)[0]]
    const selectedIndex = selected.indexOf(rowChildText);
    let newSelected: readonly string[] = [];

    let newSelectedC: readonly T[] = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowChildText);
      newSelectedC = newSelectedC.concat(selectedC, rowChild);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedC = newSelectedC.concat(selectedC.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedC = newSelectedC.concat(selectedC.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedC = newSelectedC.concat(
        selectedC.slice(0, selectedIndex),
        selectedC.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setSelectedC(newSelectedC)
    dispatch({ type: actionType.SET_SELECTION, selection: { ...selection, selectedItems: newSelectedC, selectedCount: newSelectedC.length } });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (rowChild: any) => {
    let rowChildText: string = rowChild[Object.keys(rowChild)[0]]
    return selected.indexOf(rowChildText) !== -1;
  };

  // Avoid a layout jump when reaching the last page with empty props.rowData.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rowData.length) : 0;

  // const visibleRows = React.useMemo(
  //     () =>
  //         stableSort(props.rowData, getComparator(order, orderBy)).slice(
  //             page * rowsPerPage,
  //             page * rowsPerPage + rowsPerPage,
  //         ),
  //     [order, orderBy, page, rowsPerPage],
  // );



  const onRenderCell = (row: any) => {
    return (
      <>
        {Array.from({ length: Object.keys(row).length }).map((a, i) => {
          return (
            <TableCell
              component="th"
              id={`enhanced-table-checkbox`}
              align="left"
              scope="row"
              sx={{ cursor: "pointer", fontWeight: "500" }}
            >
              <Checkbox
                color="primary"
                // indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={true}
                // onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
          )
        })}
      </>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <div className="commandbar-container">
          {props.batchActionElements ? props.batchActionElements : null}
          {selected.length !== 0 && (
            <div className="selected-items">
              {`${selected.length} đã chọn`}
              <Button
                color={ButtonColorType.Inherit}
                onClick={() => {
                  setSelected([]);
                  setSelectedC([]);
                  dispatch({
                    type: actionType.SET_SELECTION,
                    selection: {
                      ...selection,
                      selectedItems: [],
                      selectedCount: 0,
                    },
                  });
                }}
              >
                X
              </Button>
            </div>
          )}
        </div>
        {props.rowData.length !== 0 ? (
          <div className="table-pager">
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                stickyHeader
                aria-label="sticky table"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={props.rowData.length}
                  tableType={props.tableType}
                  hasCheckBox={props.hasCheckBox}
                />
                <TableBody>
                  {props.rowData.map((row, index) => {
                    const isItemSelected = isSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        // hover
                        // onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        {props.hasCheckBox && (
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) => handleClick(event, row)}
                            />
                          </TableCell>
                        )}
                        {onRenderCell(row)}
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={props.total}
              rowsPerPage={10}
              page={props.page}
              onPageChange={(e, page) => {
                props.handleChangePage(page);
              }}
            />
          </div>
        ) : (
          <div className="table-pager-nodata">
            <ContentPasteOffOutlinedIcon />
            Không có dữ liệu để hiển thị
          </div>
        )}
      </Paper>
      {/* <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
    </Box>
  );
}
