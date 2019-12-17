import { Controller, Get } from '@nestjs/common';
import { GreetingService } from './greeting.service'

@Controller()
export class WelcomeController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get()
  getHello(): string {
    return this.greetingService.getHello();
  }
}
