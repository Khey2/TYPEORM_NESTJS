import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/User.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService ) {}

    @HttpCode( HttpStatus.OK )
    @Post('login')
    signIn(@Body() user: UserDto ) {
        return this.authService.signIn(user.username, user.password);
    }
}
