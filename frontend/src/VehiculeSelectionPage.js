// src/VehiculeSelectionPage.js
import React, { useState, useEffect } from 'react';
import './VehiculeSelectionPage.css';
function VehiculeSelectionPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [vehicules, setVehicules] = useState([]);
  const [selectedVehiculeId, setSelectedVehiculeId] = useState(null); // Pour stocker l'ID du véhicule choisi
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isBooking, setIsBooking] = useState(false); // Pour suivre l'état de la réservation

  // Fonction pour récupérer les véhicules en fonction de la date sélectionnée
  const fetchAvailableVehicules = (date) => {
    setIsLoading(true);
    setError(null);

    const formattedDate = new Date(date).toLocaleDateString('fr-CA'); // Format: YYYY-MM-DD
    fetch(`/reservations/available/${formattedDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des véhicules');
        }
        return response.json();
      })
      .then((data) => {
        setVehicules(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  // Handler pour changer la date
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (date) {
      fetchAvailableVehicules(date); // Met à jour les véhicules disponibles
    } else {
      setVehicules([]); // Réinitialise les véhicules si aucune date n'est sélectionnée
    }
  };

  // Handler pour changer le véhicule sélectionné
  const handleVehiculeChange = (event) => {
    setSelectedVehiculeId(event.target.value);
  };

  // Fonction pour enregistrer la réservation
  const handleBookVehicule = () => {
    if (!selectedVehiculeId) {
      alert('Veuillez sélectionner un véhicule');
      return;
    }

    setIsBooking(true);

    const reservationData = {
      date: selectedDate,
      vehiculeId: selectedVehiculeId,
    };

    fetch('/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la réservation');
        }
        return response.json();
      })
      .then((data) => {
        alert('Réservation effectuée avec succès');
        setIsBooking(false);
      })
      .catch((error) => {
        alert('Erreur lors de la réservation : ' + error.message);
        setIsBooking(false);
      });
  };

  return (
    <div className="vehicule-selection-container">
      <h1>Choisissez une date pour voir les véhicules disponibles</h1>
      
      {/* Sélecteur de date */}
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        min={new Date().toLocaleDateString('fr-CA')} // Pas de date passée
      />

      {/* Message d'erreur */}
      {error && <p className="error">{error}</p>}

      {/* Chargement en cours */}
      {isLoading && <p>Chargement des véhicules...</p>}

      {/* Sélecteur de véhicules */}
      {selectedDate && !isLoading && !error && vehicules.length > 0 && (
        <div>
          <label htmlFor="vehicule-select">Véhicules disponibles pour le {new Date(selectedDate).toLocaleDateString()}</label>
          <select id="vehicule-select" value={selectedVehiculeId} onChange={handleVehiculeChange}>
            <option value="">Sélectionner un véhicule</option>
            {vehicules.map((vehicule) => (
              <option key={vehicule.id} value={vehicule.id}>
                {vehicule.nom} - {vehicule.nombreDePlace} places - {vehicule.marque}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Aucun véhicule disponible */}
      {selectedDate && !isLoading && !error && vehicules.length === 0 && (
        <p>Aucun véhicule disponible pour cette date.</p>
      )}

      {/* Bouton de réservation */}
      {selectedVehiculeId && !isBooking && (
        <button onClick={handleBookVehicule}>Réserver</button>
      )}

      {/* Message lors de la réservation */}
      {isBooking && <p>Réservation en cours...</p>}
    </div>
  );
}

export default VehiculeSelectionPage;
