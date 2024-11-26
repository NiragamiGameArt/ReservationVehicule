import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './model/reservation.model';
import { Vehicule } from 'src/vehicule/model/vehicule.model';
import { Op } from 'sequelize';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation) private reservationModel: typeof Reservation,
    @InjectModel(Vehicule) private vehiculeModel: typeof Vehicule,
  ) {}

  // Méthode pour obtenir les véhicules disponibles pour une date donnée
  async findAvailableVehicles(date: string): Promise<Vehicule[]> {
    // Formater la date pour qu'elle soit au format YYYY-MM-DD
    const formattedDate = new Date(date);
    const dateString = formattedDate.toISOString().split('T')[0]; // Convertir en YYYY-MM-DD

    // Trouver les réservations pour cette date spécifique
    const reservationsForDate = await this.reservationModel.findAll({
      where: { date: dateString },
      include: [Vehicule],
    });

    // Trouver les IDs des véhicules réservés pour cette date
    const reservedVehicules = reservationsForDate.map(reservation => reservation.vehiculeId);
    // Récupérer les véhicules non réservés
    return this.vehiculeModel.findAll({
      where: {
        id: {
          [Op.notIn]: reservedVehicules, // Exclure les véhicules réservés
        },
      },
    });
  }

  // Création d'une réservation
  async createReservation(date: string, vehiculeId: number) {
    const newReservation = await Reservation.create({
      date,
      vehiculeId,
    });
    return newReservation;
  }
}
