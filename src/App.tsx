export default function App() {
  return (
    <div className=" bg-stone-950 text-stone-200">
      <main className="w-full h-full min-h-screen flex gap-2 items-center max-w-screen-xl mx-auto">
        <section className="flex-1 flex justify-center">
          <form
            action=""
            method="POST"
            className="flex flex-col items-center gap-8"
          >
            <label
              htmlFor="image"
              className="bg-stone-900 w-full p-6 rounded-xl border border-dashed border-stone-600 text-stone-600 hover:text-stone-300 hover:border-stone-300 duration-150 transition hover:-translate-y-1 cursor-pointer"
            >
              Upload your image
            </label>
            <input id="image" type="file" hidden />
            <button className="px-4 py-2 text-sm uppercase rounded-full w-fit bg-emerald-200 text-emerald-500 font-bold">
              Get colors!
            </button>
          </form>
        </section>
        <section className="flex-1 flex justify-center">
          i should display the colors here
        </section>
      </main>
    </div>
  );
}
