import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/common/enums/roles.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export const Authorize = (roles: Role[]) => {
  return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard)
  );
}
  