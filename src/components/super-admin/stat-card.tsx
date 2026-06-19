import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string | number;
  hint?: string;
  icon: React.ReactNode;
  tone?: "blue" | "green" | "purple" | "orange";
};

const toneClasses = {
  blue: "border-blue-200/80 bg-blue-50/50 text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300",
  green:
    "border-emerald-200/80 bg-emerald-50/50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300",
  purple:
    "border-violet-200/80 bg-violet-50/50 text-violet-700 dark:border-violet-900/50 dark:bg-violet-950/30 dark:text-violet-300",
  orange:
    "border-orange-200/80 bg-orange-50/50 text-orange-700 dark:border-orange-900/50 dark:bg-orange-950/30 dark:text-orange-300",
};

export default function StatCard({
  title,
  value,
  hint,
  icon,
  tone = "blue",
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", toneClasses[tone])}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium opacity-90">{title}</CardTitle>
        <div className="opacity-80">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {hint ? <p className="mt-1 text-xs opacity-80">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
