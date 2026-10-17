// Small flag image. Emoji flags don't render on Windows (they show as "BG", "DE"), so we use PNGs.
export default function Flag({ code, className = "" }) {
  return <img className={`flag ${className}`} src={`/flags/${code.toLowerCase()}.png`} alt="" width="20" height="14" loading="lazy" />;
}
