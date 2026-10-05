"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Truck, CreditCard, MessageCircle, DollarSign, Lock, ShieldCheck, MapPin, Gift } from "lucide-react";
import dynamic from "next/dynamic";

const MapSelector = dynamic(() => import('../components/MapSelector'), { ssr: false });

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Estados del Sistema Inteligente
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(true);
  const [stock, setStock] = useState<number | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(2.50);
  const [chancesUsed, setChancesUsed] = useState<number>(0);

  // Estados del Formulario
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [coordenadas, setCoordenadas] = useState<{ lat: number, lng: number } | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Zonas de cobertura
  const freeZones = ["Atucucho", "San Carlos", "Cotocollao", "La Florida", "El Bosque", "Rumipamba", "Cochapamba", "Roldós"];
  const generalZones = ["Calderón", "Carapungo", "Carcelén", "Comité del Pueblo", "La Carolina", "Otro (Norte de Quito)"];

  useEffect(() => {
    // Inicializar Timer
    const storedEndTime = localStorage.getItem("promoEndTime");
    if (storedEndTime) {
      const remaining = Math.max(0, Math.floor((parseInt(storedEndTime) - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) setTimerActive(false);
    } else {
      const newEndTime = Date.now() + 600 * 1000; // 10 min
      localStorage.setItem("promoEndTime", newEndTime.toString());
      setTimeLeft(600);
    }

    // Inicializar Stock
    const storedStock = localStorage.getItem("promoStock");
    if (storedStock) {
      setStock(parseInt(storedStock));
    } else {
      const initialStock = Math.floor(Math.random() * 5) + 4; // Entre 4 y 8
      localStorage.setItem("promoStock", initialStock.toString());
      setStock(initialStock);
    }

    // Inicializar Oportunidades
    const storedChances = localStorage.getItem("promoChancesUsed");
    if (storedChances) {
      setChancesUsed(parseInt(storedChances));
    }
  }, []);

  const handleSecondChance = () => {
    const newEndTime = Date.now() + 300 * 1000; // 5 minutos extra
    localStorage.setItem("promoEndTime", newEndTime.toString());
    
    setChancesUsed(1);
    localStorage.setItem("promoChancesUsed", "1");
    
    setTimeLeft(300);
    setTimerActive(true);
  };

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev && prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev ? prev - 1 : 0;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Motor de precios
    if (freeZones.includes(selectedNeighborhood) && timerActive) {
      setDeliveryCost(0);
    } else {
      setDeliveryCost(2.50);
    }
  }, [selectedNeighborhood, timerActive]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "10:00";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!nombre || !selectedNeighborhood || !direccion || !metodoPago) {
      alert("Por favor, completa todos los campos del formulario para enviar tu pedido.");
      return;
    }

    if (stock && stock > 1) {
      const newStock = stock - 1;
      setStock(newStock);
      localStorage.setItem("promoStock", newStock.toString());
    }
    
    const total = (37.00 + deliveryCost).toFixed(2);
    
    // Validación Anti-Fraude
    let promoType = "";
    if (deliveryCost === 0) {
      promoType = "🟢 *[CÓDIGO: PROMO-FLASH-ACTIVA]*\n✅ Verificado: Cliente obtuvo Envío Gratis a " + selectedNeighborhood;
    } else {
      promoType = "🔴 *[CÓDIGO: COMPRA-REGULAR]*\n❌ Verificado: Envío de $2.50 (Fuera de tiempo o zona no aplicable)";
    }

    const msg = `🛒 *NUEVO PEDIDO: CCORI ROSÉ* 🛒

👤 *Cliente:* ${nombre}
📍 *Sector:* ${selectedNeighborhood}
🏠 *Dirección:* ${direccion}
${coordenadas ? `🗺️ *Ubicación GPS:* https://maps.google.com/?q=${coordenadas.lat},${coordenadas.lng}\n` : ''}💳 *Pago:* ${metodoPago}

🛍️ *RESUMEN DE ORDEN:*
- Perfume Ccori Rosé: $37.00
- Loción Perfumada: ¡GRATIS!
- Costo de Envío: $${deliveryCost.toFixed(2)}
----------------------------
💰 *TOTAL A PAGAR: $${total}*

🔐 *VALIDACIÓN DEL SISTEMA:*
${promoType}`;

    const whatsappUrl = `https://wa.me/593990000000?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans text-gray-800 pb-10 pt-10">
      
      {/* Sticky Banner Flash */}
      <div className="fixed top-0 left-0 right-0 bg-[#C0104A] text-white z-50 px-3 py-2.5 flex justify-center items-center shadow-md">
        <p className="text-[12px] sm:text-[14px] font-semibold flex items-center justify-center gap-2 text-center leading-tight">
          {timerActive ? (
            <>🔥 ¡Oferta Flash! Crema Gratis + Envío $0. Termina en: <span className="bg-white/25 px-2 py-0.5 rounded font-mono tracking-wider animate-pulse">{formatTime(timeLeft)}</span></>
          ) : (
            <>⚠️ La oferta flash de envío expiró, ¡pero aún te regalamos la crema!</>
          )}
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-white">
        {/* Contenedor con color de fondo por si demora en cargar */}
        <div className="relative w-full h-[550px] max-w-[500px] mx-auto md:max-w-none bg-[#FFE5EC]">
          
          {/* Skeleton de carga premium (desaparece cuando la imagen carga) */}
          <div className={`absolute inset-0 z-0 bg-gradient-to-br from-[#FFE5EC] to-[#FFC2D1] animate-pulse transition-opacity duration-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}></div>

          {/* Background Image con efecto Reveal (fade-in, desenfoque y scale-down) */}
          <Image
            src="/fondo.webp"
            alt="Modelo con Perfume Ccori"
            fill
            className={`object-cover object-top transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] z-10 ${
              imageLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
            }`}
            priority
            onLoad={() => setImageLoaded(true)}
          />

          {/* Hero Content Overlay (Solo el botón) */}
          <div className="absolute inset-0 flex flex-col items-end pr-4 sm:pr-8 pt-8 pb-6 z-20">
            {/* CTA Button */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 z-30">
              <button 
                onClick={() => document.getElementById('formulario-pedido')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full max-w-[340px] bg-gradient-to-r from-[#e3004a] to-[#c2003c] text-white font-bold py-[14px] rounded-[30px] text-[17px] flex items-center justify-center gap-2 hover:brightness-110 transition-all animate-pulse-glow"
              >
                <ShoppingCart size={22} fill="white" />
                QUIERO MI CCORI ROSÉ &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Premium */}
      <section className="px-4 pb-6 mt-4 relative z-30 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-[0_10px_40px_rgba(200,20,80,0.08)] border border-white/60 animate-float-premium">
          <div className="grid grid-cols-4 gap-1 sm:gap-2 text-center items-start">
            
            {/* Item 1 */}
            <div className="flex flex-col items-center gap-2 group cursor-default">
              <div className="bg-pink-50 p-3 rounded-full text-[#E6004C] group-hover:bg-gradient-to-br group-hover:from-[#E6004C] group-hover:to-[#C0104A] group-hover:text-white group-hover:shadow-md transition-all duration-300">
                <Truck size={24} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] sm:text-[11px] leading-tight font-semibold text-gray-600 group-hover:text-[#E6004C] transition-colors whitespace-pre-wrap">
                {timerActive ? "Envío Gratis\nZonas Selectas" : "Envíos Rápidos\nNorte Quito"}
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center gap-2 group cursor-default relative">
              {/* Divisor difuminado */}
              <div className="absolute left-[-10%] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>
              
              <div className="bg-pink-50 p-3 rounded-full text-[#E6004C] group-hover:bg-gradient-to-br group-hover:from-[#E6004C] group-hover:to-[#C0104A] group-hover:text-white group-hover:shadow-md transition-all duration-300">
                <DollarSign size={24} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] sm:text-[11px] leading-tight font-semibold text-gray-600 group-hover:text-[#E6004C] transition-colors">Pago Contra<br/>Entrega</p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center gap-2 group cursor-default relative">
              <div className="absolute left-[-10%] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>
              
              <div className="bg-pink-50 p-3 rounded-full text-[#E6004C] group-hover:bg-gradient-to-br group-hover:from-[#E6004C] group-hover:to-[#C0104A] group-hover:text-white group-hover:shadow-md transition-all duration-300">
                <CreditCard size={24} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] sm:text-[11px] leading-tight font-semibold text-gray-600 group-hover:text-[#E6004C] transition-colors">Pagos con<br/>Tarjeta</p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center gap-2 group cursor-default relative">
              <div className="absolute left-[-10%] top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>
              
              <div className="bg-pink-50 p-3 rounded-full text-[#E6004C] group-hover:bg-gradient-to-br group-hover:from-[#E6004C] group-hover:to-[#C0104A] group-hover:text-white group-hover:shadow-md transition-all duration-300">
                <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] sm:text-[11px] leading-tight font-semibold text-gray-600 group-hover:text-[#E6004C] transition-colors">Atención<br/>WhatsApp</p>
            </div>

          </div>
        </div>
      </section>

      {/* Bundle Offer Section */}
      <section className="px-4 py-2">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 relative">
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Hoy recibes todo esto</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <div className="relative h-[120px] mx-auto mb-3">
                <Image src="/ccoriperfume.webp" alt="Ccori Rosé Parfum" fill className="object-contain" />
              </div>
              <p className="text-[13px] font-bold text-gray-800">Ccori Rosé Parfum</p>
              <p className="text-[11px] text-gray-500">50 ml<br/>Cód. 2018</p>
            </div>
            
            <div className="text-3xl font-light text-gray-400 px-2">+</div>
            
            <div className="flex-1 text-center relative">
              <div className="relative h-[120px] mx-auto mb-3">
                <Image src="/crema.webp" alt="Loción Ccori Rosé" fill className="object-contain" />
              </div>
              <p className="text-[13px] font-bold text-gray-800">Loción Perfumada</p>
              <p className="text-[11px] text-gray-500 leading-tight">Por la compra de cada<br/>Ccori Rosé Parfum.</p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white to-[#fff5f7] rounded-[24px] p-6 flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(200,20,80,0.06)] border border-[#ffe4eb] relative overflow-hidden mt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
             {/* Premium Background Blurs */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ffc2d1] rounded-full blur-3xl opacity-30"></div>

             <div className="text-center w-full relative z-10 flex flex-col items-center">
                <div className="flex flex-col items-center justify-center mb-3">
                   <p className="text-[14px] text-gray-500 font-medium leading-tight">Precio normal</p>
                   <p className="text-[18px] text-gray-400 decoration-[#C0104A] decoration-2 line-through font-medium leading-none">US$ 74.00</p>
                </div>
                
                <p className="text-[15px] font-bold text-gray-800 mt-1 leading-none">Hoy pagas solo</p>
                <p className="text-[60px] font-black text-[#C0104A] leading-[0.9] mt-2 mb-5 tracking-tighter animate-heartbeat-premium">US$ 37.00</p>
                
                <div className="bg-gradient-to-r from-[#b58b66] to-[#997352] text-white font-bold py-3 px-8 rounded-[14px] text-[17px] inline-block shadow-[0_6px_15px_rgba(181,139,102,0.4)] hover:scale-105 transition-transform duration-300">
                  Ahorras US$ 37.00
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100">
          <h2 className="text-2xl font-serif text-gray-900 mb-3">Un aroma que te hace única</h2>
          <p className="text-sm text-gray-600 mb-6">
            Notas brillantes y jugosas del néctar de ciruela roja, con el impacto y esplendor de la rosa damascena "craftivity" sobre un fondo cremoso y delicioso de vainilla.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center group">
              <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-2 shadow-sm border border-pink-50 group-hover:shadow-md transition-shadow">
                <Image src="/1.webp" alt="Néctar de ciruela roja" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight">Néctar de<br/>ciruela roja</p>
            </div>
            <div className="text-center group">
              <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-2 shadow-sm border border-pink-50 group-hover:shadow-md transition-shadow">
                <Image src="/2.webp" alt="Rosa damascena" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight">Rosa<br/>damascena</p>
            </div>
            <div className="text-center group">
              <div className="relative w-full aspect-square rounded-[16px] overflow-hidden mb-2 shadow-sm border border-pink-50 group-hover:shadow-md transition-shadow">
                <Image src="/3.webp" alt="Fondo cremoso de vainilla" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight">Fondo cremoso<br/>de vainilla</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-pink-100 pt-5 mt-2">
            <div className="flex items-center gap-3">
              <div className="text-[#C0104A]">
                {/* Ícono de flor similar al de la imagen */}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c-.8-1.5-2.5-2-4-2-2 0-4 1.5-4 4 0 1.5 1 3 2.5 4-1.5-.5-3.5-.5-5 .5-1.5 1-2 3-1 4.5.5 1.5 2.5 2 4 2 .5 0 1 0 1.5-.5-1.5 1-2 2.5-1.5 4 .5 1.5 2 2 3.5 2 2 0 4-1.5 4-4 0-1.5-1-3-2.5-4 1.5.5 3.5.5 5-.5 1.5-1 2-3 1-4.5-.5-1.5-2.5-2-4-2-.5 0-1 0-1.5.5 1.5-1 2-2.5 1.5-4-.5-1.5-2-2-3.5-2-2 0-4 1.5-4 4z"/></svg>
              </div>
              <p className="text-[15px] font-semibold text-[#0a233f] leading-tight">Aroma floral<br/>ambarado</p>
            </div>
            
            <div className="h-10 w-px bg-gray-200"></div>
            
            <div className="flex flex-col items-center">
              <p className="text-[13px] text-gray-500 font-medium mb-1.5">Intensidad alta</p>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#1a2b3c] shadow-sm"></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="formulario-pedido" className="px-4 py-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100">
          <div className="flex items-center gap-2 mb-5 text-gray-900 border-b border-gray-100 pb-3">
            <ShoppingCart className="text-[#C71550]" size={28} />
            <h2 className="text-xl font-bold">Haz tu pedido ahora</h2>
          </div>

          <form className="space-y-3 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <input 
                type="text" 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre y Apellido" 
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-gray-50" 
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="text-gray-400" size={16} />
              </div>
              <select 
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 appearance-none bg-gray-50 text-gray-800 font-medium"
              >
                <option value="" disabled>Selecciona tu sector...</option>
                <optgroup label="✅ Zona Envío GRATIS (Promo Flash)">
                  {freeZones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </optgroup>
                <optgroup label="📍 Zona Cobertura General">
                  {generalZones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </optgroup>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
            
            {/* Feedback Visual del Barrio */}
            {selectedNeighborhood && (
              <div className={`p-3 rounded-lg text-sm font-medium border flex items-start gap-2 ${freeZones.includes(selectedNeighborhood) && timerActive ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                {freeZones.includes(selectedNeighborhood) && timerActive ? (
                  <>
                    <span className="text-lg leading-none">✅</span> 
                    <p>¡Felicidades! Tienes <strong>Envío GRATIS</strong> a {selectedNeighborhood} por completar tu compra ahora.</p>
                  </>
                ) : freeZones.includes(selectedNeighborhood) && !timerActive ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-start gap-2">
                      <span className="text-lg leading-none">⚠️</span> 
                      <p>El tiempo expiró. Costo de envío: <strong>$2.50</strong>.</p>
                    </div>
                    {chancesUsed === 0 && (
                      <button 
                        onClick={handleSecondChance}
                        className="w-full mt-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-sm border border-yellow-400"
                      >
                        🎁 Dame una última oportunidad
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <span className="text-lg leading-none">📍</span> 
                    <p>Tenemos cobertura a {selectedNeighborhood}. Costo de envío: <strong>$2.50</strong>.</p>
                  </>
                )}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <input 
                type="text" 
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección exacta de entrega" 
                className="w-full pl-10 pr-[140px] py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-gray-50" 
              />
              <div className="absolute inset-y-0 right-1 flex items-center">
                <button 
                  type="button"
                  onClick={() => setIsMapOpen(true)}
                  className="bg-pink-100 text-[#C71550] text-xs font-bold px-3 py-1.5 rounded-md hover:bg-pink-200 transition-colors flex items-center gap-1"
                >
                  <MapPin size={14} />
                  Ubicar en mapa
                </button>
              </div>
            </div>
            {coordenadas && (
              <div className="text-xs text-green-600 flex items-center gap-1 mt-1 pl-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                Ubicación GPS guardada
              </div>
            )}
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="text-gray-400" size={16} />
              </div>
              <select 
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 appearance-none bg-gray-50 text-gray-800 font-medium"
              >
                <option value="" disabled>Método de Pago...</option>
                <option value="Efectivo (Contra Entrega)">💵 Efectivo (Contra Entrega)</option>
                <option value="Transferencia Bancaria">🏦 Transferencia Bancaria</option>
                <option value="Tarjeta de Crédito">💳 Tarjeta de Crédito</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </form>

          <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100">
            <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">Resumen de tu pedido</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-3">
              <div className="flex justify-between">
                <span>Ccori Rosé Parfum</span>
                <span className="font-medium">$37.00</span>
              </div>
              <div className="flex justify-between text-[#C0104A] font-medium">
                <span>Loción Perfumada (Regalo)</span>
                <span>¡GRATIS!</span>
              </div>
              <div className="flex justify-between">
                <span>Envío a domicilio</span>
                {deliveryCost === 0 ? (
                  <span className="text-green-600 font-bold">¡GRATIS!</span>
                ) : (
                  <span className="font-medium">$2.50</span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-end border-t border-gray-200 pt-3">
              <span className="font-bold text-gray-800">Total a pagar:</span>
              <span className="text-2xl font-black text-[#C0104A] leading-none">${(37.00 + deliveryCost).toFixed(2)}</span>
            </div>
          </div>

          {/* Stock Scarcity Banner */}
          {stock !== null && (
            <div className="mb-4 bg-[#fff0f3] border border-[#ffc2d1] text-[#C0104A] px-4 py-2.5 rounded-lg text-sm font-bold text-center flex items-center justify-center gap-2 animate-pulse-glow">
              ⚠️ ¡Date prisa! Solo quedan {stock} unidades con crema gratis.
            </div>
          )}

          <button onClick={handleOrderClick} className="w-full bg-[#C71550] text-white font-bold py-4 rounded-full text-lg shadow-[0_8px_20px_rgba(199,21,80,0.3)] flex items-center justify-center gap-2 hover:bg-[#a61141] transition-all transform hover:scale-[1.02] mb-6">
            <ShoppingCart size={24} />
            COMPLETAR MI PEDIDO &gt;
          </button>
          
          {/* Form Trust Badges movidos aquí */}
          <div className="mb-6 px-2 border-t border-gray-100 pt-6 flex flex-col items-center">
            <div className="w-fit flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Truck className="text-[#C71550] flex-shrink-0" size={24} />
                {deliveryCost === 0 ? (
                  <p className="text-sm font-medium">Entrega GRATIS<br/><span className="text-gray-500 font-normal">por promo flash</span></p>
                ) : (
                  <p className="text-sm font-medium">Envíos rápidos<br/><span className="text-gray-500 font-normal">al norte de Quito ($2.50)</span></p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="text-[#C71550] flex-shrink-0" size={24} />
                <p className="text-sm font-medium">Paga al recibir<br/><span className="text-gray-500 font-normal">tu pedido</span></p>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="text-[#C71550] flex-shrink-0" size={24} />
                <p className="text-sm font-medium">También puedes<br/><span className="text-gray-500 font-normal">pagar con tarjeta</span></p>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#C71550] flex-shrink-0" size={24} />
                <p className="text-sm font-medium">Compra segura<br/><span className="text-gray-500 font-normal">y confiable</span></p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
            <Lock size={12} />
            <p><strong>Tus datos están protegidos.</strong> Solo los usamos para gestionar tu pedido.</p>
          </div>
        </div>
      </section>

      {isMapOpen && (
        <MapSelector 
          initialLocation={coordenadas}
          onConfirm={(lat, lng) => {
            setCoordenadas({ lat, lng });
            setIsMapOpen(false);
          }}
          onCancel={() => setIsMapOpen(false)}
        />
      )}
    </div>
  );
}
