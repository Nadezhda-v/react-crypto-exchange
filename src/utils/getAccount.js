export const getAccount = (id, from, to) => {
  if (id === from) {
    return to;
  }

  if (id === to) {
    return from;
  }
};
