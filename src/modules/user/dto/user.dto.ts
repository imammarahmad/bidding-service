import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: string;

  @ApiProperty({ description: 'The full name of the user' })
  name: string;

  @ApiProperty({ description: 'The email address of the user' })
  email: string;
}
