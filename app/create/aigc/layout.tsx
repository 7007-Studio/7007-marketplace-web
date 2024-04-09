import Image from "next/image";

export default function AigcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-[35vh] relative">
        <Image
          src="/Mask group.png"
          alt="homeMask"
          width={1920}
          height={300}
          className="h-full w-full absolute top-0 left-0 shadow-inner"
        />
        <div className="absolute h-full w-full bg-gradient-to-b from-black/5 from-70% to-black/90" />
      </div>
      <div className="h-full w-full flex justify-center flex-col items-center">
        {children}
      </div>
    </>
  );
}
