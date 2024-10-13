import { format } from "date-fns";

export const formatDateTime = (isoString: Date | undefined): String => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return format(date, "dd MMMM yyyy 'at' h:mm a");
};
