function AppSearchForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    if (typeof name !== "string" || name.length <= 1) {
      return;
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="col-span-2 mt-12 mb-8 flex flex-col gap-3 text-xl xl:mt-16 xl:mb-12 xl:flex-row xl:justify-center xl:gap-4"
    >
      <label className="flex h-14 items-center gap-4 rounded-xl bg-neutral-800 px-6 xl:w-[526px]">
        <img src="/icon-search.svg" alt="" />

        <input
          name="name"
          type="text"
          placeholder="Search for a place..."
          aria-label="Search for a place"
          className="h-full w-full placeholder:text-neutral-200"
        />
      </label>

      <button type="submit" className="h-14 rounded-xl bg-blue-500 xl:px-6">
        Search
      </button>
    </form>
  );
}

export default AppSearchForm;
