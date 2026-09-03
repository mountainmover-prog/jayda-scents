import { Link } from 'react-router';

export function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] bg-ink overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1767458770505-4daf3e3a3f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb24lMjBsdXh1cnl8ZW58MXx8fHwxNzcxNTY5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080)',
        }}
      >
        <div className="absolute inset-0 bg-ink/60" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl text-cream tracking-wide mb-6 leading-[1.15]">
            DISCOVER YOUR SIGNATURE SCENT
          </h1>
          <p className="text-base md:text-lg text-cream/80 font-body font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of luxury fragrances crafted for the modern connoisseur
          </p>
          <Link
            to="/shop"
            className="inline-block border border-gold text-cream px-10 py-3 text-xs tracking-[0.16em] hover:bg-gold hover:text-ink transition-colors duration-300"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
