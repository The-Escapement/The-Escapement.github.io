# Various implementation notes

## Vite WebP-conversion plugin

There's a variety of plugins to compress and convert images. It's hard to find
one with all the following:

- converts, not just compresses
- doesn't convert if actually worse than the original
- tunable quality parameters
- easy installation/configuration
- reasonably well/recently-maintained

I ended up settling on vite-plugin-image-to-webp, but tried out the following:

- vite-plugin-sharp [compresses, doesn't convert]
- vite-plugin-media-optimize [closed-code, no quality tuning]
- vite-plugin-minipc [compresses, doesn't convert]
- vite-plugin-imagemin [doesn't work with dist outside src]
- vite-plugin-image-optimizer [compresses, doesn't convert]
