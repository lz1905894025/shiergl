function getId() {
  const date = new Date();
  const a = date.getMilliseconds() + date.getMinutes() + date.getHours();
  const b = Math.floor(Math.random() * 10 + 1);
  return a * b;
}

export default getId;
