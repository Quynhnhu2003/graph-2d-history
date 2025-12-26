export function formatNumber(x: any, character = ",") {
  const formatted = new Intl.NumberFormat("en-US").format(x);
  return character === "," ? formatted : formatted.replace(/,/g, character);
}
