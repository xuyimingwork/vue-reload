export type Context = { 
  nextTick?: (...args: any) => any,
  getCurrentInstance?: (...args: any) => any,
}