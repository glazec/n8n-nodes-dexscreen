#!/bin/bash
npm run build;
npm link;
cd /Users/glaze/.n8n/nodes;
npm link n8n-nodes-dexscreener;
n8n start;