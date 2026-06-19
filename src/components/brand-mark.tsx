import Link from "next/link";
import { APP_NAME, APP_TAGLINE } from "@/lib/auth-config";

type BrandMarkProps = {
  className?: string;
  showTagline?: boolean;
  inverted?: boolean;
};

export default function BrandMark({
  className = "",
  showTagline = false,
  inverted = false,
}: BrandMarkProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group ${className}`}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm tracking-tight transition-transform group-hover:scale-105 ${
          inverted
            ? "bg-primary-foreground text-primary"
            : "bg-primary text-primary-foreground"
        }`}
      >
        FL
      </span>
      <span className="flex flex-col text-left">
        <span
          className={`text-lg font-semibold tracking-tight leading-none ${
            inverted ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {APP_NAME}
        </span>
        {showTagline && (
          <span
            className={`text-xs mt-1 ${
              inverted ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}
          >
            {APP_TAGLINE}
          </span>
        )}
      </span>
    </Link>
  );
}
