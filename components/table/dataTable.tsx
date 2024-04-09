"use client";

export default function DataTable() {
  return (
    <div className="border border-white w-full h-full rounded-md">
      <div className="py-5 border-b px-[30px] flex font-bold">offers</div>
      <div className="w-full h-full flex flex-col gap-6 px-5">
        <div className="w-full grid grid-cols-4 gap-5 pt-7 pb-5 justify-items-center content-center border-b border-grey">
          <a className="text-sm">price</a>
          <a className="text-sm">quantity</a>
          <a className="text-sm">expiration</a>
          <a className="text-sm">from</a>
        </div>
        <div className="w-full grid grid-cols-4 gap-5 pb-4 justify-items-center content-center border-b border-grey">
          <a className="">17.77 ETH</a>
          <a className="">7</a>
          <a className="">30 days</a>
          <a className="text-blue">0x77..777</a>
        </div>
      </div>
    </div>
  );
}
