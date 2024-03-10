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
            <Skeleton height="100%" />
          </div>
        </figure>
        <div className="card-body flex-grow gap-2">
          <h3 className="heading-md">{<Skeleton count={2} />}</h3>
          <p className="pb-4">{<Skeleton count={10} />}</p>
        </div>
      </div>
    </Card>
  );
};

export default emptyCard;
