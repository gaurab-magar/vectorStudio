import type { Variants } from "framer-motion";
import { fadeUp, fadeUpReduced, scaleIn, scaleInReduced } from "./motion-config";

export function getFadeVariants(reduce: boolean | null): Variants {
  return reduce ? fadeUpReduced : fadeUp;
}

export function getScaleInVariants(reduce: boolean | null): Variants {
  return reduce ? scaleInReduced : scaleIn;
}
