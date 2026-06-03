import { Composition } from "remotion";
import { HeroLoop } from "./HeroLoop";

// Total duration: 360 frames at 30fps = 12 seconds.
// Designed to loop seamlessly: frame 0 and frame 359 are visually identical.
export const Root = () => {
  return (
    <>
      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
