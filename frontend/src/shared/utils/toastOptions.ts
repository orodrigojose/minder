import { createElement } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { GiStabbedNote } from "react-icons/gi";
import { MdError } from "react-icons/md";

export const toastOptions = {
  icon: createElement(GiStabbedNote),
  duration: 4000,
  style: {
    background: "#18181b",
    color: "#f4f4f5",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    border: "1px solid #27272a",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4)",
  },

  success: {
    icon: createElement(FaCheck),
    style: {
      border: "1px solid #10b981",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#18181b",
    },
  },

  error: {
    icon: createElement(MdError),
    style: {
      border: "1px solid #ef4444",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#18181b",
    },
  },

  loading: {
    icon: createElement(CgSpinner, {
      className: "animate-spin",
      size: 20,
      color: "#3b82f6",
    }),
    style: {
      border: "1px solid #3b82f6",
    },
    iconTheme: {
      primary: "#3b82f6",
      secondary: "#18181b",
    },
  },

  blank: {
    style: {
      border: "1px solid #71717a",
    },
  },
};
