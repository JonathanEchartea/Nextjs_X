import prisma from "@/lib/prisma";
import { updatePost, deletePost } from "@/actions/post.actions";
import TopBar from "@/components/layout/TopBar";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = searchParams
    ? await searchParams
    : undefined;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    notFound();
  }

  const showTitleError =
    resolvedSearchParams?.error === "title";

  return (
    <main className="p-6 space-y-6">
      <TopBar />

      <h1 className="text-xl font-bold">Editar Post</h1>

      <form action={updatePost} className="space-y-1">
        <input type="hidden" name="id" value={post.id} />

        <input
          type="text"
          name="title"
          defaultValue={post.title}
          className="border-2 border-gray-400 p-2 w-full mt-3"
        />

        {showTitleError && (
          <p className="text-yellow-600 text-sm">
            El título debe tener al menos 3 caracteres
          </p>
        )}

        <textarea
          name="content"
          defaultValue={post.content ?? ""}
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

      <form action={deletePost}>
        <input type="hidden" name="id" value={post.id} />

        <button type="submit" className="text-red-600">
          Borrar
        </button>
      </form>
    </main>
  );
}
