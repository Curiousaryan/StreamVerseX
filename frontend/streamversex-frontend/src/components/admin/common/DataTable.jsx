// src/components/admin/common/DataTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Skeleton,
  Box,
} from "@mui/material";
import { useMemo, useState } from "react";
import EmptyState from "./EmptyState";

/**
 * Generic, reusable admin data table.
 *
 * Props:
 *  - columns: [{ key, label, sortable, align, render(row) }]
 *  - rows: array of data objects
 *  - loading: bool
 *  - emptyMessage: string
 *  - getRowId: fn(row) => unique id (default row.id)
 *  - onRowClick: fn(row)
 *  - defaultSortKey: string
 *  - rowsPerPageOptions: number[]
 *  - serverPagination: { page, rowsPerPage, totalCount, onPageChange, onRowsPerPageChange }
 *    If omitted, table paginates client-side automatically.
 */
export default function DataTable({
  columns,
  rows = [],
  loading = false,
  emptyMessage = "No records found",
  getRowId = (row) => row.id,
  onRowClick,
  defaultSortKey,
  rowsPerPageOptions = [10, 25, 50],
  serverPagination,
}) {
  const [sortKey, setSortKey] = useState(defaultSortKey ?? null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const isServer = Boolean(serverPagination);

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [rows, sortKey, sortDir]);

  const pagedRows = isServer
    ? sortedRows
    : sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const cellSx = { color: "#F8FAFC", borderColor: "#334155" };
  const headSx = {
    ...cellSx,
    color: "#94A3B8",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    bgcolor: "#111827",
  };

  return (
    <Paper
      elevation={0}
      sx={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #334155" }}
    >
      <TableContainer sx={{ bgcolor: "#1E293B" }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  align={col.align ?? "left"}
                  sx={headSx}
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortKey === col.key}
                      direction={sortKey === col.key ? sortDir : "asc"}
                      onClick={() => handleSort(col.key)}
                      sx={{
                        color: "inherit",
                        "&.Mui-active": { color: "#F8FAFC" },
                        "& .MuiTableSortLabel-icon": {
                          color: "#F8FAFC !important",
                        },
                      }}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading &&
              Array.from({ length: rowsPerPage }).map((_, i) => (
                <TableRow key={`sk-${i}`}>
                  {columns.map((col) => (
                    <TableCell key={col.key} sx={cellSx}>
                      <Skeleton
                        variant="text"
                        sx={{ bgcolor: "rgba(255,255,255,0.06)" }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!loading && pagedRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ border: "none", py: 6 }}>
                  <EmptyState message={emptyMessage} />
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              pagedRows.map((row) => (
                <TableRow
                  key={getRowId(row)}
                  hover
                  onClick={() => onRowClick?.(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    "&:hover": { bgcolor: "#263244" },
                  }}
                >
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align ?? "left"} sx={cellSx}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ borderTop: "1px solid #334155" }}>
        <TablePagination
          component="div"
          count={isServer ? serverPagination.totalCount : sortedRows.length}
          page={isServer ? serverPagination.page : page}
          onPageChange={(_, newPage) =>
            isServer ? serverPagination.onPageChange(newPage) : setPage(newPage)
          }
          rowsPerPage={isServer ? serverPagination.rowsPerPage : rowsPerPage}
          onRowsPerPageChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (isServer) {
              serverPagination.onRowsPerPageChange(val);
            } else {
              setRowsPerPage(val);
              setPage(0);
            }
          }}
          rowsPerPageOptions={rowsPerPageOptions}
          sx={{
            color: "#94A3B8",
            "& .MuiTablePagination-selectIcon": { color: "#94A3B8" },
            "& .MuiSvgIcon-root": { color: "#94A3B8" },
          }}
        />
      </Box>
    </Paper>
  );
}