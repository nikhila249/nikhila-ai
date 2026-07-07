import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-zinc-950 text-white p-8">
        <h1 className="text-4xl font-bold">
          Welcome back, Nikhila 👋
        </h1>

        <p className="text-zinc-400 mt-3">
          Your AI assistant is ready.
        </p>
      </main>
    </div>
  );
}