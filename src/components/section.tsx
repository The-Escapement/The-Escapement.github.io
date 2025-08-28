import { createContext, useContext, type ReactNode } from "react";

type SectionContextType = {
  startTheme: string;
  alternateTheme: string;
  currentIndex: number;
};

const SectionContext = createContext<SectionContextType | undefined>(undefined);

type SectionRootProps = {
  startTheme: string;
  alternateTheme: string;
  children: ReactNode;
};

type SectionSplashProps = {
  id?: string;
  "aria-label"?: string;
  space?: string;
  className?: string;
  children: ReactNode;
};

type SectionContentProps = {
  id?: string;
  "aria-labelledby"?: string;
  padding?: string;
  children: ReactNode;
};

function SectionRoot({
  startTheme,
  alternateTheme,
  children,
}: SectionRootProps) {
  return (
    <SectionContext.Provider
      value={{ startTheme, alternateTheme, currentIndex: 0 }}
    >
      {children}
    </SectionContext.Provider>
  );
}

function useSectionTheme() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("Section components must be used within Section.Root");
  }

  // Increment the index for each section
  const theme =
    context.currentIndex % 2 === 0
      ? context.startTheme
      : context.alternateTheme;
  context.currentIndex++;

  return theme;
}

function SectionSplash({
  id,
  "aria-label": ariaLabel,
  space = "var(--layout-splash-space)",
  className,
  children,
}: SectionSplashProps) {
  const theme = useSectionTheme();

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`section-splash ${theme} ${className ?? ""}`}
    >
      <center-l and-text={true} intrinsic={true}>
        <stack-l space={space}>{children}</stack-l>
      </center-l>
    </section>
  );
}

function SectionContent({
  id,
  "aria-labelledby": ariaLabelledBy,
  padding = "var(--layout-section-padding)",
  children,
}: SectionContentProps) {
  const theme = useSectionTheme();

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`section-content ${theme}`}
    >
      <center-l max="calc(var(--measure) + 2 * var(--layout-section-padding))">
        <box-l borderWidth="0" padding={padding}>
          <stack-l>{children}</stack-l>
        </box-l>
      </center-l>
    </section>
  );
}

const Section = {
  Root: SectionRoot,
  Splash: SectionSplash,
  Content: SectionContent,
};

export default Section;
