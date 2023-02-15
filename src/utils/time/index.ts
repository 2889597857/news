import dayjs from 'dayjs';
// import { UAParser } from 'ua-parser-js';
/**
 *  获取当前时间
 * @returns number
 */
export function getNowUnixTime() {
  return dayjs().valueOf();
}
/**
 *  获取当前时间
 * @returns Date
 */
export function getNowDateTime() {
  return dayjs().format();
}
/**
 *  获取当天 0 点的时间戳
 * @returns number
 */
export function getTodayZeroHour() {
  return dayjs(new Date(dayjs().year(), dayjs().month(), dayjs().date())).valueOf();
}
/**
 *  获取当天 12 点的时间戳
 * @returns number
 */
export function getTodayTwelveHour() {
  return getTodayZeroHour() + hourToMillisecond(12);
}
/**
 * 小时转毫秒
 * @returns number
 */
export function hourToMillisecond(hour: number) {
  return parseInt(hour, 10) ? hour * 60 * 60 * 1000 : 0;
}
export function isToday(date: number): boolean {
  return !!date && date < getTodayZeroHour();
}
/**
 * 判断当前时间是上午还是下午
 * @param date
 * @returns
 */
export function isAM(date: number): boolean {
  return date ? date <= getTodayTwelveHour() : dayjs().valueOf() <= getTodayTwelveHour();
}

// new UAParser().getResult();
