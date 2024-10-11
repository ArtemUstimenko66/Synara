import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('api/alerts')
export class AlertsController {
	constructor(private readonly alertsService: AlertsService) {}

	@Get()
	getAlerts() {
		try {
			const data = this.alertsService.getAlerts();
			return data;
		} catch (error) {
			throw new HttpException('No data available', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
