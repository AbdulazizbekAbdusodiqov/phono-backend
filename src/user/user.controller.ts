import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AdminGuard } from "../guards/admin.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../config/multer.config";
import { GetCurrentUserId } from "../decorators/get-current-user-id.decorator";
import { UserSelfGuard } from "../guards/user-self.guard";
import { UserGuard } from "../guards/user.guard";

@ApiTags("User")
@ApiBearerAuth("phono")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AdminGuard)
  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "List of all users" })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 404, description: "User not found" })
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(UserGuard, UserSelfGuard)
  @Put(":id")
  @ApiOperation({ summary: "Update user by ID" })
  @ApiBody({ type: UpdateUserDto })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ status: 200, description: "User updated successfully" })
  @UseInterceptors(FileInterceptor("image", multerOptions))
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.userService.update(+id, updateUserDto, image);
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete user by ID" })
  @ApiResponse({ status: 200, description: "User deleted successfully" })
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
