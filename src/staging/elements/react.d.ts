import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    // DESIGN: Preact/React forces usage of the interface
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface IntrinsicElements {
      "box-l": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        padding?: string;
        borderWidth?: string;
        invert?: boolean;
      };
      "center-l": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        max?: string;
        andText?: boolean;
        gutters?: string;
        intrinsic?: boolean;
      };
      "stack-l": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        space?: string;
        recursive?: boolean;
        splitAfter?: number;
      };
      "cluster-l": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        justify?: string;
        align?: string;
        space?: string;
      };
      "container-l": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        name?: string;
      };
      "cover-l": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        centered?: string;
        space?: string;
        minHeight?: string;
        noPad?: boolean;
      };
      "frame-l": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        ratio?: string;
      };
      "grid-l": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        min?: string;
        space?: string;
      };
      "icon-l": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        space?: string;
        label?: string;
      };
      "imposter-l": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        breakout?: boolean;
        margin?: string;
        fixed?: boolean;
      };
      "reel-l": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        itemWidth?: string;
        height?: string;
        space?: string;
        noBar?: boolean;
      };
      "sidebar-l": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        side?: string;
        sideWidth?: string;
        contentMin?: string;
        space?: string;
        noStretch?: boolean;
      };
      "switcher-l": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        threshold?: string;
        space?: string;
        limit?: string;
      };
    }
  }
}

export {};
