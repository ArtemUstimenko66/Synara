import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class UnbrokennessService {
  constructor(private readonly configService: ConfigService) {}
  async getUnbrokennessMap() {
    try {
      const unbrokennessMapUrl = this.configService.get<string>(
        'URL_UNBROKENNESS_MAP',
      );

      const { data: html } = await axios.get(unbrokennessMapUrl);
      // console.log(html);
      const $ = cheerio.load(html);
      const map = {
        src: $('iframe.map').attr('src'),
        dataSrc: $('iframe.map').attr('data-src'),
      };

      if (!map) {
        throw new HttpException('not found', HttpStatus.NOT_FOUND);
      }

      const { data } = await axios.get(map.src);
      // console.log("XXXMAP", data);

      return map;

      return map;
    } catch (err) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }
  }

  async getDeepMap(){
      const {data: html} = await axios.get("https://deepstatemap.live/#8/49.5768835/36.6696167");
      const $ = cheerio.load(html);
      console.log(html);
  }
}
