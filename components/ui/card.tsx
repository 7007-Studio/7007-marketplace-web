import clsx from "clsx";
import { ReactNode } from "react";

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={clsx(
      `card border-2 border-neutral-50 overflow-hidden mb-[24px] m-[10px]`,
      className
    )}
  >
    {children}
  </div>
);

export default Card;
