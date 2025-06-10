## 简介

cloudflare页面发布mcp工具，可以将html页面发布到cloudflare，worker上。
sse体验地址：[cf-page-publish-sse](https://page.sereniblue.com/sse)
streamableHttp体验地址：[cf-page-publish-stream](https://page.sereniblue.com/mcp)

## 核心功能

### 页面发布

接受两个参数，页面标题和页面内容，可以将html内容上传到cloudflare kv，
返回一个参数，页面的访问链接

## 自部署教程

### 环境要求

- cloudflare账户
- node
- pnpm

### 部署教程

#### 复制源码

```bash
git clone https://github.com/Actrue/cf-page-publish-mcp.git #复制源代码
cd cf-page-publish-mcp #导航到源码
```

#### 创建并绑定kv

```bash
wrangler kv namespace create cf-page-publish-mcp #创建kv
```

执行上述命令后获得以下内容

```bash
🌀 Creating namespace with title "cf-page-publish"
✨ Success!
Add the following to your configuration file in your kv_namespaces array:
{
  "kv_namespaces": [
    {
      "binding": "cf_page_publish",
      "id": "7d776eaeacd0412380f6eb39ca4aea9a"
    }
  ]
}
```

复制kv_namespaces待用

打开wrangler.jsonc文件

```bash
	"routes": [{"pattern": "page.sereniblue.com","custom_domain": true}],//替换成你的域名
	"vars": {
		"host":"page.sereniblue.com",//替换成你的域名
	},
	"kv_namespaces": [
		{
		  "binding": "KV",
		  "id": "7d776eaeacd0412380f6eb39ca4aea9a"//替换成刚创建的kv的id
		}
	  ],
```

把page.sereniblue.com这个域名替换为自己的域名，把kv的id切换成刚创建的id

#### 部署项目

```bash
npm i pnpm -g #安装pnpm
pnpm i #安装项目依赖
npx wrangler deploy #发布项目至cloudflare
```

## 核心技术

- [hono](https://hono.dev/)
- [mcp](https://modelcontextprotocol.io/introduction)
- [cloudflare worker](https://workers.cloudflare.com/)