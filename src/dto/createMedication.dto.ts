import { IsString, IsNotEmpty, IsNumber } from "class-validator";


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