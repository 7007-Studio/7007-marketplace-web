export default function Tabs() {
  return (
    <ul className="menu menu-vertical lg:menu-horizontal rounded-box ">
      <li className="mr-2">
        <a className="hover:bg-white hover:text-black ">ALL</a>
      </li>
      <li className="mr-2">
        <a className="hover:bg-white hover:text-black">MODEL</a>
      </li>
      <li>
        <a className="hover:bg-white hover:text-black">NFT</a>
      </li>
    </ul>
  );
}
