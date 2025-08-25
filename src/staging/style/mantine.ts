// DESIGN: Can't control Mantime's naming
/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme, Button } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";

const theme = createTheme({
  fontFamily: "var(--font-sans)",
  colors: {
    gold: generateColors("#92784d"),
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "gold.4",
      },
    }),
  },
});

export default theme;
