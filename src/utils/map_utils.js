const name2pinyin = {
  安徽省: 'anhui',
  陕西省: 'shanxi1',
  澳门: 'aomen',
  北京市: 'beijing',
  重庆市: 'chongqing',
  福建省: 'fujian',
  甘肃省: 'gansu',
  广东省: 'guangdong',
  广西壮族自治区: 'guangxi',
  贵州省: 'guizhou',
  海南省: 'hainan',
  河北省: 'hebei',
  黑龙江省: 'heilongjiang',
  河南省: 'henan',
  湖北省: 'hubei',
  湖南省: 'hunan',
  江苏省: 'jiangsu',
  江西省: 'jiangxi',
  吉林省: 'jilin',
  辽宁省: 'liaoning',
  内蒙古自治区: 'neimenggu',
  宁夏省: 'ningxia',
  青海省: 'qinghai',
  山东省: 'shandong',
  上海市: 'shanghai',
  山西省: 'shanxi',
  四川省: 'sichuan',
  台湾省: 'taiwan',
  天津省: 'tianjin',
  香港省: 'xianggang',
  新疆维吾尔自治区: 'xinjiang',
  西藏自治区: 'xizang',
  云南省: 'yunnan',
  浙江省: 'zhejiang'
}

export function getProvinceMapInfo (arg) {
  const path = `province/${name2pinyin[arg]}`
  return {
    key: name2pinyin[arg],
    path: path
  }
}
