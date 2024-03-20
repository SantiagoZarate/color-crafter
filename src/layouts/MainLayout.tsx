import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="bg-stone-950 text-stone-200 min-h-screen">
      <img
        className="absolute w-full object-cover pointer-events-none animate-rotate-hue rotate-180 bottom-0"
        src="/images/light.avif"
        alt=""
      />
      <Outlet />
    </div>
  );
}
