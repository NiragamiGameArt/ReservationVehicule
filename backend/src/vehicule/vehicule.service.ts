import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicule } from './model/vehicule.model';

@Injectable()
export class VehiculeService {
  constructor(@InjectModel(Vehicule) private vehiculeModel: typeof Vehicule) {}

  async getAllVehicules(): Promise<Vehicule[]> {
    return this.vehiculeModel.findAll();
  }

  async getVehicule(id: number): Promise<Vehicule> {
    return this.vehiculeModel.findByPk(id);
  }
}
