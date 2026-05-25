export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('id-ID').format(new Date(date));
};
