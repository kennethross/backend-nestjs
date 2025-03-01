import { Injectable } from '@nestjs/common';
import { DepartmentRepositoryService } from 'src/repositories/department-repository/department-repository.service';

@Injectable()
export class DepartmentService {
  constructor(private readonly departmentRepo: DepartmentRepositoryService) {}

  async getDepartments(data: { organisationId: number }) {
    const { organisationId } = data;

    const department = await this.departmentRepo.findOneSelectCustom(
      {
        id: organisationId,
      },
      {
        id: true,
        name: true,
      },
    );

    console.log(department.id);

    return department;
  }
}
