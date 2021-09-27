export interface commodityType {
  title: string,
  list: string[]
}

export interface dataType {
  id: string,
  specs: string[]
}

const arr: number[]= [1,2,3,5]
arr.reduce((total, item) => total+item)