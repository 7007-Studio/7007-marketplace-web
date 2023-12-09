export default function Tabs() {
  return (
    <div className="flex justify-center m-5">
      <ul className="menu menu-horizontal rounded-box ">
        <li className="mr-2">
          <a className="text-white hover:bg-white hover:text-black text-lg">ALL</a>
        </li>
        <li className="mr-2">
          <a className="text-white hover:bg-white hover:text-black text-lg">MODEL</a>
        </li>
        <li>
          <a className="text-white hover:bg-white hover:text-black text-lg">NFT</a>
        </li>
      </ul>
    </div>
  );
}
