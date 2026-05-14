'use client';

import { useState } from 'react';
import { Plane, Hotel, Calendar, TrendingDown } from 'lucide-react';
import { format, addDays } from 'date-fns';

export default function UmreRadari() {
  const [departure, setDeparture] = useState<'ESB' | 'SAW'>('ESB');
  const [startDate, setStartDate] = useState('2026-09-07');
  const [nights, setNights] = useState(8);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runRadar = () => {
    setLoading(true);
    
    // Mock gerçekçi veri (Amadeus API ekleyince gerçek olacak)
    setTimeout(() => {
      const esbPrice = 19250;
      const sawPrice = 21700;
      const advantage = esbPrice < sawPrice ? 'ESB' : 'SAW';
      const diff = Math.abs(esbPrice - sawPrice);

      setResult({
        esb: {
          city: 'Ankara (ESB)',
          flight: 12400,
          hotel: 5850,
          transfer: 3000,
          total: esbPrice,
          hotelName: 'Makkah Hotel - Kabe 420m',
          flightDate: format(new Date(startDate), 'dd MMM yyyy'),
        },
        saw: {
          city: 'İstanbul (SAW)',
          flight: 14950,
          hotel: 5750,
          transfer: 3000,
          total: sawPrice,
          hotelName: 'Swissotel Makkah - Kabe 280m',
          flightDate: format(new Date(startDate), 'dd MMM yyyy'),
        },
        advantage,
        diff,
        date: format(new Date(startDate), 'dd MMMM yyyy'),
        nights,
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-xl">Umre Arbitraj Radarı</div>
              <div className="text-[10px] text-zinc-500 -mt-1">ESB vs SAW • 2026</div>
            </div>
          </div>
          <div className="text-xs px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">
            Canlı • Eylül 2026
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-zinc-900 rounded-full text-xs mb-4 border border-zinc-800">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            14 Mayıs 2026 • Güncel
          </div>
          <h1 className="text-6xl font-semibold tracking-tighter mb-4">
            En ucuz Umre paketini<br />bul
          </h1>
          <p className="text-xl text-zinc-400 max-w-md mx-auto">
            Ankara ve İstanbul çıkışlı Umre maliyetlerini anında karşılaştır
          </p>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Kalkış Havalimanı</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeparture('ESB')}
                  className={`flex-1 py-3 rounded-2xl border text-sm font-medium transition-all ${departure === 'ESB' ? 'bg-white text-black border-white' : 'border-zinc-700 hover:border-zinc-600'}`}
                >
                  Ankara (ESB)
                </button>
                <button
                  onClick={() => setDeparture('SAW')}
                  className={`flex-1 py-3 rounded-2xl border text-sm font-medium transition-all ${departure === 'SAW' ? 'bg-white text-black border-white' : 'border-zinc-700 hover:border-zinc-600'}`}
                >
                  İstanbul (SAW)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Gidiş Tarihi (Eylül 2026)</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min="2026-09-01"
                max="2026-09-30"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Konaklama (gece)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="7"
                  max="12"
                  value={nights}
                  onChange={(e) => setNights(parseInt(e.target.value))}
                  className="flex-1 accent-white"
                />
                <div className="w-12 text-center font-mono text-lg">{nights}</div>
              </div>
            </div>

            <button
              onClick={runRadar}
              disabled={loading}
              className="w-full py-4 bg-white text-black font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition disabled:opacity-70"
            >
              {loading ? (
                <>Hesaplanıyor...</>
              ) : (
                <>
                  <TrendingDown className="w-5 h-5" /> Radarı Çalıştır
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sonuçlar */}
        {result && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-emerald-400 text-sm tracking-[3px] font-medium">SONUÇLAR • {result.date}</div>
              <div className="text-3xl font-semibold mt-1">Paket Karşılaştırması</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* ESB Kartı */}
              <div className={`bg-zinc-900 border rounded-3xl p-7 ${result.advantage === 'ESB' ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-zinc-800'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                      <Plane className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{result.esb.city}</div>
                      <div className="text-xs text-zinc-500">{result.esb.flightDate}</div>
                    </div>
                  </div>
                  {result.advantage === 'ESB' && (
                    <div className="px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">EN UCUZ</div>
                  )}
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-400"><Plane className="w-4 h-4" /> Uçuş (gidiş-dönüş)</div>
                    <div className="font-mono">₺{result.esb.flight.toLocaleString('tr-TR')}</div>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-400"><Hotel className="w-4 h-4" /> Otel ({result.nights} gece)</div>
                    <div className="font-mono">₺{result.esb.hotel.toLocaleString('tr-TR')}</div>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-400">Transfer + Hızlı Tren</div>
                    <div className="font-mono">₺{result.esb.transfer.toLocaleString('tr-TR')}</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-800 flex items-baseline justify-between">
                  <div className="text-sm text-zinc-400">TOPLAM</div>
                  <div className="text-4xl font-semibold tracking-tighter">₺{result.esb.total.toLocaleString('tr-TR')}</div>
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">{result.esb.hotelName}</div>
              </div>

              {/* SAW Kartı */}
              <div className={`bg-zinc-900 border rounded-3xl p-7 ${result.advantage === 'SAW' ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-zinc-800'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                      <Plane className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-semibold">{result.saw.city}</div>
                      <div className="text-xs text-zinc-500">{result.saw.flightDate}</div>
                    </div>
                  </div>
                  {result.advantage === 'SAW' && (
                    <div className="px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full">EN UCUZ</div>
                  )}
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-400"><Plane className="w-4 h-4" /> Uçuş (gidiş-dönüş)</div>
                    <div className="font-mono">₺{result.saw.flight.toLocaleString('tr-TR')}</div>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-400"><Hotel className="w-4 h-4" /> Otel ({result.nights} gece)</div>
                    <div className="font-mono">₺{result.saw.hotel.toLocaleString('tr-TR')}</div>
                  </div>
                  <div className="flex justify-between py-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2 text-zinc-400">Transfer + Hızlı Tren</div>
                    <div className="font-mono">₺{result.saw.transfer.toLocaleString('tr-TR')}</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-800 flex items-baseline justify-between">
                  <div className="text-sm text-zinc-400">TOPLAM</div>
                  <div className="text-4xl font-semibold tracking-tighter">₺{result.saw.total.toLocaleString('tr-TR')}</div>
                </div>
                <div className="text-[10px] text-emerald-400 mt-1">{result.saw.hotelName}</div>
              </div>
            </div>

            {/* Rapor */}
            <div className="mt-8 bg-zinc-900 border border-emerald-900 rounded-3xl p-8 text-center">
              <div className="text-emerald-400 text-sm mb-2">FİNANSAL RAPOR</div>
              <div className="text-2xl font-semibold">
                {result.advantage === 'ESB' ? 'Ankara (ESB)' : 'İstanbul (SAW)'} 
                {' '}bu hafta <span className="text-emerald-400">₺{result.diff.toLocaleString('tr-TR')}</span> daha avantajlı
              </div>
              <div className="text-sm text-zinc-400 mt-2 max-w-xs mx-auto">
                Kabe'ye 1 km altı oteller dahil • 2 yetişkin • Sabit 3000 TL transfer
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-xs text-zinc-500 py-10 border-t border-zinc-900">
        Umre Arbitraj Radarı • Gerçek fiyatlar için Amadeus API entegre edilecek • Hasan için özel
      </footer>
    </div>
  );
}
