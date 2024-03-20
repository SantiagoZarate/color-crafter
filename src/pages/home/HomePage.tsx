import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="w-full flex gap-8">
      <article className="flex-1 flex flex-col gap-2 items-center">
        <h1 className="text-3xl">Get em colors!</h1>
        <p>The easiest way to get your color palletes!</p>
      </article>
      <article className="flex-1">
        <header>Colors type</header>
        <ul className="grid grid-cols-4 gap-4">
          <Link
            className="border border-stone-800 bg-stone-900 rounded-xl p-6"
            to={"/predominant-colors"}
          >
            predominant colors
          </Link>
          <Link
            className="border border-stone-800 bg-stone-900 rounded-xl p-6"
            to={"/tailwind-translate"}
          >
            tailwind traslate
          </Link>
        </ul>
      </article>
    </section>
  );
}
