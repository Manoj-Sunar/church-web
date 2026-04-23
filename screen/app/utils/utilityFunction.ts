

// Helper: Extract YouTube ID from URL
export function getYouTubeId(url: string) {
    try {
        const parsed = new URL(url);

        if (parsed.hostname.includes('youtube.com')) {
            return parsed.searchParams.get('v');
        }

        if (parsed.hostname.includes('youtu.be')) {
            return parsed.pathname.slice(1);
        }

        return null;
    } catch {
        return null;
    }
}



// Helper: Get YouTube thumbnail
export function getYouTubeThumbnail(url: string) {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}



export function formatToMMDDYY(isoString?: string|null): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  return `${mm}/${dd}/${yy}`;
}


export function formatToDateInput(isoString?: string | null): string {
  if (!isoString) return "";
  return isoString.split("T")[0];
}


export const getErrorMessage = (error: any): string => {
  if (error?.response?.data) {
    const data = error.response.data;

    if (Array.isArray(data.message)) return data.message[0];
    if (typeof data.message === "string") return data.message;
    if (data.error) return data.error;
  }

  if (error?.request) return "Network error. Check your connection.";

  return "Something went wrong.";
};