import React from "react";
import HeadingMedium from "../text/headingMedium";
import Timeline from "./timeline";

const KeyEvent = () => {
  return (
    <div>
      <div className="text-lg">[Key Event]</div>
      <div>2024.1.15</div>
      <div>0.00</div>
    </div>
  );
};

const Distribution = () => {
  return (
    <div className="pl-8 py-20">
      <span>2024.1.15</span>
      <span>0.00</span>
    </div>
  );
};

const ModelTimeline = () => {
  return (
    <div className="py-20 px-12 rounded-md bg-white">
      <HeadingMedium>Model Timeline</HeadingMedium>
      <div className="pb-28">
        <Timeline
          milestones={[
            <KeyEvent key="1" />,
            <KeyEvent key="2" />,
            <KeyEvent key="3" />,
            <KeyEvent key="4" />,
          ]}
          color="primary"
        />
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <HeadingMedium>Distribution Timeline</HeadingMedium>
          <div className="flex">
            <Timeline
              milestones={[
                <Distribution key="1" />,
                <Distribution key="2" />,
                <Distribution key="3" />,
              ]}
              vertical
            />
          </div>
        </div>
        <div className="flex-1">
          <HeadingMedium>Distribution Allocation</HeadingMedium>
        </div>
      </div>
    </div>
  );
};

export default ModelTimeline;
