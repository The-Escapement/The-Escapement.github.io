import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { Carousel } from "@mantine/carousel";
import { useRef } from "preact/hooks";
import autoScrollPlugin from "embla-carousel-auto-scroll";
import styles from "./sponsors.css";

type Sponsor = {
  name: string;
  image: string;
  tier: "tantalum" | "platinum" | "gold";
};

const sponsors: Sponsor[] = [
  // Tantalum tier (largest, slowest)
  {
    name: "Armin Strom",
    image: "/images/logos/sponsors/tantalum/armin_strom.svg",
    tier: "tantalum",
  },
  {
    name: "Biver",
    image: "/images/logos/sponsors/tantalum/biver.svg",
    tier: "tantalum",
  },

  // Platinum tier (medium size)
  {
    name: "Czapek",
    image: "/images/logos/sponsors/platinum/czapek.svg",
    tier: "platinum",
  },
  {
    name: "Emmanuel Esposito",
    image: "/images/logos/sponsors/platinum/emmanuel_esposito.svg",
    tier: "platinum",
  },
  {
    name: "Greubel Forsey",
    image: "/images/logos/sponsors/platinum/greubel_forsey.svg",
    tier: "platinum",
  },
  {
    name: "HYT",
    image: "/images/logos/sponsors/platinum/hyt.svg",
    tier: "platinum",
  },

  // Gold tier (smallest, fastest)
  {
    name: "Lang & Heyne",
    image: "/images/logos/sponsors/gold/lang_and_heyne.svg",
    tier: "gold",
  },
  {
    name: "Rexhep Rexhepi",
    image: "/images/logos/sponsors/gold/rexhep_rexhepi.svg",
    tier: "gold",
  },
  {
    name: "Romain Gauthier",
    image: "/images/logos/sponsors/gold/romain_gauthier.svg",
    tier: "gold",
  },
  {
    name: "Ulysse Nardin",
    image: "/images/logos/sponsors/gold/ulysse_nardin.svg",
    tier: "gold",
  },
  {
    name: "Zeitwinkel",
    image: "/images/logos/sponsors/gold/zeitwinkel.svg",
    tier: "gold",
  },
];

export default function Sponsors() {
  // Configure auto-scroll with different speeds for each tier
  const tantalumAutoScroll = useRef(
    autoScrollPlugin({
      speed: 1, // Slowest speed for tantalum
      startDelay: 1000,
      direction: "forward",
      playOnInit: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );
  const platinumAutoScroll = useRef(
    autoScrollPlugin({
      speed: 2, // Medium speed for platinum
      startDelay: 1000,
      direction: "forward",
      playOnInit: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );
  const goldAutoScroll = useRef(
    autoScrollPlugin({
      speed: 3, // Fastest speed for gold
      startDelay: 1000,
      direction: "forward",
      playOnInit: true,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  const tantalumSponsors = sponsors.filter((s) => s.tier === "tantalum");
  const platinumSponsors = sponsors.filter((s) => s.tier === "platinum");
  const goldSponsors = sponsors.filter((s) => s.tier === "gold");

  // Duplicate sponsors multiple times to create seamless infinite loop
  const duplicatedTantalum = [...tantalumSponsors, ...tantalumSponsors];
  const duplicatedPlatinum = [...platinumSponsors, ...platinumSponsors];
  const duplicatedGold = [...goldSponsors, ...goldSponsors];

  return (
    <>
      <h3>Tantalum</h3>
      <Carousel
        className={styles.carousel}
        slideSize="100%"
        plugins={[tantalumAutoScroll.current]}
        onMouseLeave={() => {
          tantalumAutoScroll.current.play(0);
        }}
        withControls={false}
        withIndicators={false}
        emblaOptions={{
          loop: true,
          align: "start",
          slidesToScroll: 1,
        }}
      >
        {duplicatedTantalum.map((sponsor, index) => (
          <Carousel.Slide
            className={styles.tantalum}
            key={`${sponsor.name}-${index}`}
          >
            <cover-l centered="img" minHeight="100%">
              <img src={sponsor.image} alt={sponsor.name} />
            </cover-l>
          </Carousel.Slide>
        ))}
      </Carousel>
      <h3>Platinum</h3>
      <Carousel
        className={styles.carousel}
        slideSize="50%"
        slideGap={{ base: "sm", sm: "md", md: "lg" }}
        plugins={[platinumAutoScroll.current]}
        onMouseLeave={() => {
          platinumAutoScroll.current.play(0);
        }}
        withControls={false}
        withIndicators={false}
        emblaOptions={{
          loop: true,
          align: "start",
          slidesToScroll: 1,
        }}
      >
        {duplicatedPlatinum.map((sponsor, index) => (
          <Carousel.Slide
            className={styles.platinum}
            key={`${sponsor.name}-${index}`}
          >
            <cover-l centered="img" minHeight="100%">
              <img src={sponsor.image} alt={sponsor.name} />
            </cover-l>
          </Carousel.Slide>
        ))}
      </Carousel>
      <h3>Gold</h3>
      <Carousel
        className={styles.carousel}
        height="100%"
        slideSize="33%"
        slideGap={{ base: "xs", sm: "sm", md: "md" }}
        plugins={[goldAutoScroll.current]}
        onMouseLeave={() => {
          goldAutoScroll.current.play(0);
        }}
        withControls={false}
        withIndicators={false}
        emblaOptions={{
          loop: true,
          align: "start",
          slidesToScroll: 1,
        }}
      >
        {duplicatedGold.map((sponsor, index) => (
          <Carousel.Slide
            className={styles.gold}
            key={`${sponsor.name}-${index}`}
          >
            <cover-l centered="img" minHeight="100%">
              <img src={sponsor.image} alt={sponsor.name} />
            </cover-l>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}
