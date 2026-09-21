import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/travelData';

export function formatCurrency(amountUSD: number, currencyCode: CurrencyCode): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = Math.round(amountUSD * currency.rateFromUSD);
  
  if (currencyCode === 'SAR') {
    return `${converted.toLocaleString()} ${currency.symbol}`;
  }
  if (currencyCode === 'AED') {
    return `${converted.toLocaleString()} ${currency.symbol}`;
  }
  return `${currency.symbol}${converted.toLocaleString()}`;
}

export function formatPassengerCount(passengers: { adults: number; children: number; infants: number }): string {
  const total = passengers.adults + passengers.children + passengers.infants;
  if (total <= 1) return '1 Adult';
  return `${total} Travelers`;
}

export function formatCabinClassName(cabin: string): string {
  switch (cabin) {
    case 'economy': return 'Economy';
    case 'premiumEconomy': return 'Premium Economy';
    case 'business': return 'Business Class';
    case 'first': return 'First Class';
    default: return 'Economy';
  }
}
