// src/pages/admin/Settings.jsx
//
// Scoped to what the backend actually supports (per Swagger):
//   GET/PUT /api/profile          -> profile card
//   POST /api/auth/change-password -> password card
// 2FA / login alerts / notification prefs are intentionally NOT included —
// there's no backend for them yet. Don't ship toggles that don't persist.

import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Skeleton,
} from "@mui/material";
import { Save, User as UserIcon, Lock } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/admin/layout/PageHeader";
import { getProfile, updateProfile } from "../../services/profileService";
import { changePassword } from "../../services/authService";

const cardSx = {
  p: 3,
  borderRadius: "16px",
  bgcolor: "#1E293B",
  border: "1px solid #334155",
  height: "100%",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#111827",
    color: "#F8FAFC",
    borderRadius: "10px",
    "& fieldset": { borderColor: "#334155" },
    "&:hover fieldset": { borderColor: "#475569" },
    "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
  },
  "& .MuiInputLabel-root": { color: "#94A3B8" },
};

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <Box className="flex items-center gap-2" sx={{ mb: 2.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          bgcolor: "rgba(59,130,246,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={18} color="#60A5FA" />
      </Box>
      <Box>
        <Typography sx={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: "#64748B", fontSize: 12.5 }}>{subtitle}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [savingPwd, setSavingPwd] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        setProfile({ name: res?.name ?? "", email: res?.email ?? "" });
      } catch (err) {
        toast.error(err.friendlyMessage ?? "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      await updateProfile({ name: profile.name, email: profile.email });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!pwd.current || !pwd.next) {
      toast.error("Fill in your current and new password");
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast.error("New password and confirmation don't match");
      return;
    }
    setSavingPwd(true);
    try {
      await changePassword({
        currentPassword: pwd.current,
        newPassword: pwd.next,
      });
      toast.success("Password changed");
      setPwd({ current: "", next: "", confirm: "" });
    } catch (err) {
      toast.error(err.friendlyMessage ?? "Failed to change password");
    } finally {
      setSavingPwd(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your admin account"
        breadcrumbItems={[{ label: "Admin", path: "/admin/dashboard" }, { label: "Settings" }]}
      />

      <Grid container spacing={2.5}>
        {/* Profile */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper elevation={0} sx={cardSx}>
            <SectionTitle icon={UserIcon} title="Profile" subtitle="Your account details" />

            {loading ? (
              <Box className="flex flex-col gap-2.5">
                <Skeleton variant="rounded" height={40} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
                <Skeleton variant="rounded" height={40} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
              </Box>
            ) : (
              <>
                <Box className="flex items-center gap-3" sx={{ mb: 3 }}>
                  <Avatar sx={{ width: 56, height: 56, bgcolor: "#3B82F6", fontSize: 20, fontWeight: 700 }}>
                    {(profile.name || "A").charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography sx={{ color: "#F8FAFC", fontWeight: 600 }}>
                      {profile.name || "Admin"}
                    </Typography>
                    <Typography sx={{ color: "#64748B", fontSize: 13 }}>Administrator</Typography>
                  </Box>
                </Box>

                <Box className="flex flex-col gap-2.5">
                  <TextField
                    label="Full name"
                    size="small"
                    fullWidth
                    sx={fieldSx}
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  />
                  <TextField
                    label="Email"
                    size="small"
                    fullWidth
                    sx={fieldSx}
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                  />
                </Box>

                <Box className="flex justify-end" sx={{ mt: 2.5 }}>
                  <Button
                    variant="contained"
                    startIcon={<Save size={16} />}
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    sx={{ textTransform: "none", bgcolor: "#3B82F6", "&:hover": { bgcolor: "#2563EB" } }}
                  >
                    {savingProfile ? "Saving..." : "Save changes"}
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Grid>

        {/* Change password */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper elevation={0} sx={cardSx}>
            <SectionTitle icon={Lock} title="Change Password" subtitle="Update your login credentials" />

            <Box className="flex flex-col gap-2.5">
              <TextField
                label="Current password"
                type="password"
                size="small"
                fullWidth
                sx={fieldSx}
                value={pwd.current}
                onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
              />
              <TextField
                label="New password"
                type="password"
                size="small"
                fullWidth
                sx={fieldSx}
                value={pwd.next}
                onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
              />
              <TextField
                label="Confirm new password"
                type="password"
                size="small"
                fullWidth
                sx={fieldSx}
                value={pwd.confirm}
                onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
              />
            </Box>

            <Box className="flex justify-end" sx={{ mt: 2.5 }}>
              <Button
                variant="contained"
                startIcon={<Save size={16} />}
                onClick={handleChangePassword}
                disabled={savingPwd}
                sx={{ textTransform: "none", bgcolor: "#3B82F6", "&:hover": { bgcolor: "#2563EB" } }}
              >
                {savingPwd ? "Updating..." : "Update password"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}