import clsx from "clsx";
import { ReactNode } from "react";

interface TimelineProps {
  milestones: ReactNode[];
  color?: string;
  vertical?: boolean;
}

function Timeline({ milestones, color, vertical = false }: TimelineProps) {
  return (
    <ul
      className={clsx("timeline", {
        "timeline-vertical": vertical,
      })}
    >
      {milestones.map((milestone, index) => (
        <li key={`milestone-${index}`}>
          {index !== 0 && <hr className={clsx({ [`bg-${color}`]: color })} />}
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 12"
              fill="currentColor"
              className={clsx("w-3 h-3", { [`text-${color}`]: color })}
            >
              <circle cx="6" cy="6" r="6" />
            </svg>
          </div>
          <div className="timeline-end">{milestone}</div>
          {index !== milestones.length - 1 && (
            <hr className={clsx({ [`bg-${color}`]: color })} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Timeline;
