import { usePinyin } from "./pinyin"
import { env } from "cloudflare:workers";
export const KV={
    put,
    get

}

type PageContent={
    content:string,
    title:string,
}

async function put(pageContent:PageContent) {
    try{
    const titleChar=usePinyin(pageContent.title)
    const randomString=generateRandomString(8)
    const key=titleChar+randomString
    const res=await env.KV.put(key,pageContent.content)
    return {
        state:true,
        message:'存放成功',
        data:{
            key
        }
    }

}catch(error){
    return {
        state:false,
        message:'存放失败,info:'+error
    }

}
}

async function get(key:string) {
    try{
    const res=await env.KV.get(key)
    if(!res){
        return {
            state:false,
            message:'获取失败，key不存在'
        }
    }
    return {
        state:true,
        message:'获取成功',
        data:res
    }
    }catch(error){
        return {
            state:false,
            message:'获取失败，info：' + error
        }
    }
}


function generateRandomString(long:number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < long; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}