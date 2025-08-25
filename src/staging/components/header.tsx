import { useState, useEffect } from "react";
import { Box, Collapse, Burger } from "@mantine/core";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import css from "./header.css.ts";

type MenuItem = {
  href: string;
  display: string;
};

type HeaderProps = {
  logoHref: string;
  inViewport: boolean;
  navigationItems: MenuItem[];
};

export default function Header({
  logoHref,
  inViewport,
  navigationItems,
}: HeaderProps) {
  const [menuOpened, { toggle, close }] = useDisclosure();
  // DESIGN: Mantine's API forces null usage
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  const [burger, setBurger] = useState<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-restricted-types
  const [navLinks, setNavLinks] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (menuOpened) {
      document.body.classList.add("frozen");
    } else {
      document.body.classList.remove("frozen");
    }
  }, [menuOpened]);

  const navLinksRef = useClickOutside(
    () => {
      close();
    },
    null,
    [burger, navLinks],
  );

  return (
    <header className={css.header}>
      <nav>
        <container-l name="header">
          <box-l padding="var(--layout-header-padding)">
            <cluster-l justify="space-between" align="center">
              <Collapse in={!inViewport}>
                <a href={logoHref}>
                  <img
                    src="/images/logos/workmark.1.svg"
                    alt="The Escapement"
                  />
                </a>
              </Collapse>
              <div role="presentation" aria-hidden="true" />
              <Box
                style={{
                  paddingRight: "var(--size-2)",
                  role: "presentation",
                }}
              >
                <Burger
                  ref={setBurger}
                  opened={menuOpened}
                  onClick={toggle}
                  aria-label="Toggle menu"
                />
              </Box>
              <div
                ref={setNavLinks}
                className={`${css.navLinks} ${menuOpened ? "menu-opened" : ""}`}
                role="presentation"
                aria-hidden="true"
              >
                <cluster-l ref={navLinksRef}>
                  {navigationItems.map((item) => (
                    <a key={item.href} href={item.href} onClick={close}>
                      {item.display}
                    </a>
                  ))}
                </cluster-l>
              </div>
            </cluster-l>
          </box-l>
        </container-l>
      </nav>
    </header>
  );
}
