import { JetBrains_Mono } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			<body>{children}</body>
		</html>
	);
}
