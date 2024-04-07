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
      `card border-2 border-white bg-black overflow-hidden`,
      className
    )}
  >
    {children}
  </div>
);

export default Card;
