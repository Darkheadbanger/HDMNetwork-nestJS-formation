// Import from validator isNumber, isPositive, isString, et IsNoEmpty
import {
  IsPositive,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
export class CreateReportDto {
  @IsPositive()
  @IsNumber()
  amount: number;
  @IsString()
  @IsNotEmpty()
  source: string;
}

// The same as above but Optionnal for one of each to be implemented as @Put

export class UpdateReportDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}
// Compare this snippet from src/app.controller.ts:
