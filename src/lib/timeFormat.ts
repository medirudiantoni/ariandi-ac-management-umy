import { monthNames } from "./date";

export default function formatDateTime(date: number) {
    const time = new Date(date);
  
    const day = String(time.getDate()).padStart(2, '0');
    const month = String(time.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = time.getFullYear();
  
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');

    return `${day}-${monthNames[Number(month)].slice(0, 3)}-${year} | ${hours}:${minutes}`;
  }