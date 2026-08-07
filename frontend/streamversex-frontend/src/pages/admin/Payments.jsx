// src/pages/admin/Payments.jsx
import { useEffect, useState, useCallback } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/admin/layout/PageHeader";
import DataTable from "../../components/admin/common/DataTable";
import SearchBar from "../../components/admin/common/SearchBar";
import StatusBadge from "../../components/admin/common/StatusBadge";
import ActionMenu from "../../components/admin/common/ActionMenu";

import {
  getAllPayments,
  getPaymentsByStatus,
  searchPayments,
} from "../../services/adminService";
import { formatCurrency } from "../../utils/admin/formatCurrency";

const PAGE_SIZE = 10;

const STATUS_TABS = [
  { label: "All", value: null },
  { label: "Paid", value: "PAID" },
  { label: "Pending", value: "PENDING" },
  { label: "Failed", value: "FAILED" },
  { label: "Refunded", value: "REFUNDED" },
];

export default function Payments() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [statusTab, setStatusTab] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);

  const activeStatus = STATUS_TABS[statusTab].value;

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: rowsPerPage };
      let res;

      if (query) {
        res = await searchPayments(query, params);
      } else if (activeStatus) {
        res = await getPaymentsByStatus(activeStatus, params);
      } else {
        res = await getAllPayments(params);
      }

      const list = res?.content ?? res?.items ?? res ?? [];
      const total = res?.totalElements ?? res?.totalCount ?? list.length;

      setRows(list);
      setTotalCount(total);
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to load payments");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, query, activeStatus]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleSearch = (q) => {
    setQuery(q);
    setPage(0);
  };

  const handleTabChange = (_, val) => {
    setStatusTab(val);
    setQuery("");
    setPage(0);
  };

  const columns = [
    { key: "id", label: "Payment ID", sortable: true },
    { key: "userName", label: "User", sortable: true },
    {
      key: "amount",
      label: "Amount",
      align: "right",
      sortable: true,
      render: (row) => formatCurrency(row.amount ?? 0),
    },
    { key: "method", label: "Method", render: (row) => row.method ?? row.paymentMethod ?? "—" },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "createdAt", label: "Date", sortable: true },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (row) => (
        <ActionMenu
          row={row}
          actions={[{ label: "View details", icon: Eye, onClick: () => {} }]}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Track and filter all platform transactions"
        breadcrumbItems={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Payments" }]}
        actions={
          <SearchBar
            placeholder="Search by user, transaction ID..."
            onSearch={handleSearch}
          />
        }
      />

      <Box sx={{ mb: 2, borderBottom: "1px solid #334155" }}>
        <Tabs
          value={statusTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{
            minHeight: 0,
            "& .MuiTab-root": {
              minHeight: 0,
              py: 1.2,
              fontSize: 13.5,
              textTransform: "none",
              fontWeight: 500,
              color: "#94A3B8",
            },
            "& .Mui-selected": { color: "#60A5FA !important" },
            "& .MuiTabs-indicator": { bgcolor: "#3B82F6" },
          }}
        >
          {STATUS_TABS.map((t) => (
            <Tab key={t.label} label={t.label} />
          ))}
        </Tabs>
      </Box>

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyMessage="No payments found"
        getRowId={(row) => row.id ?? row.paymentId}
        rowsPerPageOptions={[10, 25, 50]}
        serverPagination={{
          page,
          rowsPerPage,
          totalCount,
          onPageChange: setPage,
          onRowsPerPageChange: (val) => {
            setRowsPerPage(val);
            setPage(0);
          },
        }}
      />
    </>
  );
}