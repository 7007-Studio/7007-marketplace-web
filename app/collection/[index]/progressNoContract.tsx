import Link from "next/link";

export default function Progress() {
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
      {/* <Link
        href={`/collection/${params.index}/mint`}
        className="bg-white text-black font-bold text-[18px] cursor-pointer w-[290px] h-[45px] rounded flex items-center justify-center hover:opacity-60"
      >
        buy model token
      </Link> */}
      <Link
        href={`/collection/1/mint`}
        className="bg-white text-black font-bold text-[18px] cursor-pointer w-[290px] h-[45px] rounded flex items-center justify-center hover:opacity-60"
      >
        Create & Mint
      </Link>
    </div>
  );
}
