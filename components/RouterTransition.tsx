import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  NavigationProgress,
  startNavigationProgress,
  incrementNavigationProgress,
  resetNavigationProgress,
} from "@mantine/nprogress";

export function RouterTransition() {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (/* url: string */) => {
      // if (url !== router.asPath) {
      resetNavigationProgress();
      startNavigationProgress();
      // }
    };
    const handleComplete = () => {
      incrementNavigationProgress(100);
    };
    const handleError = () => {
      resetNavigationProgress();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router.asPath]);

  return <NavigationProgress />;
}
