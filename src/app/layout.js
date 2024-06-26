import "./globals.css";
import StarSky from "@/components/StarSky";
import Nav from "@/components/Nav";
import FullscreenImage from "@/components/FullscreenImage";
import { ExitingProvider } from "@/components/ExitingContext";
import { Montserrat } from "next/font/google";

import dynamic from "next/dynamic";
const RotatingPlanet = dynamic(() => import("../components/RotatingPlanet"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>
				<ExitingProvider>
          <Nav />
          {children}
          <RotatingPlanet />
          <StarSky />
          <FullscreenImage />
					</ExitingProvider>
        </div>
      </body>
    </html>
  );
}
