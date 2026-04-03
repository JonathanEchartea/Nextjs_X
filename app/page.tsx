'use client';

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [ contador, setContador ] = React.useState<number>(0);

  const width = 200;
  const height = 200;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black">
        <div>Main</div>
        <Link href="/configuraciones">Admin</Link>
        <Image src="next.svg" alt="Vercel Logo" width={width} height={height} />
        <h1>Contador: {contador}</h1>
        <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      </main>
    { Home2() }
    </div>
  );
}


export function Home2() {
  const [ contador, setContador ] = React.useState<number>(0);

  const width = 200;
  const height = 200;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black">
        <div>Main</div>
        <Link href="/configuraciones">Admin</Link>
        <Image src="https://tech.sparkfabrik.com/images/content/nextjs/nextjs-logo.jpg" alt="Vercel Logo" width={width} height={height} />
        <h1>Contador: {contador}</h1>
        <button onClick={() => setContador(contador + 1)}>Incrementar</button>
      </main>
    </div>
  );
}
