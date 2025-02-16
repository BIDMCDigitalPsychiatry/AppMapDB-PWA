import React from "react";
import styles from "../styles/Home.module.css";

export const useUrlParameter = (paramName: any) => {
  try {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === paramName) {
        return sParameterName[1] === undefined
          ? true
          : decodeURIComponent(sParameterName[1]);
      }
    }
    return undefined;
  } catch (ex) {
    return undefined;
  }
};
export default function Home() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isIOS, setIsIOS] = React.useState(false);
  const [isStandalone, setIsStandalone] = React.useState(false);

  const installed = useUrlParameter("i");

  React.useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    setIsMounted(true);
  }, []);

  const installPrompt = installed === "1" ? false : isIOS && !isStandalone;
  const src = `https://mindapps.org/pwa?installPrompt=${installPrompt}&installed=${installed}`;

  // console.log({ src, installed, installPrompt, isIOS, isStandalone });

  return (
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
  );
}
