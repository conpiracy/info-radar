import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("container mx-auto px-4 pt-20 pb-8", className)}>
      {children}
    </main>
  );
}