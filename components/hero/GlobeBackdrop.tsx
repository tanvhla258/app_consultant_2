export function GlobeBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={"text-primary-300 opacity-20 " + className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <circle cx="200" cy="200" r="180" />
      <ellipse cx="200" cy="200" rx="180" ry="60" />
      <ellipse cx="200" cy="200" rx="180" ry="120" />
      <ellipse cx="200" cy="200" rx="60"  ry="180" />
      <ellipse cx="200" cy="200" rx="120" ry="180" />
      <line x1="20"  y1="200" x2="380" y2="200" />
      <line x1="200" y1="20"  x2="200" y2="380" />
    </svg>
  );
}
