import { BadRequestException, PipeTransform } from "@nestjs/common";


export class EnumValidationPipe implements PipeTransform {
    constructor(private readonly enumType: any) {}

    transform(value: any) {
        if(!Object.values(this.enumType).includes(value)) {
            throw new BadRequestException(`Invalid value '${value}' for enum.`);
        }
        return value;
    }
}