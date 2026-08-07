import {
  Clock3,
  PlayCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const STATUS_CONFIG = {
  PLANNED: {
    label: "Planned",
    icon: Clock3,
    className:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  },

  WATCHING: {
    label: "Watching",
    icon: PlayCircle,
    className:
      "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-green-500/15 text-green-400 border border-green-500/30",
  },

  DROPPED: {
    label: "Dropped",
    icon: XCircle,
    className:
      "bg-red-500/15 text-red-400 border border-red-500/30",
  },
};

function WatchStatusBadge({
  status = "PLANNED",
}) {
  const current =
    STATUS_CONFIG[status] ??
    STATUS_CONFIG.PLANNED;

  const Icon = current.icon;

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        backdrop-blur-md
        ${current.className}
      `}
    >
      <Icon size={14} />

      {current.label}
    </div>
  );
}

export default WatchStatusBadge;