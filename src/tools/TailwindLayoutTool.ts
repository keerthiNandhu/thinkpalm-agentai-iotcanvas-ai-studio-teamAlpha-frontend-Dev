export function generateLayout(widgetCount: number): string {
  if (widgetCount === 1) return "grid gap-6 grid-cols-1";
  if (widgetCount <= 3) return "grid gap-6 grid-cols-2";
  if (widgetCount <= 6) return "grid gap-6 grid-cols-3";
  return "grid gap-6 grid-cols-4";
}
