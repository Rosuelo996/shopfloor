export function formatNotificationDate(createdAt: string) {
    const currentDate = new Date("2026-08-31T00:00:00");
    const createdAtDate = new Date(createdAt);

    createdAtDate.setHours(0,0,0,0);

    const difference = currentDate.getTime() - createdAtDate.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";

    return `${days} days ago`
}