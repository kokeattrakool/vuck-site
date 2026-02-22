import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Zap, ChevronRight, Filter, Package, MessageCircle, X, Phone, MapPin, Clock } from 'lucide-react';

// === ส่วนที่ 1: รายการสินค้า (คุณแก้ชื่อ ราคา และรูปตรงนี้ได้เลย) ===
const products = [
  { id: 1, name: 'สายไฟ THW 1x1.5 SQ.MM. (100m)', category: 'สายไฟ', price: '450', unit: 'ม้วน', stock: 'มีสินค้า', color: 'bg-red-600', imageUrl: '' },
  { id: 2, name: 'สายไฟ VAF 2x2.5 SQ.MM. (100m)', category: 'สายไฟ', price: '1,250', unit: 'ม้วน', stock: 'มีสินค้า', color: 'bg-zinc-400', imageUrl: '' },
  { id: 3, name: 'ท่อร้อยสายไฟ PVC 20mm (ขาว)', category: 'ท่อร้อยสายไฟ', price: '45', unit: 'เส้น', stock: 'มีสินค้า', color: 'bg-white border', imageUrl: '' },
  { id: 4, name: 'เบรกเกอร์ 2P 32A (VUCK Series)', category: 'อุปกรณ์ควบคุม', price: '220', unit: 'ตัว', stock: 'มีสินค้า', color: 'bg-zinc-800', imageUrl: '' },
  { id: 5, name: 'สวิตช์ไฟ 1 ทาง (Modern White)', category: 'อุปกรณ์สวิตช์', price: '85', unit: 'ตัว', stock: 'สินค้าหมดชั่วคราว', color: 'bg-slate-50 border', imageUrl: '' }
];

const categories = ['ทั้งหมด', 'สายไฟ', 'ท่อร้อยสายไฟ', 'อุปกรณ์ฟิตติ้ง', 'อุปกรณ์ควบคุม', 'อุปกรณ์สวิตช์'];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [notification, setNotification] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOrder = (productName) => {
    const lineId = "YOUR_LINE_ID"; // แก้เป็น Line ID ของคุณ
    const message = encodeURIComponent(`สวัสดีครับ สนใจสั่งซื้อสินค้า: ${productName}`);
    window.open(`https://line.me/R/oaMessage/${lineId}/?${message}`, '_blank');
    setNotification(`กำลังนำคุณไปยัง Line เพื่อสั่งซื้อ ${productName}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 scroll-smooth">
      {notification && (
        <div className="fixed top-24 right-4 z-[100] bg-zinc-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-l-4 border-red-600">
          <MessageCircle size={20} className="text-red-500" />
          <span className="font-bold text-sm">{notification}</span>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-700 p-1.5 rounded-lg shadow-lg">
              <zap size={20} className="text-white fill-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter italic text-zinc-900">VUCK</h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-[0.2em]">
            <a href="#home" className="hover:text-red-600 transition-colors">หน้าแรก</a>
            <a href="#products" className="hover:text-red-600 transition-colors">สินค้า</a>
            <a href="#contact" className="hover:text-red-600 transition-colors">ติดต่อเรา</a>
          </div>
          <button className="bg-red-700 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-red-800 transition-all shadow-lg shadow-red-900/20">
            ติดต่อด่วน
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <section id="home" className="relative h-[80vh] flex items-center justify-center bg-zinc-900 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <div className="inline-block px-4 py-1.5 bg-red-700/20 border border-red-700/50 rounded-full text-red-500 text-[10px] font-black tracking-[0.3em] mb-8 uppercase">
            PROFESSIONAL ELECTRICAL SUPPLIES
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tighter uppercase italic">
            POWERING <br /> <span className="text-red-600">YOUR FUTURE</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            คัดสรรอุปกรณ์ไฟฟ้ามาตรฐานอุตสาหกรรม ครบจบในที่เดียว 
            เพื่อความปลอดภัยและประสิทธิภาพสูงสุดในงานของคุณ
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 font-bold uppercase tracking-widest text-xs">
            <a href="#products" className="bg-white text-zinc-900 px-10 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-xl">
              เลือกซื้อสินค้า
            </a>
            <div className="flex items-center gap-3 text-zinc-400">
              <Phone size={18} />
              <span>02-XXX-XXXX</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl text-left">
            <h3 className="text-4xl font-black tracking-tighter mb-4 uppercase italic">Catalog <span className="text-red-600">Items</span></h3>
            <div className="h-1.5 w-20 bg-red-700 rounded-full"></div>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="ค้นหาอุปกรณ์ไฟฟ้า..." 
              className="w-full bg-zinc-100 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-red-600 outline-none transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Categories Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
             <div className="sticky top-24 space-y-2 bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-100/50 border border-slate-50">
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4">Categories</h4>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-red-700 text-white shadow-lg shadow-red-900/20' : 'text-zinc-500 hover:bg-zinc-100'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-[2rem] border border-zinc-50 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col">
                    <div className="h-56 bg-zinc-50 relative flex items-center justify-center overflow-hidden">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                        <div className={`w-32 h-32 rounded-full ${product.color} opacity-10 absolute animate-pulse group-hover:scale-150 transition-transform duration-700`}></div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${product.stock === 'มีสินค้า' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">{product.category}</div>
                      <h5 className="text-xl font-bold text-zinc-900 mb-6 leading-tight min-h-[3rem]">{product.name}</h5>
                      <div className="flex items-center justify-between pt-6 border-t border-zinc-100 mt-auto">
                         <div>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ราคาประมาณ</span>
                            <div className="text-2xl font-black text-zinc-900">฿{product.price}<span className="text-xs font-normal text-zinc-500"> /{product.unit}</span></div>
                         </div>
                         <button 
                          onClick={() => handleOrder(product.name)}
                          className="bg-zinc-900 text-white p-4 rounded-2xl hover:bg-green-600 transition-all shadow-lg active:scale-95"
                         >
                           <MessageCircle size={20} fill="currentColor" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-40 border-2 border-dashed border-zinc-100 rounded-[3rem]">
                <Package className="mx-auto text-zinc-200 mb-6" size={60} />
                <p className="font-bold text-zinc-400 italic text-xl tracking-tight">ไม่พบรายการสินค้าที่ค้นหา</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-zinc-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20">
           <div className="text-left">
              <div className="flex items-center gap-2 mb-8">
                <Zap size={24} className="text-red-700 fill-red-700" />
                <h4 className="text-3xl font-black tracking-tighter italic">VUCK</h4>
              </div>
              <p className="text-zinc-500 mb-10 max-w-sm">
                VUCK ELECTRICAL INNOVATION - แหล่งรวมอุปกรณ์ไฟฟ้าที่คุณวางใจ 
                คุณภาพมาตรฐานโครงการ ในราคาที่เข้าถึงได้จริง
              </p>
              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer font-bold text-white flex items-center justify-center">L</div>
                 <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center hover:bg-red-700 transition-colors cursor-pointer font-bold text-white flex items-center justify-center">F</div>
              </div>
           </div>
           <div className="space-y-8 text-left">
              <h5 className="font-black text-sm uppercase tracking-[0.3em] text-red-700">Contact Us</h5>
              <div className="space-y-4 font-bold text-zinc-400">
                 <p className="flex items-center gap-3"><MapPin size={18} className="text-zinc-700" /> 123 ถนนอุตสาหกรรม แขวงเมือง กรุงเทพฯ</p>
                 <p className="flex items-center gap-3"><Phone size={18} className="text-zinc-700" /> 02-XXX-XXXX</p>
                 <p className="flex items-center gap-3"><Clock size={18} className="text-zinc-700" /> จันทร์ - เสาร์: 08:30 - 18:00</p>
              </div>
           </div>
        </div>
        <div className="text-center mt-20 pt-8 border-t border-zinc-800 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">
          © 2024 VUCK ELECTRICAL - PROFESSIONAL CHOICE
        </div>
      </footer>
    </div>
  );
};

export default App;
