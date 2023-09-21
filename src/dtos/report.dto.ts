// Import from validator isNumber, isPositive, isString, et IsNoEmpty
import {
  IsPositive,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
// On import depuis class-transformer pour utiliser le décorateur @Exclude et @Expose pour exclure les propriétés de la réponse cela permet de ne pas afficher les propriétés id, created_at, updated_at
import { Exclude, Expose } from 'class-transformer';

import { ReportType } from 'src/data';

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

export class ReportReponseDto {
  id: string;
  amount: number;
  source: string;

  @Exclude() // Ce decorateur permet d'excluder completement la propriété created_at de la réponse (voir plus bas)
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType;

  @Expose({ name: 'createdAt' }) // Ce decorateur permet d'exposer la propriété amountWithVat dans la réponse
  transformCreatedAt() {
    return this.created_at;
  }

  constructor(partial: Partial<ReportReponseDto>) {
    Object.assign(this, partial);
  }
}
