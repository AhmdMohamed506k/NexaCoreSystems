export const stats = [
  { label: "Active projects", value: 4, suffix: "", spark: [22, 35, 28, 48, 42, 60, 51, 67, 62, 75, 71, 84] },
  { label: "Deliverables due", value: 7, suffix: "", spark: [80, 72, 65, 70, 58, 62, 48, 53, 42, 45, 34, 38] },
  { label: "Unread messages", value: 12, suffix: "", spark: [20, 24, 30, 26, 38, 42, 40, 55, 52, 63, 68, 74] },
  { label: "Hours this month", value: 126, suffix: "h", spark: [30, 40, 37, 48, 52, 50, 61, 65, 72, 80, 77, 92] },
];

export const projects = [
  { name: "Aster Labs", type: "Branding", status: "In design", progress: 72, due: "14 Oct" },
  { name: "Nova Finance", type: "Product", status: "In development", progress: 48, due: "02 Nov" },
  { name: "Helio Studio", type: "Identity", status: "In review", progress: 90, due: "09 Oct" },
  { name: "Pulse Health", type: "Mobile", status: "Discovery", progress: 18, due: "21 Nov" },
];

export const activities = [
  ["Sara commented on Aster Labs", "12m ago"],
  ["New deliverable uploaded to Helio Studio", "1h ago"],
  ["Invoice #1042 was paid", "3h ago"],
  ["Nova Finance moved to Development", "Yesterday"],
  ["You were added to Pulse Health", "2d ago"],
  ["Weekly report is ready", "3d ago"],
];

export const carouselProjects = [
  { caption: "Aster Labs", title: "Brand system · 72%", progress: 72 },
  { caption: "Nova Finance", title: "Design QA · 48%", progress: 48 },
  { caption: "Helio Studio", title: "Final review · 90%", progress: 90 },
];

export const milestone = {
  title: "Aster Labs — Brand guidelines review",
  dueDays: 5,
};
