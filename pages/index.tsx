import React from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  
  const [isMounted, setIsMounted] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const [isStandalone, setIsStandalone] = React.useState(false);

  React.useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    setIsMounted(true);
  }, []);

  const installPrompt = isIOS && !isStandalone;
  const src = `https://mindapps.org/pwa?installPrompt=${installPrompt}`;

  console.log({ src, installPrompt, isIOS, isStandalone });

  return (
    <div>
      <main>
        {isMounted && (
          <iframe
            style={{
              display: "block",
              height: "100vh",
              width: "100vw",
              border: "none",
            }}
            src={src}
          />
        )}
      </main>
    </div>
  );
}
