import { Column, Model, ForeignKey, BelongsTo, Table } from 'sequelize-typescript';
import { Vehicule } from 'src/vehicule/model/vehicule.model';
@Table
export class Reservation extends Model {
  @Column
  date: string;

  // Définir la clé étrangère
  @ForeignKey(() => Vehicule)
  @Column
  vehiculeId: number;

  // Relation avec Vehicule
  @BelongsTo(() => Vehicule)
  vehicule: Vehicule;
}
