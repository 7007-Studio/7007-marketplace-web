import clsx from "clsx";
import { ReactNode } from "react";

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div className={clsx(`card h-fit overflow-hidden`, className)}>
    {children}
  </div>
);

export default Card;
