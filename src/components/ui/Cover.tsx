const gradients = [
  "from-gold to-[#7A4E1D]",
  "from-teal to-[#16302B]",
  "from-[#6B5CA5] to-[#241D3E]",
  "from-[#C6673B] to-[#3A1E14]",
  "from-[#4C7A9E] to-[#152430]",
];

function gradientFor(seed: string) {
  const index = seed.charCodeAt(0) % gradients.length;
  return gradients[index];
}

type CoverProps = {
  title: string;
  src?: string;
  className?: string;
};

export function Cover({ title, src, className = "" }: CoverProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={title} className={`rounded-xl object-cover ${className}`} />;
  }

  return (
    <div
      className={`rounded-xl bg-gradient-to-br ${gradientFor(title)} ${className}`}
      aria-label={title}
    />
  );
}