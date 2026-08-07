// src/pages/admin/PremiumUsers.jsx
import { useEffect, useState, useCallback } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { Clock, Eye } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/admin/layout/PageHeader";
import DataTable from "../../components/admin/common/DataTable";
import SearchBar from "../../components/admin/common/SearchBar";
import StatusBadge from "../../components/admin/common/StatusBadge";
import ActionMenu from "../../components/admin/common/ActionMenu";
import ConfirmDialog from "../../components/admin/common/ConfirmDialog";

import {
  getPremiumUsers,
  searchPremiumUsers,
  getExpiringPremiumUsers,
  expirePremiumUser,
} from "../../services/adminService";

const PAGE_SIZE = 10;

const TABS = [
  { label: "All Premium", key: "all" },
  { label: "Expiring Soon", key: "expiring" },
];

export default function PremiumUsers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);

  const [toExpire, setToExpire] = useState(null); // row | null
  const [expiring, setExpiring] = useState(false);

  const activeKey = TABS[tab].key;

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: rowsPerPage };
      let res;

      if (query) {
        res = await searchPremiumUsers(query, params);
      } else if (activeKey === "expiring") {
        res = await getExpiringPremiumUsers(params);
      } else {
        res = await getPremiumUsers(params);
      }

      const list = res?.content ?? res?.items ?? res ?? [];
      const total = res?.totalElements ?? res?.totalCount ?? list.length;

      setRows(list);
      setTotalCount(total);
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to load premium users");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, query, activeKey]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const handleSearch = (q) => {
    setQuery(q);
    setPage(0);
  };

  const handleTabChange = (_, val) => {
    setTab(val);
    setQuery("");
    setPage(0);
  };

  const handleExpire = async () => {
    if (!toExpire) return;
    setExpiring(true);
    try {
      await expirePremiumUser(toExpire.id ?? toExpire.userId);
      toast.success(`${toExpire.name ?? "User"}'s premium subscription expired`);
      setToExpire(null);
      fetchRows();
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to expire subscription");
    } finally {
      setExpiring(false);
    }
  };

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "plan", label: "Plan", render: (row) => row.plan ?? row.subscriptionPlan ?? "Premium" },
    { key: "startDate", label: "Started", sortable: true },
    { key: "expiryDate", label: "Expires", sortable: true },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => (
        <StatusBadge status={row.expired ? "Expired" : row.status ?? "Active"} />
      ),
    },
    {
      key: "actions",
      label: "",
      align: "right",
      render: (row) => (
        <ActionMenu
          row={row}
          actions={[
            { label: "View details", icon: Eye, onClick: () => {} },
            {
              label: "Expire subscription",
              icon: Clock,
              danger: true,
              hidden: (r) => r.expired,
              onClick: (r) => setToExpire(r),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Premium Users"
        subtitle="Manage premium subscriptions and renewals"
        breadcrumbItems={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Premium Users" }]}
        actions={
          <SearchBar
            placeholder="Search premium users..."
            onSearch={handleSearch}
          />
        }
      />

      <Box sx={{ mb: 2, borderBottom: "1px solid #334155" }}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
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
          {TABS.map((t) => (
            <Tab key={t.key} label={t.label} />
          ))}
        </Tabs>
      </Box>

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyMessage="No premium users found"
        getRowId={(row) => row.id ?? row.userId}
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

      <ConfirmDialog
        open={Boolean(toExpire)}
        title="Expire this subscription?"
        message={`${toExpire?.name ?? "This user"}'s premium access will end immediately and they'll be downgraded to the free plan.`}
        severity="warning"
        confirmLabel="Expire"
        loading={expiring}
        onConfirm={handleExpire}
        onClose={() => !expiring && setToExpire(null)}
      />
    </>
  );
}