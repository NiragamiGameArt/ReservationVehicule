import { Controller, Get, Param } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicules')
export class VehiculeController {
  constructor(private readonly vehiculeService: VehiculeService) {}

  @Get()
  async getAll() {
    return this.vehiculeService.getAllVehicules();
  }
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.vehiculeService.getVehicule(id);
  }
}
