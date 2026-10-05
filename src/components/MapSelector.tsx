"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icon issue in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

interface MapSelectorProps {
  onConfirm: (lat: number, lng: number) => void;
  onCancel: () => void;
  initialLocation?: { lat: number; lng: number } | null;
}

export default function MapSelector({ onConfirm, onCancel, initialLocation }: MapSelectorProps) {
  // Default to Quito
  const [position, setPosition] = useState<{ lat: number; lng: number }>(
    initialLocation || { lat: -0.1806, lng: -78.4678 }
  );

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customIcon} />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col h-[80vh] md:h-[600px]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Selecciona tu ubicación</h3>
            <p className="text-xs text-gray-500">Toca en el mapa para ajustar el pin</p>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="flex-1 relative z-0">
          <MapContainer 
            center={position} 
            zoom={14} 
            style={{ height: "100%", width: "100%" }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
        </div>
        
        <div className="p-4 bg-white border-t border-gray-100">
          <button
            onClick={() => onConfirm(position.lat, position.lng)}
            className="w-full bg-[#C71550] text-white font-bold py-3.5 rounded-xl shadow-md hover:bg-[#a61141] transition-all transform hover:scale-[1.01] flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            Confirmar esta ubicación
          </button>
        </div>
      </div>
    </div>
  );
}
