import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservation } from './reservation/model/reservation.model';
import { Vehicule } from './vehicule/model/vehicule.model';
import { ReservationController } from './reservation/reservation.controller';
import { VehiculeController } from './vehicule/vehicule.controller';
import { VehiculeService } from './vehicule/vehicule.service';
import { ReservationService } from './reservation/reservation.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mariadb',  // Spécifie MariaDB comme dialecte
      host: process.env.DATABASE_HOST || 'db',  // Nom du service db dans Docker
      port: +process.env.DATABASE_PORT || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: 'example',
      database: process.env.DATABASE_NAME || 'vehicle_rentals',
      models: [Reservation, Vehicule],
      autoLoadModels: true, // Charge automatiquement les modèles
      synchronize: true, // Synchronise la DB avec les modèles (attention en prod)
    }),
    SequelizeModule.forFeature([Reservation, Vehicule]),
  ],
  controllers: [ReservationController, VehiculeController],
  providers: [ReservationService, VehiculeService],
})
export class AppModule {}
