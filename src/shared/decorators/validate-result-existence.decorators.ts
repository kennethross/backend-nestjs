import { UseInterceptors } from '@nestjs/common';
import { ValidateResultExistenceInterceptor } from 'src/shared/interceptors/validate-result-existence.interceptor';

export function ValidateResultExistence() {
  return UseInterceptors(ValidateResultExistenceInterceptor);
}
