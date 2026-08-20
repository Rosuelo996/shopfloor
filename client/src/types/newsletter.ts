export type NewsletterData = {
  id: number;
  weekStart: string;
  weekNumber: number;
  year: number;
  publishedAt: string;
  items: {
    id: number;
    category: string;
    title: string;
    content: string;
    priority: number;
    displayOrder: number;
  }[];
};