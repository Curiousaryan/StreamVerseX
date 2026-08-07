// src/components/admin/common/SearchBar.jsx
import { InputAdornment, TextField } from "@mui/material";
import { Search, X } from "lucide-react";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

/**
 * Debounced search input used across admin list pages (Users, Reviews,
 * Payments, Premium Users).
 *
 * Props:
 *  - value: controlled value (optional — component also manages its own local state)
 *  - onSearch: fn(query) — called after `debounceMs` of inactivity
 *  - placeholder: string
 *  - debounceMs: number (default 400)
 */
export default function SearchBar({
  value: controlledValue,
  onSearch,
  placeholder = "Search...",
  debounceMs = 400,
  sx,
}) {
  const [value, setValue] = useState(controlledValue ?? "");
  const timerRef = useRef(null);

  useEffect(() => {
    if (controlledValue !== undefined) setValue(controlledValue);
  }, [controlledValue]);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch?.(value.trim());
    }, debounceMs);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TextField
      size="small"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      sx={{
        minWidth: 260,
        "& .MuiOutlinedInput-root": {
          bgcolor: "#111827",
          color: "#F8FAFC",
          borderRadius: "10px",
          "& fieldset": { borderColor: "#334155" },
          "&:hover fieldset": { borderColor: "#475569" },
          "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
        },
        ...sx,
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} color="#94A3B8" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setValue("")}>
                <X size={14} color="#94A3B8" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
}