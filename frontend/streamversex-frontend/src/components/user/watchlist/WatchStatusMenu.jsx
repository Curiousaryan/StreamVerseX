import { useState } from "react";

import {
  ChevronDown,
  Clock3,
  PlayCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const STATUS_OPTIONS = [
  {
    value: "PLANNED",
    label: "Planned",
    icon: Clock3,
  },
  {
    value: "WATCHING",
    label: "Watching",
    icon: PlayCircle,
  },
  {
    value: "COMPLETED",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    value: "DROPPED",
    label: "Dropped",
    icon: XCircle,
  },
];

function WatchStatusMenu({
  value = "PLANNED",
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const selected =
    STATUS_OPTIONS.find(
      (status) => status.value === value
    ) || STATUS_OPTIONS[0];

  const SelectedIcon = selected.icon;

  const handleSelect = (status) => {
    onChange(status.value);
    setOpen(false);
  };

  return (
    <div className="relative">

      {/* Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-2
          text-white
          transition-all
          duration-300
          hover:border-red-600
        "
      >
        <SelectedIcon
          size={18}
          className="text-red-500"
        />

        <span>{selected.label}</span>

        <ChevronDown
          size={16}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />

      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-3
            w-56
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-[#111]
            shadow-2xl
          "
        >
          {STATUS_OPTIONS.map((status) => {
            const Icon = status.icon;

            return (
              <button
                key={status.value}
                onClick={() =>
                  handleSelect(status)
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  px-5
                  py-4
                  text-left
                  transition-all
                  duration-200

                  ${
                    value === status.value
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-zinc-900 hover:text-white"
                  }
                `}
              >
                <Icon size={18} />

                {status.label}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default WatchStatusMenu;