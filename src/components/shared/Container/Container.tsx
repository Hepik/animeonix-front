import { cn } from "@/lib/utils";

interface ContainerPropsType {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerPropsType> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("w-full max-w-[1400px] px-4 mx-auto", className)}>
      {children}
    </div>
  );
};
