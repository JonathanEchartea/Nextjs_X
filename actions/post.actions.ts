"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createPostSchema,updatePostSchema,} from "@/lib/validations/post.schema";

/* ======================
   CREAR
====================== */
export async function createPost(formData: FormData) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/signin");
  }

  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    redirect("/posts/new?error=title");
  }

  let user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: session.user.email,
        name: session.user.name ?? null,
      },
    });
  }

  await prisma.post.create({
    data: {
      title: result.data.title,
      content: result.data.content,
      authorId: user.id,
    },
  });

  redirect("/");
}

/* ======================
   ACTUALIZAR
====================== */
export async function updatePost(formData: FormData) {
  const data = {
    id: Number(formData.get("id")),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const result = updatePostSchema.safeParse(data);

  if (!result.success) {
    redirect(`/posts/${data.id}/edit?error=title`)
  }

  await prisma.post.update({
    where: {
      id: result.data.id,
    },
    data: {
      title: result.data.title,
      content: result.data.content,
    },
  });

  redirect("/");
}

/* ======================
   BORRAR
====================== */
export async function deletePost(formData: FormData) {
  const id = Number(formData.get("id"));

  await prisma.post.delete({
    where: {
      id,
    },
  });

  redirect("/");
}