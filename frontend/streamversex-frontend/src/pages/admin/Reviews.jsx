// src/pages/admin/Reviews.jsx
import { useEffect, useState, useCallback } from "react";
import { Rating } from "@mui/material";
import { Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/admin/layout/PageHeader";
import DataTable from "../../components/admin/common/DataTable";
import SearchBar from "../../components/admin/common/SearchBar";
import ActionMenu from "../../components/admin/common/ActionMenu";
import ConfirmDialog from "../../components/admin/common/ConfirmDialog";

import { getAllReviews, searchReviews, deleteReview } from "../../services/adminService";

const PAGE_SIZE = 10;

export default function Reviews() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZE);
  const [totalCount, setTotalCount] = useState(0);

  const [toDelete, setToDelete] = useState(null); // review row | null
  const [deleting, setDeleting] = useState(false);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, size: rowsPerPage };
      const res = query
        ? await searchReviews(query, params)
        : await getAllReviews(params);

      const list = res?.content ?? res?.items ?? res ?? [];
      const total = res?.totalElements ?? res?.totalCount ?? list.length;

      setRows(list);
      setTotalCount(total);
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, query]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSearch = (q) => {
    setQuery(q);
    setPage(0);
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteReview(toDelete.id ?? toDelete.reviewId);
      toast.success("Review deleted");
      setToDelete(null);
      fetchReviews();
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to delete review");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { key: "userName", label: "User", sortable: true },
    { key: "title", label: "Title / Content", sortable: false, render: (row) => row.mediaTitle ?? row.title },
    {
      key: "rating",
      label: "Rating",
      align: "center",
      render: (row) => (
        <Rating
          value={row.rating ?? 0}
          readOnly
          size="small"
          sx={{
            "& .MuiRating-iconFilled": { color: "#FBBF24" },
            "& .MuiRating-iconEmpty": { color: "#334155" },
          }}
        />
      ),
    },
    {
      key: "comment",
      label: "Comment",
      render: (row) => (
        <span
          style={{
            display: "block",
            maxWidth: 280,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {row.comment ?? row.content ?? "—"}
        </span>
      ),
    },
    { key: "createdAt", label: "Posted", sortable: true },
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
              label: "Delete review",
              icon: Trash2,
              danger: true,
              onClick: (r) => setToDelete(r),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Reviews"
        subtitle="Moderate user reviews across the platform"
        breadcrumbItems={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Reviews" }]}
        actions={
          <SearchBar
            placeholder="Search reviews by user or title..."
            onSearch={handleSearch}
          />
        }
      />

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyMessage="No reviews found"
        getRowId={(row) => row.id ?? row.reviewId}
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
        open={Boolean(toDelete)}
        title="Delete this review?"
        message="This action is permanent and cannot be undone. The review will be removed immediately."
        severity="danger"
        confirmLabel="Delete"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => !deleting && setToDelete(null)}
      />
    </>
  );
}