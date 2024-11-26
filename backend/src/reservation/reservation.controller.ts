import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Route pour obtenir les véhicules disponibles pour une date
  @Get('available/:date')
async getAvailableVehicles(@Param('date') date: string) {
  return this.reservationService.findAvailableVehicles(date);
}

@Post()
async createReservation(@Body() reservationData: { date: string; vehiculeId: number }) {
  const { date, vehiculeId } = reservationData;
  return this.reservationService.createReservation(date, vehiculeId);
}
}
