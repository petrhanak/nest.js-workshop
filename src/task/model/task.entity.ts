import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  @ApiProperty()
  id: number

  @Column('varchar')
  @Field(() => String)
  @ApiProperty()
  text: string

  @Column('bool')
  @Field(() => Boolean)
  @ApiProperty()
  isCompleted: boolean
}