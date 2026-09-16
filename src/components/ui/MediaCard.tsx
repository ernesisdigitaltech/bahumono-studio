import { Cover } from "./Cover";

type MediaCardProps = {
  title: string;
  artist: string;
  coverSrc?: string;
  size?: "sm" | "md";
};

export function MediaCard({ title, artist, coverSrc, size = "md" }: MediaCardProps) {
  const coverSize = size === "sm" ? "w-[110px] h-[110px]" : "w-full aspect-square";

  return (
    <div className={size === "sm" ? "w-[110px] flex-shrink-0" : "w-full"}>
      <Cover title={title} src={coverSrc} className={coverSize} />
      <div className="mt-2">
        <div className="text-sm font-semibold text-text truncate">{title}</div>
        <div className="text-xs text-dim truncate">{artist}</div>
      </div>
    </div>
  );
}