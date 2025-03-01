import {
  Controller,
  // Delete,
  // Get,
  // Param,
  // ParseIntPipe,
  // Patch,
  // Post,
} from '@nestjs/common';
// import { DepartmentService } from './department.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Department')
@Controller(':organisationId/department')
export class DepartmentController {
  // constructor(private readonly departmentService: DepartmentService) {}
  // @Get()
  // getDepartments(
  //   @Param('organisationId', ParseIntPipe) organisationId: number,
  // ) {
  //   return this.departmentService.getDepartments({ organisationId });
  // }
  // @Get(':departmentId')
  // getDepartment() {}
  // @Post()
  // createDepartment() {}
  // @Patch(':departmentId')
  // patchDepartment() {}
  // @Delete(':departmentId')
  // deleteDepartment() {}
}
