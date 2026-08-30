import { Link } from 'react-router';

export function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1767458770505-4daf3e3a3f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlcyUyMGNvbGxlY3Rpb24lMjBsdXh1cnl8ZW58MXx8fHwxNzcxNTY5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl text-white tracking-wider mb-6">
            DISCOVER YOUR SIGNATURE SCENT
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of luxury fragrances crafted for the modern connoisseur
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-black px-8 py-3 text-sm tracking-wider hover:bg-gray-100 transition-colors"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
