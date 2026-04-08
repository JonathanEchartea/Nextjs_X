import { createPost } from "@/actions/post.actions";
import TopBar from "@/components/layout/TopBar";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedSearchParams = searchParams
    ? await searchParams
    : undefined;

  const showTitleError =
    resolvedSearchParams?.error === "title";

  return (
    <main className="p-6 space-y-4">
      <TopBar />

      <h1 className="text-xl font-bold">New Post</h1>

      <form action={createPost} className="space-y-1">
        <input
          type="text"
          name="title"
          className="border-2 border-gray-400 p-2 w-full mt-3"
        />

        {showTitleError && (
          <p className="text-yellow-600 text-sm">
            El título debe tener al menos 3 caracteres
          </p>
        )}

        <textarea
          name="content"
          className="border-2 border-gray-400 p-2 w-full mt-3"
          rows={4}
        ></textarea>

        <div className="flex gap-4 mt-4">
          <button type="submit" className="text-blue-600">
            Guardar
          </button>

          <a href="/" className="text-blue-600">
            Cancelar
          </a>
        </div>
      </form>
    </main>
  );
}
