function getDaysAgo({ createdAt }: { createdAt: string }) {
  const currentDate = new Date();
  const todayMilliseconds = currentDate.getTime();

  const createdAtMilliseconds = Date.parse(createdAt);
  const timeDifference = todayMilliseconds - createdAtMilliseconds;
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysAgo >= 365) {
    const years = Math.floor(daysAgo / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (daysAgo >= 30) {
    const months = Math.floor(daysAgo / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
}

export default getDaysAgo;
