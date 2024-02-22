import React from "react";
import Timeline from "./timeline";
import AllocationChart from "./allocationChart";

const KeyEvent = () => {
  return (
    <div>
      <div className="text-lg pt-7 pb-5">[Key Event]</div>
      <div>2024.1.15</div>
      <div>0.00</div>
    </div>
  );
};

const Distribution = () => {
  return (
    <div className="flex justify-between items-center pl-8 py-10 ">
      <div className="flex gap-x-8">
        <span>2024.1.15</span>
        <span>0.00</span>
      </div>
      <div className="flex items-center gap-x-5">
        <button className="btn btn-secondary btn-sm">Status</button>
        <span>7.77%</span>
      </div>
    </div>
  );
};

const ModelTimeline = () => {
  return (
    <div className="py-12 px-12 rounded-md bg-white">
      <h3 className="heading-md">Model Timeline</h3>
      <div className="pt-12 pb-28">
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
      <div className="flex flex-row gap-x-12">
        <div className="flex-1">
          <h3 className="heading-md">Distribution Timeline</h3>
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
          <h3 className="heading-md">Distribution Allocation</h3>
          <div className="py-10">
            <div className="h-[200px]">
              <AllocationChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTimeline;
