import { timeslotInit } from './initData/timeslotInit.js';
import { userInit } from './initData/userInit.js'


export const initData = async() => {
  await userInit();
  await timeslotInit();
}