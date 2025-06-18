export const metadata = {
  title: "Food Ordaring App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
