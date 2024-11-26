import { Column, Model, HasMany, Table } from 'sequelize-typescript';
import { Reservation } from 'src/reservation/model/reservation.model';
@Table
export class Vehicule extends Model {
  @Column
  nom: string;

  @Column
  marque: string;

  @HasMany(() => Reservation)
  reservations: Reservation[];
}
