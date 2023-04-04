/** http请求头的content-type类型 */
export enum EnumContentType {
  json = 'application/json',
  formUrlencoded = 'application/x-www-form-urlencoded',
  formData = 'multipart/form-data'
}

/** 缓存的key */
export enum EnumStorageKey {
  /** 主题颜色 */
  'theme-color' = '__THEME_COLOR__',
  /** 用户token */
  'token' = '__TOKEN__',
  /** 用户刷新token */
  'refresh-token' = '__REFRESH_TOKEN__',
  /** 用户信息 */
  'user-info' = '__USER_INFO__',
  /** 多页签路由信息 */
  'multi-tab-routes' = '__MULTI_TAB_ROUTES__'
}

/** 数据类型 */
export enum EnumDataType {
  string = '[object String]',
  number = '[object Number]',
  boolean = '[object Boolean]',
  null = '[object Null]',
  undefined = '[object Undefined]',
  symbol = '[object Symbol]',
  bigInt = '[object BigInt]',
  object = '[object Object]',
  function = '[object Function]',
  array = '[object Array]',
  date = '[object Date]',
  regExp = '[object RegExp]',
  promise = '[object Promise]',
  set = '[object Set]',
  map = '[object Map]',
  file = '[object File]'
}
