
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
  return (
    <div>
      <h1>Layout de admin</h1>
      {children}
    </div>
  );
}