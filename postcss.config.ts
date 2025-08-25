import postcssJitProps from "postcss-jit-props";
import OpenProps from "open-props";

const config: { plugins: any[] } = {
  plugins: [postcssJitProps(OpenProps)],
};

export default config;
