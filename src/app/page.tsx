import Image from "next/image";
import { ShoppingCart, Truck, CreditCard, MessageCircle, DollarSign, Lock, ShieldCheck, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF0F3] font-sans text-gray-800 pb-10">
      {/* Hero Section */}
      <section className="relative w-full bg-[#FFE5EC] overflow-hidden">
        {/* Background Image Placeholder */}
        <div className="relative w-full h-[450px]">
          <Image
            src="/ccori_rose_fondo.webp"
            alt="Modelo con Perfume Ccori"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Hero Content Overlay Rebuilt */}
        <div className="absolute top-0 right-0 w-[55%] h-full flex flex-col items-center pt-8 pr-4 text-center z-20">
          <h1 className="text-[42px] font-serif tracking-widest text-[#001021] mb-0" style={{fontFamily: 'Georgia, serif'}}>CCORI</h1>
          <p className="text-lg tracking-[0.3em] text-[#001021] mb-2 font-medium">ROSÉ</p>
          <p className="text-[11px] text-[#001021] mb-4 leading-tight font-medium px-2">
            Un aroma moderno y femenino<br/>que resalta tu esencia.
          </p>

          {/* 50% de Descuento Badge */}
          <div className="relative w-full max-w-[170px] h-[55px] flex items-center justify-center mb-3">
            <svg className="absolute inset-0 w-full h-full text-[#CE114F]" preserveAspectRatio="none" viewBox="0 0 200 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{filter: 'drop-shadow(2px 4px 6px rgba(206,17,79,0.4))'}}>
              {/* Brush stroke shape approximation */}
              <path d="M10 25 Q 50 -5, 120 5 T 195 10 Q 205 35, 185 50 T 90 55 T 5 45 Z" />
            </svg>
            <div className="relative z-10 flex flex-col items-center justify-center text-white leading-none mt-1">
              <span className="text-[34px] font-black italic tracking-tighter" style={{fontFamily: 'Arial, sans-serif'}}>50%</span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{fontFamily: 'Arial, sans-serif'}}>de descuento</span>
            </div>
          </div>
          
          {/* Prices Box */}
          <div className="bg-white rounded-xl px-5 py-2 mb-3 shadow-[0_4px_10px_rgba(0,0,0,0.08)] w-full max-w-[160px] flex flex-col items-center">
            <p className="text-[11px] text-[#6b7280]">Precio normal</p>
            <div className="relative inline-block mb-1">
              <p className="text-[13px] text-[#6b7280] font-medium">US$ 74.00</p>
              <div className="absolute top-1/2 left-[-10%] w-[120%] h-[1.5px] bg-[#CE114F]"></div>
            </div>
            <p className="text-[11px] text-[#1f2937] font-medium mt-1">Ahora solo</p>
            <p className="text-[26px] font-black text-[#CE114F] leading-none mt-1">US$ 37.00</p>
          </div>

          {/* Free Gift Box */}
          <div className="bg-white rounded-xl px-2 py-2 shadow-[0_4px_10px_rgba(0,0,0,0.08)] w-full max-w-[160px] text-center flex flex-col items-center">
            <div className="flex items-center justify-center gap-1 text-[#CE114F] font-black text-[15px] leading-none mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20 12v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9H3v-2a2 2 0 0 1 2-2h4.5a3.5 3.5 0 0 1 5 0H19a2 2 0 0 1 2 2v2h-1zM9.5 8h5a1.5 1.5 0 1 0-2.83-1H11v1zM11 23v-9H6v9h5zm7 0v-9h-5v9h5z"/></svg>
              ¡GRATIS!
            </div>
            <p className="text-[11px] text-[#CE114F] font-bold leading-tight mb-[2px]">Loción Perfumada</p>
            <p className="text-[9px] text-[#4b5563] leading-tight px-1">Por la compra de cada<br/>Ccori Rosé Parfum.</p>
          </div>
        </div>
      </section>

      {/* Main CTA */}
      <div className="px-4 -mt-5 relative z-20">
        <button className="w-full bg-[#C71550] text-white font-bold py-4 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-[#a61141] transition-colors">
          <ShoppingCart size={24} />
          QUIERO MI CCORI ROSÉ &gt;
        </button>
      </div>

      {/* Trust Badges 1 */}
      <section className="bg-[#FFF0F3] py-6 px-4">
        <div className="grid grid-cols-4 gap-2 text-center text-xs border-b border-pink-200 pb-4">
          <div className="flex flex-col items-center gap-1">
            <Truck className="text-[#C71550]" size={24} />
            <p>Entrega GRATIS al norte de Quito</p>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-pink-200">
            <DollarSign className="text-[#C71550]" size={24} />
            <p>Paga al recibir tu pedido</p>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-pink-200">
            <CreditCard className="text-[#C71550]" size={24} />
            <p>También puedes pagar con tarjeta</p>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-pink-200">
            <MessageCircle className="text-[#C71550]" size={24} />
            <p>Confirmación por WhatsApp</p>
          </div>
        </div>
      </section>

      {/* Bundle Offer Section */}
      <section className="px-4 py-2">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100 relative">
          <h2 className="text-2xl font-serif text-gray-900 mb-4">Hoy recibes todo esto</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <div className="relative h-24 mx-auto mb-2">
                <Image src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80" alt="Parfum" fill className="object-contain" />
              </div>
              <p className="text-xs font-bold">Ccori Rosé Parfum</p>
              <p className="text-[10px] text-gray-500">50 ml<br/>Cód. 2018</p>
            </div>
            
            <div className="text-3xl font-light text-gray-400 px-2">+</div>
            
            <div className="flex-1 text-center relative">
              <div className="relative h-24 mx-auto mb-2">
                <Image src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" alt="Loción" fill className="object-contain" />
              </div>
              <div className="absolute top-16 right-0 bg-[#C71550] text-white text-[10px] font-bold px-2 py-0.5 rounded -rotate-6">¡GRATIS!</div>
              <p className="text-xs font-bold">Loción Perfumada</p>
              <p className="text-[10px] text-gray-500">Por la compra de cada Ccori Rosé Parfum.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-end">
             <div className="text-right w-full">
                <p className="text-sm text-gray-500">Precio normal</p>
                <p className="text-lg text-gray-400 line-through mb-1">US$ 74.00</p>
                <p className="text-sm font-bold text-gray-800">Hoy pagas solo</p>
                <p className="text-4xl font-bold text-[#C71550] mb-2">US$ 37.00</p>
                <div className="bg-[#A67C52] text-white font-bold py-1.5 px-4 rounded-md inline-block">
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

          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                <Image src="https://images.unsplash.com/photo-1601646271927-4b8c9d0b6787?auto=format&fit=crop&w=200&q=80" alt="Ciruela" fill className="object-cover" />
              </div>
              <p className="text-xs font-medium">Néctar de<br/>ciruela roja</p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                <Image src="https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=200&q=80" alt="Rosa" fill className="object-cover" />
              </div>
              <p className="text-xs font-medium">Rosa<br/>damascena</p>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                <Image src="https://images.unsplash.com/photo-1636916891637-2fb0c0906be9?auto=format&fit=crop&w=200&q=80" alt="Vainilla" fill className="object-cover" />
              </div>
              <p className="text-xs font-medium">Fondo cremoso<br/>de vainilla</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <div className="text-[#C71550]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c-.8-1.5-2.5-2-4-2-2 0-4 1.5-4 4 0 1.5 1 3 2.5 4-1.5-.5-3.5-.5-5 .5-1.5 1-2 3-1 4.5.5 1.5 2.5 2 4 2 .5 0 1 0 1.5-.5-1.5 1-2 2.5-1.5 4 .5 1.5 2 2 3.5 2 2 0 4-1.5 4-4 0-1.5-1-3-2.5-4 1.5.5 3.5.5 5-.5 1.5-1 2-3 1-4.5-.5-1.5-2.5-2-4-2-.5 0-1 0-1.5.5 1.5-1 2-2.5 1.5-4-.5-1.5-2-2-3.5-2-2 0-4 1.5-4 4z"/></svg>
              </div>
              <p className="text-sm font-medium">Aroma floral<br/>ambarado</p>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Intensidad alta</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-gray-800"></div>)}
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 py-4">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-pink-100">
          <div className="flex items-center gap-2 mb-5 text-gray-900 border-b border-gray-100 pb-3">
            <ShoppingCart className="text-[#C71550]" size={28} />
            <h2 className="text-xl font-bold">Haz tu pedido ahora</h2>
          </div>

          <form className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input type="text" placeholder="Nombre" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-gray-50" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input type="text" placeholder="Apellido" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-gray-50" />
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MessageCircle className="text-gray-400" size={16} />
              </div>
              <input type="tel" placeholder="WhatsApp (ej. 099 123 4567)" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-gray-50" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="text-gray-400" size={16} />
              </div>
              <select className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 appearance-none bg-gray-50 text-gray-500">
                <option value="">Sector (norte de Quito)</option>
                <option value="1">Sector 1</option>
                <option value="2">Sector 2</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <input type="text" placeholder="Dirección de entrega" className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-pink-300 bg-gray-50" />
            </div>
          </form>

          {/* Form Trust Badges */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <Truck className="text-[#C71550] flex-shrink-0" size={24} />
              <p className="text-sm font-medium">Entrega GRATIS<br/><span className="text-gray-500 font-normal">al norte de Quito</span></p>
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

          <button className="w-full bg-[#C71550] text-white font-bold py-4 rounded-full text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-[#a61141] transition-colors mb-4">
            <ShoppingCart size={24} />
            QUIERO MI CCORI ROSÉ &gt;
          </button>
          
          <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
            <Lock size={12} />
            <p><strong>Tus datos están protegidos.</strong> Solo los usamos para gestionar tu pedido.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
