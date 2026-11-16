import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export const uuidParamPipe = new ParseUUIDPipe({
  exceptionFactory: () =>
    new BadRequestException('El identificador debe tener un UUID válido.'),
});
