const sparkles = [
  { top: "12%", left: "8%",  size: 22, delay: "0s"   },
  { top: "22%", left: "46%", size: 16, delay: "0.6s" },
  { top: "38%", left: "30%", size: 13, delay: "1.2s" },
  { top: "55%", left: "5%",  size: 20, delay: "0.3s" },
  { top: "68%", left: "52%", size: 16, delay: "1.5s" },
  { top: "80%", left: "20%", size: 13, delay: "0.9s" },
] as const;

export function SparkleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparkles.map((s, i) => (
        <svg
          key={i}
          width={s.size}
          height={s.size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="absolute text-white"
          style={{
            top: s.top,
            left: s.left,
            animation: `twinkle 3.5s ease-in-out ${s.delay} infinite`,
          }}
        >
          <path d="M12 2l1.8 6.4L20 10l-6.2 1.6L12 18l-1.8-6.4L4 10l6.2-1.6L12 2z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
