export const formatAmount = (id, amount, from, to) => {
  if (id === from) {
    return `-${amount}`;
  }

  if (id === to) {
    return `+${amount}`;
  }
};

export const formatAmountChart = (id, amount, from, to) => {
  if (id === from) {
    return -amount;
  }

  if (id === to) {
    return amount;
  }
};
