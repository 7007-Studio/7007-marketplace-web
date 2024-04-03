"use client" 

import React from 'react'
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
   
    const randomValue = Math.floor(Math.random() * 21) - 10;
    // Determine the color based on the randomValue
  const color = randomValue > 0 ? 'green' : 'red';
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
        <tr key={index} style={{ color: record.status === 'buy' ? 'green' : 'red' }}>
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


  
  return (
    <>
    { isChecked &&     
        <div className='flex flex-col'>
            <div className='grid grid-cols-6 gap-4'>
                <div></div>
                <div>ADVANCED TRADE MODE</div>
                <div></div>
                <div></div>
                <div>
                    <div className='flex justify-center items-start'>
                        <div className='flex justify-center items-center gap-4'>
                            MODE: BASIC
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
                            ADVANCED
                        </div>
                    
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-4'>
                <div></div>
                <div className='col-span-4'>
                    <div className='w-1/2 flex justify-start items-center'>
                        <ul className="menu menu-vertical lg:menu-horizontal">
                        <li className='border-r-2 border-gray-50'><a>1HR</a></li>
                        <li className='border-r-2 border-gray-50'><a>6HR</a></li>
                        <li className='border-r-2 border-gray-50'><a>24HR</a></li>
                        <li className='border-r-2 border-gray-50'><a>7DAYS</a></li>
                        <li className='border-r-2 border-gray-50'><a>30DAYS</a></li>
                        <li><a>ALL</a></li>
                        </ul>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col'>
                            <div className='w-[850px] h-[569px] border-2 border-black'></div>
                            <div className="overflow-x-auto w-[850px] h-[400px] border-2 border-black">
                                <table className="table overflow-y-auto">
                                    {/* head */}
                                    <thead>
                                    <tr>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                        <th>list</th>
                                    </tr>
                                    </thead>
                                    <tbody className='overflow-y-auto'>
                                        {renderTradingRecords(fakeTradingRecords)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 px-5 w-[427px]'>
                            <div className='flex flex-col  gap-4'>
                                <div className='flex flex-col justify-center gap-2'>
                                    <div>PRICE USD</div>
                                    <div>20.89 $</div>
                                </div>
                                <div className='flex flex-col justify-center gap-2'>
                                    <div>PRICE ETH</div>
                                    <div>0.005907 ETH</div>
                                </div>
                            </div>
                            <hr className='border-black border-solid border-1 my-2'/>
                            <div className='flex flex-col gap-2 w-8/12'>
                                <div className='flex gap-4 justify-between'>
                                    <div className='flex flex-col justify-center gap-1'>
                                        <div>5m</div>
                                        <div style={{ color: color }}>{randomValue} %</div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-1'>
                                        <div>30m</div>
                                        <div style={{ color: color }}>{randomValue} %</div>
                                    </div>
                                </div>
                                <div className='flex gap-4 justify-between'>
                                    <div className='flex flex-col justify-center gap-1'>
                                        <div>1H</div>
                                        <div style={{ color: color }}>{randomValue} %</div>
                                    </div>
                                    <div className='flex flex-col justify-center gap-1'>
                                        <div>24H</div>
                                        <div style={{ color: color }}>{randomValue} %</div>
                                    </div>
                                </div>
                            </div>
                            <hr className='border-black border-solid border-1 my-2'/>
                            <div className='flex  gap-4'>
                                <div className='flex flex-col justify-center gap-2'>
                                    <div>MARKETCAP</div>
                                    <div>$ 20.80M</div>
                                </div>
                                <div className='flex flex-col justify-center gap-2'>
                                    <div>LIQUIDITY</div>
                                    <div>$ 1.62M</div>
                                </div>
                            </div>
                            <hr className='border-black border-solid border-1 my-2'/>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col justify-center gap-2'>
                                    <div>POOLED ETH</div>
                                    <div>$ 20.80M</div>
                                </div>
                                <div className='flex flex-col justify-center gap-2'>
                                    <div>POOLED $SIMP</div>
                                    <div>$ 20.80M</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='flex mt-4'>
                        <div className='flex justify-between w-[50%] items-center'>
                            <div className="flex flex-col w-1/3">
                                <div className='border-2 border-black  flex justify-evenly items-center h-[90px] rounded-lg'>
                                    <div>1.22544521122</div>
                                    <img className='w-[41px]' src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" alt="" />
                                </div>
                                <div className='flex items-center justify-end'>SOLD : 47.515211 MAX</div>
                            </div>
                            
                            <ChevronRight className='scale-150'/>
                            <div className="flex flex-col w-1/3">
                            <div className='border-2 border-black  flex justify-evenly items-center h-[90px] rounded-lg'>
                                    <div>1.22544521122</div>
                                    <img className='w-[41px]' src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png" alt="" />
                                </div>
                                <div className='flex items-center justify-end'>SOLD : 47.515211 MAX</div>
                            </div>
                        </div>
                        <div className='flex w-[30%] items-center justify-center'><button className="btn bg-white w-[250px] h-[45px] flex items-center justify-center">TRADE</button></div>
                    </div>
                </div>
               
            </div>
        </div>
    }
    { !isChecked &&     
        <div className='flex flex-col'>
            <div className='grid grid-cols-6 gap-4'>
                <div></div>
                <p>BASIC TRADING MODE</p>
                <div></div>
                <div></div>
                <div className='flex justify-center items-start'>
                    <div className='flex justify-center items-center gap-4'>
                        MODE: BASIC
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
                        ADVANCED
                    </div>
                   
                </div>
                <div></div>
            </div>
            <div className='grid grid-cols-6 gap-4'>
                <div></div>
                <div className='col-span-4 flex flex-col justify-center gap-2'>
                    <div>
                        <div className='grid grid-cols-6 gap-4'>
                            <div></div>
                            <div>YOU PAY</div>
                        </div>
                        <div className='grid grid-cols-6 gap-4'>
                            <div></div>
                            <div className='col-span-3 flex justify-between items-center'>
                                
                                <div className='flex justify-between border-2 border-black rounded-lg w-[313px] h-[79px]'>
                                    <input type="text" placeholder="Type here" className="h-full input w-full max-w-xs border-none focus:outline-none" />
                                    <p className='flex items-end p-2'>ETH</p>
                                </div>
                                
                                <div className='flex flex-col w-[220px]'>
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn m-1 w-[220px] h-[40px]"><BadgeDollarSign /> ETH <ChevronDown /></div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a>Item 1</a></li>
                                            <li><a>Item 2</a></li>
                                        </ul>
                                    </div>
                                    <div className='w-[220px] flex justify-end gap-4'>
                                        <p>BALANCE</p>
                                        <p>5.77.77 LEFT</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-6 gap-4'>
                        <div></div>
                        <div className='col-span-3 flex justify-center  my-5'> <ChevronDown /></div>
                    </div>    

                    <div>
                        <div className='grid grid-cols-6 gap-4'>
                            <div></div>
                            <div>You Recieved</div>
                        </div>
                        <div className='grid grid-cols-6 gap-4'>
                            <div></div>
                            <div className='col-span-3 flex justify-between items-center'>
                                
                                <div className='flex justify-between border-2 border-black rounded-lg w-[313px] h-[79px]'>
                                    <input type="text" placeholder="Type here" className="h-full input w-full max-w-xs border-none focus:outline-none" />
                                    <p className='flex items-end p-2'>ETH</p>
                                </div>
                                
                                <div className='flex flex-col w-[220px]'>
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn m-1 w-[220px] h-[40px]">CHOOSE TOKEN <ChevronDown /></div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a>Item 1</a></li>
                                            <li><a>Item 2</a></li>
                                        </ul>
                                    </div>
                                    <div className='w-[220px] flex justify-end gap-4'>
                                        <p>BALANCE</p>
                                        <p>5.77.77 LEFT</p>
                                    </div>
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
