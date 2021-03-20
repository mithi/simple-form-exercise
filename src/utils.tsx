const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
const isRandomlyRejected = () => (Math.random() > 0.5 ? true : false)

export { sleep, isRandomlyRejected }
