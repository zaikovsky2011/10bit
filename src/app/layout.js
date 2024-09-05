import "./globals.css";
import StarSky from "@/components/StarSky";
import Nav from "@/components/Nav";
import FullscreenImage from "@/components/FullscreenImage";


import dynamic from "next/dynamic";
const RotatingPlanet = dynamic(() => import("../components/RotatingPlanet"), {
  ssr: false,
});


export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <div>
          <Nav />
          {children}
          <RotatingPlanet />
          <StarSky />
          <FullscreenImage />
        </div>
      </body>
    </html>
  );
}
