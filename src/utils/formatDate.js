export const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  const dateTimeFormatter = new Intl.DateTimeFormat('ru', options);
  return dateTimeFormatter.format(new Date(date));
};
