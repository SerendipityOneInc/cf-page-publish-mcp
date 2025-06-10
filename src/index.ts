import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { Hono } from "hono"
import { KV } from "./kv";
import { env } from "cloudflare:workers";
// Define our MCP agent with tools
export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "cloudflare-page-publish-mcp",
		version: "1.0.0",
	});

	

	async init() {

	this.server.tool(
		"创建html页面并且返回网页url，需要提供两个参数，pagetitle是页面的题目，然后pagecontent是页面的html内容",
		{
			pagetitle: z.string(),
			pagecontent: z.string()
		},
		async ({ pagetitle, pagecontent }) => {
			const result = await KV.put({ title:pagetitle, content:pagecontent });
			if (!result.state) {
				return { content: [{ type: "text", text: result.message }] };
			}
			return { content: [{ type: "text", text: "页面创建成功，访问URL："+`https://${env.host}/pages/${result.data?.key}` }] };
		}
	);
		

	
	}
}

const app = new Hono<{ Bindings: Env }>()

app.mount('/sse', MyMCP.serveSSE('/sse').fetch, { replaceRequest: false })
app.mount('/mcp', MyMCP.serve('/mcp').fetch, { replaceRequest: false} )
app.get('/pages/:key',async (c)=>{
    const key=c.req.param('key')
    const res=await KV.get(key)
    if(!res){
        return c.html('页面不存在')
    }
    return c.html(res.data!)
})

export default app