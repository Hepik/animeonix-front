import { cn } from "@/lib/utils";

interface ContainerPropsType {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerPropsType> = ({
  children,
  className,
}) => {
  return <div className={cn("w-full px-4", className)}>{children}</div>;
};
