import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsInt, IsArray, ValidateNested } from "class-validator";

export class CreateMedicationDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    price!: number;

    @IsNotEmpty()
    @IsNumber()
    quantity!: number;

    @IsNotEmpty()
    @IsNumber()
    weight!: number;

    @IsNotEmpty()
    @IsString()
    image!: string;
}

export class UpdateMedicationDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsString()
    image?: string;
}

export class CartItemDto {
    @IsInt()
    @IsPositive()
    id!: number;
  
    @IsInt()
    @IsPositive()
    quantity!: number;
}
export class CheckoutDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    items!: CartItemDto[];
}