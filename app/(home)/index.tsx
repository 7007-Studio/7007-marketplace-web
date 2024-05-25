"use client";
import { useAccount } from "wagmi";

import { modelData, ModelIndex } from "@/constants/constants";
import useNftContracts from "@/hooks/useNftContracts";
import NFTCard from "@/components/nftCard";
import EmptyCard from "@/components/emptyCard";
import Selector, { SelectorEntry } from "@/components/ui/selector";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import ModelCard from "@/components/modelCard";
import { useModelInfoStore } from "../stats/store";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import axios from "axios";
import { Listing, ModelDetail, ModelList } from "@/types";
import { useRouter } from "next/navigation";
import useTotalTokenIDs from "@/hooks/useTotalTokenIDs";
import useValidListings from "@/hooks/useValidListings";
import { getModelsData } from "@/helpers";

function HomeModel({ windowSize }: { windowSize: number }) {
  const { chainId } = useAccount();
  const modelList: ModelDetail[] | undefined = getModelsData(chainId);
  const swiperRef = useRef<any>(null);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const emptyCardList = [...Array(4).keys()];
  const [taskStatus, setTaskStatus] = useState([]);
  const { setModel } = useModelInfoStore();
  const [selector1, setSelector1] = useState<SelectorEntry[]>([
    { id: "1", label: "All", selected: true },
    { id: "2", label: "Text-To-Image", selected: false },
    { id: "3", label: "Text-To-Text", selected: false },
  ]);
  const handleSelector1 = (id: string) => {
    setSelector1(
      selector1.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };
  const handleModelClick = (item: any) => {
    setModel({ id: item.id, author: item.modelAuthorID, name: item.modelName });
  };

  const filteredModelList = modelList?.filter((model) => {
    const selectedFilter = selector1.find((item) => item.selected);
    if (selectedFilter?.label === "All") {
      return true;
    }
    return model.type === selectedFilter?.label;
  });
  // const handleFetchData = async () => {
  //   try {
  //     const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?status=Done&action=train`;

  //     const response = await axios.get(apiUrl, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = response.data;
  //     const filteredData = data.filter((item: any) => item.status === "Done");

  //     setTaskStatus(filteredData);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   handleFetchData();
  // }, []);

  return (
    <div className="flex flex-col w-full items-center gap-[72px]">
      <div className="w-[75%]">
        <Selector onChange={handleSelector1} options={selector1} />
      </div>
      {/* <div className="relative hidden h-full w-full transition-all lg:flex">
        <Swiper
          slidesPerView={windowSize > 1600 ? 5 : windowSize > 1280 ? 4 : 3}
          spaceBetween={25}
          modules={[Pagination]}
          className="h-full w-full max-w-[80%] cursor-grab flex justify-center"
          onSwiper={(swiper: any) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper: any) => {
            setSwiperIndex(swiper.activeIndex);
            setIsEnd(swiper.isEnd);
          }}
        >
          {modelList.map((model: ModelDetail, index) => (
            <SwiperSlide key={index} onClick={() => handleModelClick(model)}>
              <ModelCard modelData={model} />
            </SwiperSlide>
          )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
        </Swiper>

        <div className="absolute top-1/2 -translate-y-1/2 z-20 flex w-full px-16 justify-between">
          <Image
            src="/arrow.svg"
            alt="arrow"
            width={25}
            height={88}
            color="white"
            onClick={
              swiperIndex === 0 ? () => {} : () => swiperRef.current.slidePrev()
            }
            className={`rotate-180 ${swiperIndex === 0 ? "opacity-20 cursor-default" : "opacity-100 hover:opacity-60 cursor-pointer"}`}
          />
          <Image
            src="/arrow.svg"
            alt="arrow"
            width={25}
            height={88}
            onClick={isEnd ? () => {} : () => swiperRef.current.slideNext()}
            className={`${isEnd ? "opacity-20 cursor-default" : "opacity-100 hover:opacity-60 cursor-pointer"}`}
          />
        </div>
      </div> */}
      <div className="flex w-full h-full px-16 justify-center gap-10 flex-wrap">
        {filteredModelList?.map((model: ModelDetail, index) => (
          <ModelCard modelData={model} key={index} />
        )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
      </div>

      {/* {(taskStatus && (
        <div className="relative hidden h-full w-full transition-all lg:flex">
          <Swiper
            slidesPerView={windowSize > 1600 ? 5 : windowSize > 1280 ? 4 : 3}
            spaceBetween={25}
            modules={[Pagination]}
            className="h-full w-full max-w-[80%] cursor-grab flex justify-center"
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: any) => {
              setSwiperIndex(swiper.activeIndex);
              setIsEnd(swiper.isEnd);
            }}
          >
            {taskStatus.map((item: ModelList, index) => (
              <SwiperSlide key={index} onClick={() => handleModelClick(item)}>
                <ModelCard modelIndex={ModelIndex} modelInfo={item} />
              </SwiperSlide>
            )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
          </Swiper>

          <div className="absolute top-1/2 -translate-y-1/2 z-20 flex w-full px-16 justify-between">
            <Image
              src="/arrow.svg"
              alt="arrow"
              width={25}
              height={88}
              color="white"
              onClick={
                swiperIndex === 0
                  ? () => {}
                  : () => swiperRef.current.slidePrev()
              }
              className={`rotate-180 ${swiperIndex === 0 ? "opacity-20 cursor-default" : "opacity-100 hover:opacity-60 cursor-pointer"}`}
            />
            <Image
              src="/arrow.svg"
              alt="arrow"
              width={25}
              height={88}
              onClick={isEnd ? () => {} : () => swiperRef.current.slideNext()}
              className={`${isEnd ? "opacity-20 cursor-default" : "opacity-100 hover:opacity-60 cursor-pointer"}`}
            />
          </div>
        </div>
      )) || (
        <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[85%] gap-4">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )} */}
    </div>
  );
}
function Rank() {
  const router = useRouter();
  const [type, setType] = useState([
    { id: "1", label: "Trending", selected: true },
    { id: "2", label: "Top", selected: false },
  ]);
  const [time, setTime] = useState([
    { id: "1hr", label: "1hr", selected: true },
    { id: "6hr", label: "6hr", selected: false },
    { id: "24hr", label: "24hr", selected: false },
    { id: "7day", label: "7day", selected: false },
  ]);
  const changeTime = (id: string) => {
    setTime(
      time.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };
  const changeType = (id: string) => {
    setType(
      type.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };
  const { setModel } = useModelInfoStore();
  const handleModelClick = (item: any) => {
    setModel({ id: item.id, author: item.modelAuthorID, name: item.modelName });
  };
  const [modelList, setModelList] = useState<ModelList[]>([]);
  const handleFetchData = async () => {
    try {
      const apiUrl = `https://f3593qhe00.execute-api.ap-northeast-1.amazonaws.com/dev/tasks_status?status=Done&action=train`;

      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      const filteredData = data.filter((item: any) => item.status === "Done");

      setModelList(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <div className="flex flex-col w-full items-center gap-[72px]">
      <div className="w-[75%] flex items-center gap-5">
        {type.map((item, index) => (
          <div
            key={item.id}
            className={`cursor-pointer flex items-center font-bold text-base gap-5 ${
              item.selected ? "text-white" : "text-white/60"
            }`}
            onClick={() => changeType(item.id)}
          >
            {item.label}
            {index !== type.length - 1 && (
              <div className="h-[30px] w-[1.5px] bg-grey" />
            )}
          </div>
        ))}
        <div className="flex-1 h-[1.5px] bg-grey" />
        <div className="gap-5 flex">
          {time.map((item, index) => (
            <div
              key={item.id}
              className={`cursor-pointer flex items-center font-bold text-base gap-5 ${
                item.selected ? "text-white" : "text-white/60"
              }`}
              onClick={() => changeTime(item.id)}
            >
              {item.label}
              {index !== time.length - 1 && (
                <div className="h-[30px] w-[1.5px] bg-grey" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* TODO:style hardcode */}
      <div className="flex max-w-[85%] gap-5 w-full">
        <div className="w-[48%] flex flex-col h-full border border-white rounded-lg">
          <div className="h-16 w-full flex items-center border-b border-white text-sm font-bold px-4">
            <div className="w-[8%] flex items-center justify-center">Rank</div>
            <div className="w-[40%] flex items-center justify-center">
              model
            </div>
            <div className="w-[23%] flex items-center justify-center">
              floor price
            </div>
            <div className="w-[17%] flex items-center justify-center">
              volume
            </div>
            <div className="w-[12%] flex items-center justify-center">
              quantity
            </div>
          </div>
          {modelList.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="h-4/5 w-full flex items-start border-b border-white px-4 py-9 cursor-pointer hover:bg-white/10 transition-all"
              onClick={() => {
                handleModelClick(item);
                router.push(`/collection/${item.id}&${item.modelAuthorID}`);
              }}
            >
              <div className="w-[8%] flex items-center justify-center text-lg">
                {index + 1}
              </div>
              <div className="w-[40%] flex items-center justify-center text-base font-bold">
                {item.modelName}
              </div>
              <div className="w-[23%] flex items-center justify-center">
                0.0007 ETH
              </div>
              <div className="w-[17%] flex items-center justify-center">
                7 ETH
              </div>
              <div className="w-[12%] flex items-center justify-center">7</div>
            </div>
          ))}
        </div>
        <div className="w-[48%] flex flex-col h-full border border-white rounded-lg">
          <div className="h-16 w-full flex items-center border-b border-white text-sm font-bold px-4">
            <div className="w-[8%] flex items-center justify-center">Rank</div>
            <div className="w-[40%] flex items-center justify-center">
              model
            </div>
            <div className="w-[23%] flex items-center justify-center">
              floor price
            </div>
            <div className="w-[17%] flex items-center justify-center">
              volume
            </div>
            <div className="w-[12%] flex items-center justify-center">
              quantity
            </div>
          </div>
          {modelList.slice(5, 10).map((item, index) => (
            <div
              key={index}
              className="h-4/5 w-full flex items-start border-b border-white px-4 py-9 cursor-pointer hover:bg-white/10 transition-all"
              onClick={() => {
                handleModelClick(item);
                router.push(`/collection/${item.id}&${item.modelAuthorID}`);
              }}
            >
              <div className="w-[8%] flex items-center justify-center text-lg">
                {index + 6}
              </div>
              <div className="w-[40%] flex items-center justify-center text-base font-bold">
                {item.modelName}
              </div>
              <div className="w-[23%] flex items-center justify-center">
                0.0007 ETH
              </div>
              <div className="w-[17%] flex items-center justify-center">
                7 ETH
              </div>
              <div className="w-[12%] flex items-center justify-center">7</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Ora({ windowSize }: { windowSize: number }) {
  // TODO: 改成顯示有在 On chain AI oracle 上的模型
  const [type, setType] = useState([
    { id: "1", label: "OAO verified", selected: true },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
  ]);
  const changeType = (id: string) => {
    setType(
      type.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };
  const swiperRef = useRef<any>(null);
  const { chain } = useAccount();
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const emptyCardList = [...Array(4).keys()];
  const { nftContracts } = useNftContracts({
    chainId: chain?.id,
  });
  const { tokenIds } = useTotalTokenIDs({ nftContracts });
  const { listings, refetch } = useValidListings({
    chainId: chain?.id,
  });
  return (
    <div className="flex flex-col w-full items-center gap-[72px]">
      <div className="w-[75%]">
        <Selector onChange={changeType} options={type} single={true} />
      </div>
      {(nftContracts && (
        <div className="flex flex-wrap w-[75%] justify-items-center justify-center gap-12 ">
          {tokenIds.map(({ id, contract }: any) => (
            <NFTCard
              key={`${contract}-${id}`}
              nftContract={contract}
              tokenId={BigInt(id)}
              listing={listings?.find(
                (l: Listing) => l.tokenId === id && l.assetContract === contract
              )}
              refetch={refetch}
            />
          )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
        </div>
      )) || (
        <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[85%] gap-4">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )}

      {/* {(nftContracts && (
        <div className="relative hidden h-full w-full transition-all lg:flex">
          <Swiper
            slidesPerView={windowSize > 1600 ? 5 : windowSize > 1280 ? 4 : 3}
            spaceBetween={25}
            modules={[Pagination]}
            className="h-full w-full max-w-[80%] cursor-grab"
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper: any) => {
              setSwiperIndex(swiper.activeIndex);
              setIsEnd(swiper.isEnd);
            }}
          >
            {tokenIds.map(({ id, contract }: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="w-full flex justify-center">
                  <NFTCard
                    key={`${contract}-${id}`}
                    nftContract={contract}
                    tokenId={BigInt(id)}
                    listing={listings?.find(
                      (l: Listing) =>
                        l.tokenId === id && l.assetContract === contract
                    )}
                  />
                </div>
              </SwiperSlide>
            )) || emptyCardList.map((l) => <EmptyCard key={l} />)}
          </Swiper>

          <div className="absolute top-1/2 -translate-y-1/2 z-20 flex w-full px-16 justify-between">
            <Image
              src="/arrow.svg"
              alt="arrow"
              width={25}
              height={88}
              color="white"
              onClick={
                swiperIndex === 0
                  ? () => {}
                  : () => swiperRef.current.slidePrev()
              }
              className={`rotate-180 ${swiperIndex === 0 ? "opacity-20 cursor-default" : "opacity-100 hover:opacity-60 cursor-pointer"}`}
            />
            <Image
              src="/arrow.svg"
              alt="arrow"
              width={25}
              height={88}
              onClick={isEnd ? () => {} : () => swiperRef.current.slideNext()}
              className={`${isEnd ? "opacity-20 cursor-default" : "opacity-100 hover:opacity-60 cursor-pointer"}`}
            />
          </div>
        </div>
      )) || (
        <div className="grid grid-cols-3 2xl:grid-cols-4 max-w-[85%] gap-4">
          {emptyCardList.map((l) => (
            <EmptyCard key={l} />
          ))}
        </div>
      )} */}
    </div>
  );
}
function Going({ windowSize }: { windowSize: number }) {
  const [type, setType] = useState([
    { id: "1", label: "on going", selected: true },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
  ]);
  const changeType = (id: string) => {
    setType(
      type.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };

  return (
    <div className="flex flex-col w-full items-center gap-[72px]">
      <div className="w-[75%]">
        <Selector onChange={changeType} options={type} single={true} />
      </div>
    </div>
  );
}
function Trending({ windowSize }: { windowSize: number }) {
  const [type, setType] = useState([
    { id: "1", label: "Trending in text to music", selected: true },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
    { id: "", label: "", selected: false },
  ]);
  const changeType = (id: string) => {
    setType(
      type.map((item) => {
        if (item.id === id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };

  return (
    <div className="flex flex-col w-full items-center gap-[72px]">
      <div className="w-[75%]">
        <Selector onChange={changeType} options={type} single={true} />
      </div>
    </div>
  );
}

const HomePage = () => {
  const [windowSize, setWindowSize] = useState(1024);

  useEffect(() => {
    if (typeof window !== "undefined") setWindowSize(window.innerWidth);

    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setWindowSize(width);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [typeof window]);

  return (
    <div className="h-full w-full flex justify-center flex-col gap-[150px] items-center">
      <HomeModel windowSize={windowSize} />
      {/* <Rank /> */}
      <Ora windowSize={windowSize} />
      {/* <Going windowSize={windowSize} /> */}
      {/* <Trending windowSize={windowSize} /> */}
    </div>
  );
};

export default HomePage;
