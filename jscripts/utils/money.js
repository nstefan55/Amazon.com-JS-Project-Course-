// format currency to dollars with 2 decimals

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;

//rounding priceCents with Math.round to fix the rounding issues for some numbers with toFixed method
