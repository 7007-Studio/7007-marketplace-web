import { faker } from '@faker-js/faker';

export type Person = {
  token: string
  price: number
  age: number
  buys: number
  sells: number
  volume: number
  makers: number
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

const newPerson = (): Person => {
  return {
    token: faker.person?.firstName(),
    price: faker.number.int(10000),
    age: faker.number.int(40),
    buys: faker.number.int(1000),
    sells: faker.number.int(100),
    volume: faker.number.int(40),
    makers: faker.number.int(40),
    liquidity: faker.number.int(40),
    fdv: faker.number.int(40),
  }
} 

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        // subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
