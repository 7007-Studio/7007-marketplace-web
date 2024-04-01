"use client" 

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react';
import { BadgeDollarSign } from 'lucide-react';
export default function BasicTrading() {
    const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
  
  return (
    <>
    { isChecked &&     
        <div className='mx-auto'>
        <div className='flex w-full justify-between'>
            <p>ADVANCED TRADE MODE</p>
            <div>
            <label className='flex cursor-pointer select-none items-center'>
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
            </div>
        </div>

        <div className='mx-auto flex flex-col justify-center'>
            <div className='flex justify-center items-center gap-8'>
            <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box w-[85%]">
            <li><a>TRENDINGS</a></li>
            <li><a>1HR</a></li>
            <li><a>6HR</a></li>
            <li><a>24HR</a></li>
            <li><a>7DAYS</a></li>
            <li><a>30DAYS</a></li>
            <li><a>ALL</a></li>
        </ul>
            </div>
            <div>
                <div className='w-[850px] h-[569px] border-2 border-black'></div>
                <div className="overflow-x-auto w-[850px] h-[400px] border-2 border-black">
                    <table className="table">
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
                        <tbody>
                        {/* row 1 */}
                        <tr className="bg-base-200">
                            <td>BUY</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <td>SELL</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Purple</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Red</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

        </div>
    }
    { !isChecked &&     
        <div className='mx-auto'>
        <div className='flex w-full justify-between'>
            <p>BASIC TRADING MODE</p>
            <div>
            <label className='flex cursor-pointer select-none items-center'>
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
            </div>
        </div>

        <div className='mx-auto flex flex-col justify-center'>
        <p>YOU PAY</p>
        <div className='flex justify-center items-center gap-8'>
            
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
                <div className='w-[220px] flex justify-center gap-4'>
                    <p>BALANCE</p>
                    <p>5.77.77 LEFT</p>
                </div>
            </div>
            
        </div>

        <ChevronDown />
        
        <div className='flex justify-center items-center gap-8'>
            <p>You Recieved</p>
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
                <div className='w-[220px] flex justify-center gap-4'>
                    <p>BALANCE</p>
                    <p>5.77.77 LEFT</p>
                </div>
            </div>
            
        </div>
        </div>

        </div>
    }
    </>
  )
}
