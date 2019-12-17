import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @Field(() => String)
  @ApiProperty()
  text: string
}