import "@mantine/core/styles.css";
import { MantineProvider, Box, Button } from "@mantine/core";
import { useInViewport } from "@mantine/hooks";
import theme from "../style/mantine.ts";
import Subscribe from "./subscribe.tsx";
import Section from "./section.tsx";
import Team from "./team.tsx";
import Header from "./header.tsx";

export default function App() {
  const { ref, inViewport } = useInViewport();

  const navigationItems = [
    { href: "#section-about", display: "About" },
    { href: "#section-team", display: "Team" },
    { href: "#section-partners", display: "Partners" },
    { href: "#section-contact", display: "Contact" },
  ];

  return (
    <MantineProvider theme={theme}>
      <Header
        logoHref="#section-splash"
        inViewport={inViewport}
        navigationItems={navigationItems}
      />

      <main>
        <Section.Root startTheme="theme-dark" alternateTheme="theme-light">
          <Box ref={ref}>
            <Section.Splash id="section-splash" aria-labelledby="title-hero">
              <h1 id="title-splash" className="sr-only">
                Welcome To The Escapement
              </h1>
              <img
                id="splash-logo"
                src="/images/logos/stacked.gold.svg"
                alt="The Escapement"
              />
              <p id="splash-coming">Coming Soon – 2026</p>
              <center-l>
                <Button
                  id="splash-contact"
                  component="a"
                  href="#section-contact"
                  radius="lg"
                  size="lg"
                >
                  Contact us for more info →
                </Button>
              </center-l>
            </Section.Splash>
          </Box>

          <Section.Content id="section-hero" aria-labelledby="title-hero">
            <h2 id="title-hero">For collectors, by collectors</h2>
            <p>
              The Escapement is not just a watch show&mdash;it's a stage, a
              story, and a celebration. Discover a world where horology meets
              music, design, and immersive storytelling.
            </p>
          </Section.Content>

          <Section.Content id="section-about" aria-labelledby="title-about">
            <h2 id="title-about">About</h2>
            <p>
              The Escapement was born from a shared vision among lifelong
              horology enthusiasts and seasoned event producers to create a
              first-of-a-kind, immersive and interactive event dedicated
              entirely to watch collectors.
            </p>
            <p>
              Our founding team brings over 100 years of combined expertise in
              both horology and live events. Our events team has delivered
              world-class consumer experiences from Tokyo to Miami to Riyadh.
            </p>
          </Section.Content>

          <Section.Content id="section-team" aria-labelledby="title-team">
            <h2 id="title-team">Core Team</h2>
            <p>Follow our team on Instagram.</p>
            <Team teamType="core" perRow={3} />
          </Section.Content>

          <Section.Content
            id="section-partners"
            aria-labelledby="title-partners"
          >
            <h2 id="title-partners">Partners</h2>
            <p>Check out our collaborators around the world.</p>
            <Team teamType="partners" perRow={4} />
          </Section.Content>

          <Section.Content id="section-contact" aria-labelledby="title-contact">
            <h2 id="title-contact">Contact</h2>
            <sidebar-l side="right" sideWidth="40%" space="var(--size-8)">
              <Subscribe />
              <stack-l>
                <p>Or email us directly:</p>
                <p>
                  <a
                    href="mailto:hello@theescapement.com"
                    className="email-link"
                  >
                    hello @ the escapement .com
                  </a>
                </p>
              </stack-l>
            </sidebar-l>
          </Section.Content>
        </Section.Root>
      </main>

      <footer>
        <box-l padding="var(--layout-footer-padding)">
          <p>&copy; 2025 The Escapement. All rights reserved.</p>
        </box-l>
      </footer>
    </MantineProvider>
  );
}
