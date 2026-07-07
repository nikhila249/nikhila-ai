export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-7xl font-extrabold tracking-tight">
          Nikhila AI
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
          Your AI-powered personal assistant for productivity,
          learning, freelancing and startups.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
            Get Started
          </button>

          <button className="px-8 py-4 rounded-xl border border-gray-600 hover:bg-white hover:text-black transition">
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}