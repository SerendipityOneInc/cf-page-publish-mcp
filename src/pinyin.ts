//此文件用于测试拼音库的功能
import pinyin from "js-pinyin";


console.log(pinyin.getFullChars('test'))
console.log(pinyin.getFullChars('english'))
console.log(pinyin.getCamelChars('管理员'))
console.log(pinyin.getCamelChars('1234'))
console.log(pinyin.getCamelChars('english'))
console.log(pinyin.getCamelChars('昕'))
console.log(pinyin.getCamelChars('佛'))
console.log(pinyin.getFullChars('佛'))
console.log(pinyin.getFullChars('凃一二'))
console.log(pinyin.getCamelChars('凃一二'))

export function usePinyin(title:string) {
    const info = pinyin.getFullChars(title)
    return info
}