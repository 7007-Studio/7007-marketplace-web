"use client" 

import React, { useState } from 'react'
import { ChevronDown, BadgeDollarSign, ChevronRight } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { create } from 'zustand'
interface CheckboxState {
    isChecked: boolean;
  }
  
  interface CheckboxActions {
    setIsChecked: (isChecked: boolean) => void;
  }
  
  const useCheckboxStore = create<CheckboxState & CheckboxActions>((set) => ({
    isChecked: false,
    setIsChecked: (isChecked) => set({ isChecked }),
  }));
import { faker } from '@faker-js/faker';
import { Tienne } from 'next/font/google';

export type TradingRecord = {
    amount: number
    price: number
    status: 'buy' | 'sell'
    link: string
    createdAt: Date
  }

  const newTradingRecord = (): TradingRecord => {
    return {
      amount: parseFloat(faker.finance.amount()),
      price: parseFloat(faker.finance.amount()),
      createdAt: faker.date.anytime(),
      status: faker.helpers.shuffle<TradingRecord['status']>([
        'buy',
        'sell',
      ])[0]!,
      link: faker.finance.ethereumAddress(),
    }
  } 

export default function BasicTrading() {
    const { isChecked, setIsChecked } = useCheckboxStore();
    const [timeFilter, setTimeFilter] = useState('24h');
    const [clickedItem, setClickedItem] = useState<string | null>(null);

    const randomValue = Math.floor(Math.random() * 21) - 10;
    // Determine the color based on the randomValue
  const color = randomValue > 0 ? '#1D9E4B' : '#F64646';
      // Generate an array of fake trading records
  const generateFakeTradingRecords = (count: number): TradingRecord[] => {
    const records: TradingRecord[] = [];
    for (let i = 0; i < count; i++) {
      records.push(newTradingRecord());
    }
    return records;
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

   // Render the fake trading records in table rows
   const renderTradingRecords = (records: TradingRecord[]) => {
    return records.map((record, index) => (
        <tr key={index} style={{ color: record.status === 'buy' ? '#1D9E4B' : '#F64646' }}>
            <td>{record.status}</td>
            <td>{record.createdAt.toLocaleString()}</td>
            <td>{record.price}</td>
            <td>{record.amount}</td>
            <td style={{ color: '#2B8BFC' }}> <a href={`https://etherscan.io/address/${record.link}`}><ExternalLink /></a></td> {/* Example currency */}
            <td style={{ color: '#2B8BFC' }}> <a href={`https://etherscan.io/address/${record.link}`}><ExternalLink /></a></td> {/* Example currency */}
        </tr>
    ));
  };

  // Generate fake trading records
  const fakeTradingRecords = generateFakeTradingRecords(10);

  const handleClickTimeFilter = (timeFilter: string) => {
    setClickedItem(timeFilter); 
  }
  
  return (
    
    <>
    <div className='grid grid-cols-12 gap-4 font-bold'>
        <div></div>
        <div className='col-span-4 '>{ isChecked ? 'ADVANCED TRADE MODE' : 'BASIC TRADE MODE'}</div>
        <div className='col-span-3'></div>
        <div className='col-span-4'>
            <div className='flex justify-center items-start'>
                <div className='flex justify-center items-center gap-4'>
                    MODE:
                    <span style={{ color: isChecked ? '' : '#2B8BFC' }}>BASIC</span> 
                    <label className='flex cursor-pointer select-none'>
                        <div className='relative'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className='sr-only'
                            />
                            <div className='block h-8 w-14 rounded-full bg-[#E5E7EB]'></div>
                            <div className='dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition'></div>
                        </div>
                    </label>
                    <span style={{ color: isChecked ? '#2B8BFC' : '' }}>ADVANCED</span>
                    
                </div>
            
            </div>
        </div>
    </div>

    { isChecked &&
    <>     
        <div className='grid grid-cols-12 gap-4'>
            <div></div>
            <div className='col-span-6 2xl:col-span-8'>
                <div className='2xl:w-1/2 flex justify-start items-center'>
                    <ul className="menu menu-vertical lg:menu-horizontal text-white/50">
                        <li 
                            className='border-r-2 border-grey'
                            onClick={() => handleClickTimeFilter('1')}
                        ><a className={clickedItem === '1' ? 'text-white' : ''}>1HR</a></li>
                        <li 
                            className='border-r-2  border-grey'
                            onClick={() => handleClickTimeFilter('6')}
                        ><a className={clickedItem === '6' ? 'text-white' : ''}>6HR</a></li>
                        <li 
                            className='border-r-2  border-grey'
                            onClick={() => handleClickTimeFilter('24')}
                        ><a className={clickedItem === '24' ? 'text-white' : ''}>24HR</a></li>
                        <li 
                            className='border-r-2  border-grey'
                            onClick={() => handleClickTimeFilter('168')}
                        ><a className={clickedItem === '168' ? 'text-white' : ''}>7DAYS</a></li>
                        <li 
                            className='border-r-2  border-grey'
                            onClick={() => handleClickTimeFilter('720')}
                        ><a className={clickedItem === '720' ? 'text-white' : ''}>30DAYS</a></li>
                        <li 
                            className='border-r-2  border-grey'
                            onClick={() => handleClickTimeFilter('1000000')}
                        ><a className={clickedItem === '1000000' ? 'text-white' : ''}>ALL</a></li>
                    </ul>
                </div>
                <div className='flex'>
                    <div className='flex flex-col border-2'>
                        <div className='w-[750px] 2xl:w-[850px] h-[569px] border-2 border-white'></div>
                        <div className="overflow-hidden w-[750px] 2xl:w-[850px] h-[400px] border-2 border-black">
                            <table className="table">
                                {/* head */}
                                <thead className='border-b-2 border-white'>
                                    <tr className='text-white'>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                    </tr>
                                </thead>
                                <tbody className='overflow-hidden'>
                                    {renderTradingRecords(fakeTradingRecords)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 px-5 w-[427px] font-bold'>
                        <div className='flex flex-col  gap-4'>
                            <div className='flex flex-col justify-center gap-2'>
                                <div className='text-white/60'>PRICE USD</div>
                                <div>20.89 $</div>
                            </div>
                            <div className='flex flex-col justify-center gap-2'>
                                <div className='text-white/60'>PRICE ETH</div>
                                <div>0.005907 ETH</div>
                            </div>
                        </div>
                        <hr className='border-grey border-solid border-2 my-2'/>
                        <div className='flex flex-col gap-2 w-8/12'>
                            <div className='flex gap-4 justify-between'>
                                <div className='flex flex-col justify-center gap-1'>
                                    <div className='text-white/60'>5m</div>
                                    <div style={{ color: color }}>{randomValue} %</div>
                                </div>
                                <div className='flex flex-col justify-center gap-1'>
                                    <div className='text-white/60'>30m</div>
                                    <div style={{ color: color }}>{randomValue} %</div>
                                </div>
                            </div>
                            <div className='flex gap-4 justify-between'>
                                <div className='flex flex-col justify-center gap-1'>
                                    <div className='text-white/60'>1H</div>
                                    <div style={{ color: color }}>{randomValue} %</div>
                                </div>
                                <div className='flex flex-col justify-center gap-1'>
                                    <div className='text-white/60'>24H</div>
                                    <div style={{ color: color }}>{randomValue} %</div>
                                </div>
                            </div>
                        </div>
                        <hr className='border-grey border-solid border-2 my-2'/>
                        <div className='flex  gap-4'>
                            <div className='flex flex-col justify-center gap-2'>
                                <div className='text-white/60'>MARKETCAP</div>
                                <div>$ 20.80M</div>
                            </div>
                            <div className='flex flex-col justify-center gap-2'>
                                <div className='text-white/60'>LIQUIDITY</div>
                                <div>$ 1.62M</div>
                            </div>
                        </div>
                        <hr className='border-grey border-solid border-2 my-2'/>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col justify-center gap-2'>
                                <div className='text-white/60'>POOLED ETH</div>
                                <div>$ 20.80M</div>
                            </div>
                            <div className='flex flex-col justify-center gap-2'>
                                <div className='text-white/60'>POOLED $SIMP</div>
                                <div>$ 20.80M</div>
                            </div>
                        </div>
                    </div>

                </div>
               
            </div>
            
        </div>
        <div>
        <div className='grid grid-cols-12 gap-4'>
            <div></div>
            <div className='col-span-8 flex items-center mt-5 justify-between w-[750px]'>
                <div className="flex flex-col w-4/12">
                    <div className='border-2 border-gray-500  flex justify-evenly items-center h-[60px] 2xl:h-[90px] rounded-lg'>
                        <div className='text-md'>1.22544521122</div>
                        <img className='w-[20px] 2xl:w-[41px]' src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" alt="" />
                    </div>
                    <div className='text-sm flex items-center justify-end mt-2'>SOLD : 47.515211 MAX</div>
                </div>
                
                <ChevronRight className='scale-100 2xl:scale-150 w-2/12'/>
                
                <div className="flex flex-col w-4/12">
                    <div className='border-2 border-gray-500  flex justify-evenly items-center h-[60px] 2xl:h-[90px] rounded-lg'>
                        <div className='text-md'>1.22544521122</div>
                        <img className='w-[20px] 2xl:w-[41px]' src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" alt="" />
                    </div>
                    <div className='text-sm flex items-center justify-end mt-2'>SOLD : 47.515211 MAX</div>
                </div>
            </div>
            <div className='col-span-2 flex items-center font-bold'><button className="btn font-bold bg-white w-[250px] h-[45px] flex items-center justify-center">TRADE</button></div>
            </div>
        </div>
    </>
    }


    { !isChecked &&     
        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-3'></div>
            <div className='col-span-8 flex flex-col gap-2'>
                <div>
                    <div className='grid grid-cols-6 gap-4 mb-2'>
                        <div className='text-white/70'>YOU PAY</div>
                    </div>
                    <div className='grid grid-cols-6 gap-4'>
                        <div className='col-span-4 flex justify-between items-center gap-2'>
                            
                            <div className='flex justify-between border-2 border-gray-700 rounded-lg w-[313px] h-[79px]'>
                                <input type="text" placeholder="Type here" className="h-full input w-full max-w-xs bg-transparent border-none focus:outline-none" />
                                <p className='flex items-end py-2 pr-4'>ETH</p>
                            </div>
                            
                            <div className='flex flex-col w-[220px]'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" style={{ backgroundColor: '#313131CC'}} className="btn m-1 w-[220px] h-[40px] text-white"><img className='w-[20px]' src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" alt="" /> ETH <ChevronDown /></div>
                                    <ul tabIndex={0} style={{ backgroundColor: '#313131CC'}} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a>Item 1</a></li>
                                        <li><a>Item 2</a></li>
                                    </ul>
                                </div>
                                <div className='w-[220px] flex justify-end gap-4 text-sm mt-2'>
                                    <p className='font-bold'>BALANCE</p>
                                    <p className='text-white/70'>5.77.77 LEFT</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-3'></div>
                    <div className='col-span-3 flex justify-center  my-5 scale-125'> <ChevronDown /></div>
                </div>    

                <div>
                    <div className='grid grid-cols-6 gap-4'>
                        <div className='text-white/70 col-span-2 mb-2'>You Recieved</div>
                    </div>
                    <div className='grid grid-cols-6 gap-4'>
                        <div className='col-span-4 flex justify-between items-center gap-2'>
                            
                        <div className='flex justify-between border-2 border-gray-700 rounded-lg w-[313px] h-[79px]'>
                                <input type="text" placeholder="Type here" className="h-full input w-full max-w-xs bg-transparent border-none focus:outline-none" />
                                <p className='flex items-end py-2 pr-4'>ETH</p>
                            </div>
                            
                            <div className='flex flex-col w-[220px]'>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" style={{ backgroundColor: '#313131CC'}} className="btn text-white m-1 w-[220px] h-[40px]">CHOOSE TOKEN <ChevronDown /></div>
                                    <ul tabIndex={0} style={{ backgroundColor: '#313131CC'}} className="dropdown-content text-white z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a>Item 1</a></li>
                                        <li><a>Item 2</a></li>
                                    </ul>
                                </div>
                                <div className='w-[220px] flex justify-end gap-4 text-sm mt-2'>
                                    <p className='font-bold'>BALANCE</p>
                                    <p className='text-white/70'>5.77.77 LEFT</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>      
            </div>
        </div>
    }
    </>
  )
}
