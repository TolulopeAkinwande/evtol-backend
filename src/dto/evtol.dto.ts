import { IsString, IsNumber, IsEnum, IsInt, IsPositive } from 'class-validator';
import { Model, State } from '@prisma/client';

export class CreateEvtolDto {
  @IsString()
  serialNumber!: string;

  @IsEnum(Model)
  model!: Model;

  @IsNumber()
  @IsPositive()
  weightLimit!: number;

  @IsEnum(State)
  state!: State;

  @IsInt()
  @IsPositive()
  batteryCapacity!: number;
}

export class UpdateEvtolDto {
  @IsString()
  serialNumber?: string;

  @IsEnum(Model)
  model?: Model;

  @IsNumber()
  @IsPositive()
  weightLimit?: number;

  @IsEnum(State)
  state?: State;

  @IsInt()
  @IsPositive()
  batteryCapacity?: number;
}