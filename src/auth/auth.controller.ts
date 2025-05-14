import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseFields } from '../types';
import { CookieGetter } from '../decorators/cookie-getter.decorator';
import { AdminSignInDto, CreateAdminDto } from '../admin/dto';
import { AdminGuard } from '../guards/admin.guard';
import { SuperAdminGuard } from '../guards/superAdmin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  
 //================================  For Admin ============================================
  


  @ApiOperation({ summary: "Yangi admin ro'yxatdan o'tkazish" })
  // @UseGuards(AdminGuard, SuperAdminGuard)
  @Post('admin/sign-up')
  signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.adminSignUp(createAdminDto)
  }
  
  
  @ApiOperation({ summary: "Admin tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('admin/sign-in')
  adminSignIn(
    @Body() adminSignInDto: AdminSignInDto,
    @Res({ passthrough: true }) res: Response
  ):Promise<ResponseFields> {
    return this.authService.adminSignIn(adminSignInDto, res)
  }
  
  @ApiOperation({ summary: "Admin tizimdan chiqarish" })
  @Get("admin/sign-out")
  AdminSignout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.AdminSignOut(refreshToken, res)
  }
  
  @ApiOperation({ summary: "Admin tokenini yangilash" })
  @UseGuards(AdminGuard)
  @Get("admin/:id/refresh")
  AdminRefresh(
    @Param('id') id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ):Promise<ResponseFields> {    
    return this.authService.AdminRefreshToken(+id, refreshToken, res)
  }
  
  @ApiOperation({ summary: "Adminni aktivlashtirish" })
  @Get('admin/activate/:link')
  activateAdmin(@Param('link') link:string){
    return this.authService.activateAdmin(link)
  }
  
}
