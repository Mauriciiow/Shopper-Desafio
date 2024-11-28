import { cn } from "@/lib/utils";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className={cn("container mx-auto")}>{children}</div>;
}
