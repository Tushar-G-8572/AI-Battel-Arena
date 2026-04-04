// Layer 3 - Service: Battle API calls
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const battleService = {
  async startBattle(prompt, token) {
    const res = await fetch(`${API_BASE}/battle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Battle failed");
    return data;
  },

  async getBattleHistory(token) {
    const res = await fetch(`${API_BASE}/battle/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to load history");
    return data;
  },
};
