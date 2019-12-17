import { ApiProperty } from '@nestjs/swagger'

export class Task {
  @ApiProperty()
  id: number

  @ApiProperty()
  text: string

  @ApiProperty()
  isCompleted: boolean
}