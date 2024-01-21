// format currency to dollars with 2 decimals

export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2);
}

//export default formatCurrency;
