import useReadAigcContracts from "@/hooks/useReadAigcContracts";
import { Address, zeroAddress } from "viem";

export default function Progress({
  nftContract = zeroAddress,
}: {
  nftContract?: Address;
}) {
  return (
    <div className="flex gap-9 justify-between items-center pt-10 pb-16">
      <div className="flex flex-col flex-1 gap-3">
        <div className="flex w-full justify-between text-[18px] pl-3">
          <a>32.2% minted</a>
          <a>35 / 100</a>
        </div>
        <div className="h-9 w-full bg-grey rounded-lg flex items-center gap-2 px-6">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="h-[6px] w-[5%] bg-white rounded-sm" />
          ))}
        </div>
        {/* <progress
          className="progress w-full h-10 bg-white"
          value="35"
          max="100"
        ></progress> */}
        <a className="pl-3">Mint starts march 5 at 4:30 AM MST</a>
      </div>
      <button className="bg-white text-black font-bold text-[18px] w-[290px] h-[45px] rounded flex items-center justify-center">
        buy model token
      </button>
    </div>
  );
}
