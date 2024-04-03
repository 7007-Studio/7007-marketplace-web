"use client";

import Card from "@/components/ui/card";

// skeleton
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const emptyCard = () => {
  return (
    <Card className="w-[258px]">
      <div>
        <figure className="pb-[100%] relative">
          <div className="w-full aspect-square absolute left-0 top-[-5px]">
            <Skeleton height="100%" baseColor="#131313" highlightColor="#000" />
          </div>
        </figure>
        <div className="card-body flex-grow gap-4">
          <h3 className="heading-md">
            {<Skeleton count={1} baseColor="grey" />}
          </h3>
          <p className="">{<Skeleton count={3} baseColor="grey" />}</p>
          <div className="flex gap-10">
            <p className="">{<Skeleton baseColor="grey" />}</p>
            <p className="">{<Skeleton baseColor="grey" />}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default emptyCard;
