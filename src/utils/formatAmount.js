export const formatAmount = (id, amount, from, to) => {
  if (id === from) {
    return `-${amount}`;
  }

  if (id === to) {
    return `+${amount}`;
  }
};
