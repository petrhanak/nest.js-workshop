import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  text: string
}