import React, { useState, FormEvent, useEffect, createContext, useContext } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Factory, Beaker, Globe, MapPin, Phone, Mail, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { L } from './translations';

type Language = 'en' | 'ar';
const LangContext = createContext<{ lang: Language; t: (key: keyof typeof L.en) => string; toggleLang: () => void }>({
  lang: 'en',
  t: () => '',
  toggleLang: () => {},
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, t, toggleLang } = useContext(LangContext);
  
  const isRtl = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav_about'), href: '#about' },
    { name: t('nav_why'), href: '#why-us' },
    { name: t('nav_systems'), href: '#pu-systems' },
    { name: t('nav_polyurea'), href: '#polyurea' },
    { name: t('nav_facility'), href: '#facility' },
    { name: t('nav_certifications'), href: '#certifications' },
    { name: t('nav_agency'), href: '#agency' },
    { name: t('nav_contact'), href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-navy rounded flex items-center justify-center text-white font-display font-bold text-xl leading-none">T</div>
          <span className="font-display font-bold text-xl text-dark-navy tracking-tight">Technocom</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-sm font-medium text-dark-navy/80 hover:text-deep-red transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className={`flex items-center gap-4 border-${isRtl ? 'r' : 'l'} border-dark-navy/10 p${isRtl ? 'r' : 'l'}-6`}>
            <button 
              onClick={toggleLang}
              className="text-sm font-medium text-dark-navy hover:text-navy transition-colors font-display"
            >
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
            <a 
              href="#contact" 
              className="bg-navy hover:bg-dark-navy text-white px-5 py-2.5 rounded-[var(--radius-global)] text-sm font-semibold transition-all inline-flex items-center gap-2"
            >
              {t('nav_cta')}
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-dark-navy"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col gap-4 border-t border-gray-100">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-dark-navy py-2 border-b border-gray-50 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between mt-4">
            <button 
              onClick={() => {
                toggleLang();
                setIsOpen(false);
              }}
              className="text-lg font-medium text-navy font-display"
            >
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
            <a 
              href="#contact" 
              className="bg-deep-red text-white px-6 py-3 rounded-[var(--radius-global)] font-semibold text-center"
              onClick={() => setIsOpen(false)}
            >
              {t('nav_cta')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { t } = useContext(LangContext);
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-navy opacity-5"></div>
      
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-deep-red/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

      <div className="section-container relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="inline-block py-1.5 px-3 rounded-full bg-navy/10 text-navy font-semibold text-sm mb-6 border border-navy/20 uppercase tracking-wider">
            {t('h1_ey')}
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 text-dark-navy" dangerouslySetInnerHTML={{ __html: t('h1_ti') }}></h1>
          <p className="text-lg text-dark-navy/70 mb-10 max-w-2xl leading-relaxed">
            {t('h1_sub')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#pu-systems" className="bg-navy hover:bg-dark-navy text-white px-8 py-4 rounded-[var(--radius-global)] font-semibold transition-all flex items-center gap-2">
              {t('h1_b1')} <ArrowRight size={20} className="rtl:rotate-180" />
            </a>
            <a href="#contact" className="bg-white hover:bg-gray-50 text-dark-navy border border-dark-navy/10 px-8 py-4 rounded-[var(--radius-global)] font-semibold transition-all">
              {t('h1_b2')}
            </a>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative bg-dark-navy">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80" 
              alt={t('h1_cap')}
              className="object-cover w-full h-full opacity-80 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsBanner = () => {
  const { t } = useContext(LangContext);
  
  return (
    <div className="bg-white border-b border-dark-navy/5 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-display font-bold text-navy mb-2">{t('s1n')}</div>
            <div className="text-sm font-medium text-dark-navy/70 uppercase tracking-wider">{t('s1l')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-display font-bold text-navy mb-2">{t('s2n')}</div>
            <div className="text-sm font-medium text-dark-navy/70 uppercase tracking-wider">{t('s2l')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-display font-bold text-navy mb-2">{t('s3n')}</div>
            <div className="text-sm font-medium text-dark-navy/70 uppercase tracking-wider">{t('s3l')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-display font-bold text-navy mb-2">MENA</div>
            <div className="text-sm font-medium text-dark-navy/70 uppercase tracking-wider">{t('wt1_t')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { t } = useContext(LangContext);
  return (
    <section id="about" className="bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80" alt="Laboratory testing" className="rounded-xl w-full h-48 object-cover shadow-lg" />
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80" alt="Factory floor" className="rounded-xl w-full h-48 object-cover mt-8 shadow-lg" />
            </div>
          </div>
          <div>
            <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('ab_ey')}</h2>
            <h3 className="text-4xl font-bold mb-6">{t('ab_ti')}</h3>
            <p className="text-dark-navy/70 mb-6 leading-relaxed">{t('ab_p1')}</p>
            <p className="text-dark-navy/70 mb-8 leading-relaxed">{t('ab_p2')}</p>
            
            <ul className="space-y-4">
              {[
                { title: t('t1h'), desc: t('t1p') },
                { title: t('t2h'), desc: t('t2p') },
                { title: t('t3h'), desc: t('t3p') },
                { title: t('t4h'), desc: t('t4p') }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-navy flex-shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-bold text-dark-navy block">{item.title}</span>
                    <span className="text-dark-navy/70 text-sm block">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const { t } = useContext(LangContext);
  const features = [
    { icon: <Globe size={24} />, title: t('wt3_t'), desc: t('wt3_p') },
    { icon: <Factory size={24} />, title: t('wt4_t'), desc: t('wt4_p') },
    { icon: <ShieldCheck size={24} />, title: t('wt2_t'), desc: t('wt2_p') },
    { icon: <Beaker size={24} />, title: t('wt1_t'), desc: t('wt1_p') }
  ];

  return (
    <section id="why-us" className="bg-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('wt_ey')}</h2>
          <h3 className="text-4xl font-bold mb-6">{t('wt_ti')}</h3>
          <br /><h3 className="text-4xl font-bold mb-6">{t('wt_ti2')}</h3>
          <p className="text-white/80 leading-relaxed">{t('wt_su')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((f, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-deep-red rounded-lg flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{f.title}</h4>
              <p className="text-white/70 leading-relaxed text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Founder Block */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-dark-navy grid md:grid-cols-5 gap-8 items-center shadow-xl">
          <div className="md:col-span-2">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-200">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" alt={t('fd_name')} className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
          <div className="md:col-span-3">
            <blockquote className="text-xl font-medium leading-relaxed mb-6">
              {t('fd_desc')}
            </blockquote>
            <div>
              <div className="font-bold text-lg text-navy">{t('fd_name')}</div>
              <div className="text-dark-navy/60">{t('fd_role')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SystemsGrid = () => {
  const { t } = useContext(LangContext);
  const systems = [
    { name: t('a1t'), desc: t('a1p'), img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80" },
    { name: t('a2t'), desc: t('a2p'), img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80" },
    { name: t('a3t'), desc: t('a3p'), img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80" },
    { name: t('a4t'), desc: t('a4p'), img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
    { name: t('a5t'), desc: t('a5p'), img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80" },
    { name: t('a6t'), desc: t('a6p'), img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=80" },
    { name: t('a7t'), desc: t('a7p'), img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&q=80" },
    { name: t('a8t'), desc: t('a8p'), img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80" },
  ];

  return (
    <section id="pu-systems" className="bg-light-bg">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('h2_ey')}</h2>
            <h3 className="text-4xl font-bold mb-4">{t('h2_ti')}</h3>
            <p className="text-dark-navy/70 leading-relaxed">{t('h2_sub')}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systems.map((sys, i) => (
            <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-dark-navy/5 hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="h-40 overflow-hidden">
                <img src={sys.img} alt={sys.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex-grow">
                <h4 className="text-xl font-bold mb-2 text-navy">{sys.name}</h4>
                <p className="text-dark-navy/70 leading-relaxed text-sm">{sys.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-dark-navy/60 italic text-sm">{t('sy_no')}</p>
      </div>
    </section>
  );
};

const Polyurea = () => {
  const { t } = useContext(LangContext);
  return (
    <section id="polyurea" className="bg-white">
      <div className="section-container">
        <div className="bg-dark-navy text-white rounded-3xl overflow-hidden grid lg:grid-cols-2 shadow-2xl">
          <div className="p-12 lg:p-16 flex flex-col justify-center">
            <div className="inline-block bg-deep-red text-white text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-full mb-6 w-max">
              {t('pu_ba')}
            </div>
            <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('pu_ey')}</h2>
            <h3 className="text-4xl lg:text-5xl font-bold mb-6">{t('pu_ti')}</h3>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {t('pu_su')}
            </p>
            <ul className="space-y-4 mb-10">
              {[
                { title: t('w1t'), desc: t('w1p') },
                { title: t('w2t'), desc: t('w2p') },
                { title: t('w3t'), desc: t('w3p') }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-deep-red mt-1" size={20} />
                  <div>
                    <span className="font-bold text-white block">{item.title}</span>
                    <span className="text-white/70 text-sm block">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <a href="#contact" className="bg-white text-dark-navy hover:bg-light-bg px-8 py-4 rounded-xl font-bold text-center transition-colors w-max">
              {t('h3_b1')}
            </a>
          </div>
          <div className="relative min-h-[400px]">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt={t('h3_ey')} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-navy to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Facility = () => {
  const { t } = useContext(LangContext);
  return (
    <section id="facility" className="bg-light-bg border-y border-dark-navy/5">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&q=80" className="w-full h-64 object-cover rounded-xl shadow-lg" alt={t('fac_cap1')} />
                <div className="bg-navy text-white p-6 rounded-xl shadow-lg">
                  <div className="font-bold text-lg mb-1">{t('ff1t')}</div>
                  <div className="text-white/90 text-sm mb-2">{t('ff1v')}</div>
                  <p className="text-white/60 text-xs">{t('ff1p')}</p>
                </div>
              </div>
              <div className="space-y-4 mt-12">
                <div className="bg-deep-red text-white p-6 rounded-xl shadow-lg">
                  <div className="font-bold text-lg mb-1">{t('ff2t')}</div>
                  <div className="text-white/90 text-sm mb-2">{t('ff2v')}</div>
                  <p className="text-white/60 text-xs">{t('ff2p')}</p>
                </div>
                <div className="bg-white text-dark-navy p-6 rounded-xl shadow-lg border border-dark-navy/5">
                  <div className="font-bold text-lg mb-1 text-navy">{t('ff3t')}</div>
                  <div className="text-dark-navy/90 text-sm mb-2">{t('ff3v')}</div>
                  <p className="text-dark-navy/60 text-xs">{t('ff3p')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:pl-10">
            <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('fac_ey')}</h2>
            <h3 className="text-4xl font-bold mb-6">{t('fac_ti')}</h3>
            <p className="text-dark-navy/70 mb-6 leading-relaxed">
              {t('fac_su')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const { t } = useContext(LangContext);
  const certs = [
    { title: t('cert1_t'), desc: t('cert1_p'), img: "https://technocom-polyurethanes.github.io/website/src/ISO_9001.jpeg" },
    { title: t('cert2_t'), desc: t('cert2_p'), img: "https://technocom-polyurethanes.github.io/website/src/ISO_14001.jpg" },
    { title: t('cert3_t'), desc: t('cert3_p'), img: "https://technocom-polyurethanes.github.io/website/src/ISO_45001.jpg" },
  ];

  return (
    <section id="certifications" className="bg-white py-20">
      <div className="section-container text-center">
        <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('cert_ey')}</h2>
        <h3 className="text-3xl font-bold mb-12">{t('cert_ti')}</h3>
        <p className="text-dark-navy/70 max-w-2xl mx-auto mb-12">{t('cert_su')}</p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {certs.map((cert, i) => (
            <div key={i} className="flex flex-col items-center bg-light-bg p-6 rounded-2xl border border-dark-navy/5 max-w-[320px] w-full group hover:shadow-xl transition-all">
              <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-6 relative">
                <img src={`${cert.img}`} onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80`;
                }} alt={cert.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-all flex items-center justify-center">
                  <div className="bg-white text-navy px-4 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    {t('cert_view')}
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-xl mb-2 text-dark-navy">{cert.title}</h4>
              <p className="text-dark-navy/60 text-sm text-center">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Agency = () => {
  const { t } = useContext(LangContext);
  return (
    <section id="agency" className="bg-navy text-white">
      <div className="section-container text-center max-w-4xl mx-auto">
        <Globe className="w-16 h-16 mx-auto mb-8 text-deep-red opacity-80" />
        <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('ag_ey')}</h2>
        <h3 className="text-3xl lg:text-5xl font-bold mb-6">{t('ag_ti')}</h3>
        <p className="text-lg text-white/70 leading-relaxed mb-10">
          {t('ag_su')}
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            { s: t('ag1s'), r: t('ag1r') },
            { s: t('ag2s'), r: t('ag2r') },
            { s: t('ag3s'), r: t('ag3r') },
            { s: t('ag4s'), r: t('ag4r') },
            { s: t('ag5s'), r: t('ag5r') },
            { s: t('ag6s'), r: t('ag6r') }
          ].map((ag, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl text-left">
              <div className="text-deep-red font-bold text-sm uppercase tracking-wider mb-2">{ag.s}</div>
              <div className="text-white/90">{ag.r}</div>
            </div>
          ))}
        </div>
        <p className="text-white/50 text-sm italic">{t('ag_note')}</p>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t, lang } = useContext(LangContext);
  const isRtl = lang === 'ar';
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-light-bg relative">
      <div className="section-container">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-5">
          
          {/* Contact Info */}
          <div className="lg:col-span-2 bg-dark-navy text-white p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-navy/20 pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-deep-red/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <h2 className="text-deep-red font-semibold tracking-wider uppercase text-sm mb-3">{t('co_ey')}</h2>
              <h3 className="text-3xl font-bold mb-4">{t('co_ti')}</h3>
              <p className="text-white/70 mb-12">{t('co_su')}</p>
              
              <div className="space-y-8 flex-grow">
                <div className="flex items-start gap-4">
                  <Mail className="text-deep-red mt-1" />
                  <div>
                    <div className="font-bold mb-1">Email Us</div>
                    <a href="mailto:sales@technocom.org" className="text-white/80 hover:text-white transition-colors">sales@technocom.org</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="text-deep-red mt-1" />
                  <div>
                    <div className="font-bold mb-1">{t('ci2h')}</div>
                    <a href="tel:+20237602927" className="text-white/80 hover:text-white transition-colors block" dir="ltr">(+202) 3760 2927</a>
                    <a href="tel:+20237602735" className="text-white/80 hover:text-white transition-colors block" dir="ltr">(+202) 3760 2735</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="text-deep-red mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-bold mb-1">{t('ci1h')}</div>
                    <p className="text-white/80">{t('foot_office')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Factory className="text-deep-red mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-bold mb-1">{t('ci1bh')}</div>
                    <p className="text-white/80">{t('foot_factory')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 p-10 lg:p-12">
            {formStatus === 'success' ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-xl border border-green-100">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <p className="text-green-700 font-bold text-xl">{t('fs_ok')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-dark-navy">{t('fl1')}</label>
                    <input required type="text" id="name" className={`w-full px-4 py-3 rounded-lg bg-light-bg border border-dark-navy/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all ${isRtl ? 'text-right' : 'text-left'}`} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-dark-navy">{t('fl2')}</label>
                    <input type="text" id="company" className={`w-full px-4 py-3 rounded-lg bg-light-bg border border-dark-navy/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all ${isRtl ? 'text-right' : 'text-left'}`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-dark-navy">{t('fl3')}</label>
                  <input required type="email" id="email" className={`w-full px-4 py-3 rounded-lg bg-light-bg border border-dark-navy/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all ${isRtl ? 'text-right' : 'text-left'}`} />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-dark-navy">{t('fl4')}</label>
                  <select id="subject" className={`w-full px-4 py-3 rounded-lg bg-light-bg border border-dark-navy/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all ${isRtl ? 'text-right' : 'text-left'}`}>
                    <option>{t('fo0')}</option>
                    <option>{t('fo1')}</option>
                    <option>{t('fo2')}</option>
                    <option>{t('fo3')}</option>
                    <option>{t('fo4')}</option>
                    <option>{t('fo5')}</option>
                    <option>{t('fo6')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-dark-navy">{t('fl5')}</label>
                  <textarea required id="message" rows={4} className={`w-full px-4 py-3 rounded-lg bg-light-bg border border-dark-navy/10 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none transition-all resize-none ${isRtl ? 'text-right' : 'text-left'}`}></textarea>
                </div>

                <button 
                  disabled={formStatus === 'submitting'}
                  type="submit" 
                  className="w-full bg-navy hover:bg-dark-navy disabled:bg-navy/50 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t('fs_sending')}
                    </span>
                  ) : (
                    t('fb')
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useContext(LangContext);
  return (
    <footer className="bg-dark-navy text-white/70 pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-dark-navy font-display font-bold text-xl leading-none">T</div>
              <span className="font-display font-bold text-xl text-white tracking-tight">Technocom</span>
            </a>
            <p className="text-sm mb-6 leading-relaxed">
              {t('foot_blurb')}
            </p>
            <div className="flex gap-3">
              <span className="bg-white/10 text-xs px-2 py-1 rounded">ISO 9001</span>
              <span className="bg-white/10 text-xs px-2 py-1 rounded">ISO 14001</span>
              <span className="bg-white/10 text-xs px-2 py-1 rounded">ISO 45001</span>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6">{t('foot_nav')}</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">{t('nav_about')}</a></li>
              <li><a href="#pu-systems" className="hover:text-white transition-colors">{t('nav_systems')}</a></li>
              <li><a href="#polyurea" className="hover:text-white transition-colors">{t('nav_polyurea')}</a></li>
              <li><a href="#facility" className="hover:text-white transition-colors">{t('nav_facility')}</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">{t('nav_certifications')}</a></li>
              <li><a href="#agency" className="hover:text-white transition-colors">{t('nav_agency')}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">{t('foot_contact')}</h5>
            <ul className="space-y-3 text-sm">
              <li><p>{t('foot_office')}</p></li>
              <li><p>{t('foot_factory')}</p></li>
              <li><a href="tel:+20237602927" dir="ltr" className="hover:text-white">(+202) 3760 2927</a></li>
              <li><a href="tel:+20237602735" dir="ltr" className="hover:text-white">(+202) 3760 2735</a></li>
              <li><a href="mailto:sales@technocom.org" className="hover:text-white">sales@technocom.org</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} {t('foot_rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const t = (key: keyof typeof L.en) => {
    return (L[lang] as any)[key] || L.en[key] || '';
  };

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      <div 
        dir={lang === 'ar' ? 'rtl' : 'ltr'} 
        className="min-h-screen font-sans text-dark-navy selection:bg-navy selection:text-white"
      >
        <Navbar />
        <main>
          <Hero />
          <StatsBanner />
          <About />
          <WhyUs />
          <SystemsGrid />
          <Polyurea />
          <Facility />
          <Certifications />
          <Agency />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangContext.Provider>
  );
}
