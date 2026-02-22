import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Zap, ChevronRight, Filter, Package, MessageCircle, X, Phone, MapPin, Clock } from 'lucide-react';

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
    const lineId = "YOUR_LINE_ID"; 
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

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-700 p-1.5 rounded-lg">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <h1 className={`text-2xl font-black tracking-tighter italic ${isScrolled ? 'text-zinc-900' : 'text-zinc-900 md:text-white'}`}>VUCK</h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-[0.2em]">
            <a href="#home">หน้าแรก</a>
            <a href="#products">สินค้า</a>
            <a href="#contact">ติดต่อเรา</a>
          </div>
          <button className="bg-red-700 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg">ติดต่อด่วน</button>
        </div>
      </nav>

      <section id="home" className="relative min-h-[70vh] flex items-center justify-center bg-zinc-900">
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tighter uppercase italic">VUCK <br /><span className="text-red-600">Electric</span></h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">คัดสรรอุปกรณ์ไฟฟ้ามาตรฐาน ครบจบในที่เดียว</p>
          <a href="#products" className="bg-white text-zinc-900 px-10 py-4 rounded-2xl font-black text-sm inline-block shadow-xl">เลือกซื้อสินค้า</a>
        </div>
      </section>

      <section id="products" className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h3 className="text-3xl font-black uppercase italic underline decoration-red-600 decoration-4 underline-offset-8">สินค้าของเรา</h3>
          <div className="relative w-full md:w-80">
            <input type="text" placeholder="ค้นหาสินค้า..." className="w-full bg-zinc-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-red-600 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-64 shrink-0">
             <div className="sticky top-24 space-y-2">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-red-700 text-white shadow-lg' : 'text-zinc-500 hover:bg-zinc-100'}`}>{cat}</button>
                ))}
             </div>
          </aside>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-xl transition-all p-6">
                <div className="h-48 bg-zinc-50 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? <img src={product.imageUrl} className="w-full h-full object-cover" /> : <ShoppingBag size={48} className="text-zinc-200" />}
                </div>
                <div className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">{product.category}</div>
                <h5 className="text-lg font-bold text-zinc-900 mb-6 leading-tight">{product.name}</h5>
                <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                  <div className="text-xl font-black text-zinc-900">฿{product.price}</div>
                  <button onClick={() => handleOrder(product.name)} className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-red-700 transition-all"><MessageCircle size={20} fill="currentColor" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] bg-zinc-900 border-t border-red-900">
        © 2024 VUCK ELECTRICAL - PROFESSIONAL CHOICE
      </footer>
    </div>
  );
};

export default App;
