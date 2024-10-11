import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AlertsService {
	private cachedData: any = null;

	constructor() {
		this.fetchAlerts();
		setInterval(() => this.fetchAlerts(), 3000);
	}

	async fetchAlerts(): Promise<void> {
		try {
			const response = await fetch('http://ubilling.net.ua/aerialalerts/?json=true');
			if (!response.ok) {
				throw new Error(`Server responded with status ${response.status}`);
			}
			this.cachedData = await response.json();
			//console.log('Fetched data:', this.cachedData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	getAlerts(): any {
		if (this.cachedData) {
			return this.cachedData;
		}
		throw new Error('No data available');
	}
}
