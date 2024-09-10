import { BadRequestException, PipeTransform } from '@nestjs/common';

export class EnumValidationPipe implements PipeTransform {
  constructor(private readonly enumType: any) {}

  transform(value: any) {
    if (!value) {
      return [];
    }

    const values = Array.isArray(value) ? value : [value];
    const validVales = Object.values(this.enumType);

    for (const val of values) {
      if (!validVales.includes(val)) {
        throw new BadRequestException(`Invalid value: ${val}`);
      }
    }
    return values;
  }
}
