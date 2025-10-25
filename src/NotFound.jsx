export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B1220] text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-white/80 mb-6">Page not found</p>
      <a
        href="/"
        className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-medium hover:bg-indigo-600"
      >
        Back to Home
      </a>
    </div>
  );
}
