import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number

  @Column('varchar')
  @ApiProperty()
  text: string

  @Column('bool')
  @ApiProperty()
  isCompleted: boolean
}