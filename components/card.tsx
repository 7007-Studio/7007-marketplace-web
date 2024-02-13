import clsx from "clsx";
import { ReactNode } from "react";

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <div className={clsx(`card overflow-hidden`, className)}>{children}</div>;

export default Card;
