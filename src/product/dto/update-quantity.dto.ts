import { IsInt, Min } from 'class-validator';

export class UpdateQuantityDto {
    @IsInt({message: 'Quantity must be an integer'})
    @Min(0,{message: 'Quantity can not be less than zero'})
    quantity: number;
}