import { HeroNav } from "./HeroNav";
import { HeroCopy } from "./HeroCopy";
import { HeroPortrait } from "./HeroPortrait";
import { SparkleField } from "./SparkleField";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-screen w-full overflow-hidden bg-primary-500"
    >
      <SparkleField />
      <HeroNav />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-screen-2xl flex-col px-6 pt-32 pb-20 md:px-10 lg:flex-row lg:items-center lg:gap-12 lg:px-16 lg:pt-36">
        <div className="lg:w-3/5">
          <HeroCopy />
        </div>
        <div className="mt-12 lg:mt-0 lg:w-2/5">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
