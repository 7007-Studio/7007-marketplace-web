import { faker } from '@faker-js/faker';

export type TradingTable = {
  token: string
  price: number
  age: number
  buys: number
  sells: number
  volume: number
  makers: number
  time: number
  liquidity: number,
  fdv: number,
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newTradingTable = (): TradingTable => {
  return {
    token: faker.person?.firstName(),
    price: faker.number.int(10000),
    age: faker.number.int(40),
    buys: faker.number.int(1000),
    sells: faker.number.int(100),
    volume: faker.number.int(40),
    makers: faker.number.int(40),
    time: faker.number.int(20),
    liquidity: faker.number.int(40),
    fdv: faker.number.int(40),
  }
} 

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): TradingTable[] => {
    const len = lens[depth]!
    return range(len).map((d): TradingTable => {
      return {
        ...newTradingTable(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
