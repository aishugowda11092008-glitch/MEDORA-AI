const API_BASE_URL = "http://127.0.0.1:8000";

export async function checkBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) throw new Error("Backend request failed");
    return await response.json();
  } catch (error) {
    console.error("MEDORA AI backend connection error:", error);
    return null;
  }
}

export async function getModules() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/modules`);
    if (!response.ok) throw new Error("Could not retrieve modules");
    return await response.json();
  } catch (error) {
    console.error("Module loading error:", error);
    return null;
  }
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

}
const API_BASE_URL = "http://127.0.0.1:8000";