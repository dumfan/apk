export const log = (id, comment) => {
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  // eslint-disable-next-line no-console
  console.log(`${date} [${id}] ${comment}`);
};
