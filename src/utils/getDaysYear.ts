export const getDaysYear = () => {
  const now = new Date();
  const currentYear = now.getFullYear()
  return (currentYear%4===0&&currentYear%100!==0||currentYear%100===0&&currentYear%400===0) ? 366 : 365
}
