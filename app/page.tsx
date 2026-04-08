import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import { deletePost } from "@/actions/post.actions";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/signin");

  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />

      <main className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Posts</h1>

          <Link
            href="/posts/new"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Nuevo Post
          </Link>
        </div>

        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-4 rounded border">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p className="text-sm text-gray-600">
                Autor: {post.author.email}
              </p>

              <div className="mt-4 flex gap-4">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="text-blue-600"
                >
                  Editar
                </Link>

                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                    <button type="submit" className="text-red-600">
                      Borrar
                    </button>
                </form>

              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}