## Introduction

中文：[README.md](README_zh.md)

The Cloudflare page publishing MCP tool allows you to publish HTML pages to Cloudflare Workers.

SSE demo address: [cf-page-publish-sse](https://page.sereniblue.com/sse)

StreamableHttp demo address: [cf-page-publish-stream](https://page.sereniblue.com/mcp)

The demo addresses are deployed by binding Workers to GitHub, ensuring synchronization between the demo and the source code.

## Core Features

### Page Publishing

Accepts two parameters: page title and page content. Uploads HTML content to Cloudflare KV and returns the page access link.

## Self-Deployment Tutorial

### Requirements

- Cloudflare account
- Node
- pnpm

### Deployment Tutorial

#### Clone the Source Code

```bash
git clone https://github.com/Actrue/cf-page-publish-mcp.git # Clone the source code
cd cf-page-publish-mcp # Navigate to the source code
```

#### Create and Bind KV

```bash
wrangler kv namespace create cf-page-publish-mcp # Create KV
```

After executing the above command, you will receive the following output:

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

Copy the KV namespace ID.

Open the `wrangler.jsonc` file:

```bash
	"routes": [{"pattern": "page.sereniblue.com","custom_domain": true}], // Replace with your domain
	"vars": {
		"host":"page.sereniblue.com", // Replace with your domain
	},
	"kv_namespaces": [
		{
		  "binding": "KV",
		  "id": "7d776eaeacd0412380f6eb39ca4aea9a" // Replace with the newly created KV ID
		}
	  ],
```

Replace `page.sereniblue.com` with your domain and update the KV ID with the newly created one.

#### Deploy the Project

```bash
npm i pnpm -g # Install pnpm
pnpm i # Install project dependencies
npx wrangler deploy # Deploy the project to Cloudflare
```

## Core Technologies

- [hono](https://hono.dev/)
- [mcp](https://modelcontextprotocol.io/introduction)
- [cloudflare worker](https://workers.cloudflare.com/)