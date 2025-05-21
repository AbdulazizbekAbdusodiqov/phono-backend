import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type RequestWithUser = {
    user: {
        id: number;
    };
    params: {
        id: string;
    };
};

@Injectable()
export class UserProductGuard implements CanActivate {
    constructor(private readonly prismaService: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<RequestWithUser>();
        
        const product = await this.prismaService.product.findUnique({
            where: { id: Number(req.params.id) },
            include: { user: true }
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        if (!product.user) {
            throw new ForbiddenException('Product owner information is missing');
        }

        if (product.user.id !== req.user.id) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        return true;
    }
}
