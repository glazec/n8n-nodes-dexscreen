import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { OptionsWithUri } from 'request';

export class Dexscreener implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dexscreener',
		name: 'dexscreener',
		icon: 'file:dexscreener.png',
		group: ['transform'],
		version: 1,
		description: 'Get realtime token price from dexscreener',
		defaults: {
			name: 'Dexscreener',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// {
			// 	displayName: 'Operation',
			// 	name: 'operation',
			// 	type: 'options',
			// 	options: [
			// 		{
			// 			name: 'Get',
			// 			value: 'get',
			// 			description: 'Get realtime token price',
			// 			action: 'Get realtime token price',
			// 		},
			// 	],
			// 	default: 'get',
			// 	noDataExpression: true,
			// },
			{
				displayName: 'Token address',
				name: 'tokenAddress',
				type: 'string',
				required: true,
				default: '0x31C91D8Fb96BfF40955DD2dbc909B36E8b104Dde',
				placeholder: '0x31C91D8Fb96BfF40955DD2dbc909B36E8b104Dde',
				description: 'Smart contract address for the token',
			},
		],
	};
	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes
		const items = this.getInputData();
		let responseData;
		const returnData = [];
		// const resource = this.getNodeParameter('resource', 0) as string;
		// const operation = this.getNodeParameter('operation', 0) as string;

		// For each item, make an API call to create a contact
		for (let i = 0; i < items.length; i++) {
			// Get email input
			const tokenAddress = this.getNodeParameter('tokenAddress', i) as string;
			// Get additional fields input
			const data: IDataObject = {
				tokenAddress,
			};

			Object.assign(data);

			// Make HTTP request according to https://sendgrid.com/docs/api-reference/
			const options: OptionsWithUri = {
				headers: {
					Accept: 'application/json',
				},
				method: 'Get',
				uri: `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
				json: true,
			};
			responseData = await this.helpers.request.call(this, options);
			returnData.push(responseData);
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}
}
