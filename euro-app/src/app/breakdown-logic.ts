import type { Breakdown } from './breakdown.service';

const DENOMINATIONS_IN_CENT = [
  20000, 10000, 5000, 2000, 1000, 500,
  200, 100, 50, 20, 10, 5, 2, 1,
];

export function calculateBreakdownFrontend(amountInput: string): Breakdown {
  const normalized = amountInput.replace(',', '.');
  const amount = parseFloat(normalized);

  if (isNaN(amount) || amount < 0) {
    throw new Error('Ungültiger Betrag');
  }

  let cents = Math.round(amount * 100);
  const result: Breakdown = {};

  for (const d of DENOMINATIONS_IN_CENT) {
    const count = Math.floor(cents / d);
    cents = cents % d;

    const key = (d / 100).toFixed(2);
    result[key] = count;
  }

  return result;
}

export function diffBreakdown(
  current: Breakdown | null,
  previous: Breakdown | null
): Breakdown | null {
  if (!current && !previous) {
    return null;
  }

  if (!previous) {
    return current ? { ...current } : null;
  }

  if (!current) {
    const negated: Breakdown = {};
    Object.keys(previous).forEach((d) => {
      const prev = previous[d] ?? 0;
      if (prev !== 0) {
        negated[d] = -prev;
      }
    });
    return negated;
  }

  const diff: Breakdown = {};

  const allDenoms = new Set([
    ...Object.keys(current),
    ...Object.keys(previous),
  ]);

  allDenoms.forEach((d) => {
    const curr = current[d] ?? 0;
    const prev = previous[d] ?? 0;

    if (curr !== 0 || prev !== 0) {
      diff[d] = curr - prev;
    }
  });

  return diff;
}
