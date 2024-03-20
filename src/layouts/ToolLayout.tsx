import { tools } from "@/constants/tools";
import { Link, Outlet, useLocation } from "react-router-dom";

export function ToolLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col max-w-screen-xl mx-auto">
      <nav className="flex gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            to={tool.url}
            className={`py-4 px-4 border-b capitalize duration-150 transition-colors ${
              tool.url === pathname ? "border-stone-200" : "border-stone-400"
            }`}
          >
            {tool.name}
          </Link>
        ))}
      </nav>
      <main className="w-full h-full md:flex-row items-center flex-col flex gap-8">
        <Outlet />
      </main>
    </div>
  );
}
