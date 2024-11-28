import toast from "react-hot-toast";

export function showToast(message: string, type: "success" | "error" | "info") {
  const styles = {
    success: {
      background: "#4CAF50",
      color: "#fff",
    },
    error: {
      background: "#F44336",
      color: "#fff",
    },
    info: {
      background: "#2196F3",
      color: "#fff",
    },
  };

  toast(message, {
    style: styles[type],
    icon: type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️",
    duration: 3000,
  });
}
