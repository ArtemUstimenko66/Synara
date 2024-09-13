import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeocodingService {
  private readonly apiKey = 'AIzaSyDx4I-E8nJivVQtvzZbzN6HpYcdTtTCJfY';
  private readonly baseUrl =
    'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private readonly httpService: HttpService) {}

  async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    const url = `${this.baseUrl}?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));

    console.log('Google Maps API response:', response.data);

    if (response.data.results.length === 0) {
      throw new HttpException(
        'No results found for the provided address',
        HttpStatus.NOT_FOUND,
      );
    }

    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  }
}
