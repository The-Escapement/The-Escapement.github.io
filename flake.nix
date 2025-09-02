{
  description = "A foundation to build Nix-based projects from.";

  inputs = {
    devshell.url = "github:numtide/devshell";
    flake-parts.url = "github:hercules-ci/flake-parts";

    # REVISIT: Coupling to nix-project to save /nix/store space
    nix-project.url = "github:shajra/nix-project";
    #nixpkgs-master.url = "github:NixOS/nixpkgs/master";
    #nixpkgs-stable-darwin.url = "github:NixOS/nixpkgs/nixpkgs-25.05-darwin";
    #nixpkgs-stable-linux.url = "github:NixOS/nixpkgs/nixos-25.05";
    #nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    #nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [

        # REVISIT: Coupling to nix-project to save /nix/store space
        inputs.nix-project.flakeModules.nixpkgs
        #nix/module/nixpkgs.nix

        inputs.devshell.flakeModule
        inputs.treefmt-nix.flakeModule
      ];
      systems = [
        "x86_64-linux"
        "aarch64-darwin"
      ];
      perSystem =
        { nixpkgs, config, ... }:
        let
          site =
            type:
            nixpkgs.unstable.stdenv.mkDerivation (finalAttrs: {
              pname = "the-escapement";
              version = "1.0.0";
              src =
                let
                  fs = nixpkgs.unstable.lib.fileset;
                  fileset = fs.intersection (fs.gitTracked ./.) (
                    fs.unions [
                      # directories
                      ./public
                      ./src
                      ./types
                      # files
                      ./.htmlhintrc
                      ./eslint.config.ts
                      ./package.json
                      ./pnpm-lock.yaml
                      ./postcss.config.ts
                      ./tsconfig.json
                      ./vite.config.ts
                    ]
                  );
                in
                fs.toSource {
                  root = ./.;
                  inherit fileset;
                };
              nativeBuildInputs = [
                nixpkgs.unstable.nodejs_24
                nixpkgs.unstable.pnpm_10.configHook
              ];
              pnpmDeps = nixpkgs.unstable.pnpm_10.fetchDeps {
                inherit (finalAttrs) pname version src;
                fetcherVersion = 2;
                hash = "sha256-wMHoeKDHhs7an0sDJA7FY5RkTnB4pHhD1nCDNZFYFyk=";
              };
              buildPhase = ''pnpm run build:${type} '';
              checkPhase = ''pnpm run lint '';
              installPhase = ''cp -r dist $out '';
              dontPatchShebangs = true;
              dontStrip = true;
            });
        in
        {
          _module.args.pkgs = nixpkgs.unstable;
          legacyPackages.nixpkgs = nixpkgs;
          packages.site-prod = site "prod";
          packages.site-staging = site "staging";
          packages.site-dev = site "dev";
          packages.default = site "prod";
          checks.site-prod = site "prod";
          checks.site-staging = site "staging";
          checks.site-dev = site "dev";
          devshells.default.packages = [
            config.treefmt.build.wrapper
            nixpkgs.unstable.instaloader
            nixpkgs.unstable.nodejs_24
            nixpkgs.unstable.pnpm_10
            nixpkgs.unstable.prettier
            nixpkgs.unstable.typescript-language-server
            nixpkgs.unstable.wrangler
          ];
          treefmt.pkgs = nixpkgs.unstable;
          treefmt.programs = {
            deadnix.enable = true;
            nixfmt.enable = true;
            nixf-diagnose.enable = true;
            prettier.enable = true;
            shfmt.enable = true;
            shfmt.includes = [ "scripts/*" ];
          };
          treefmt.settings.global.excludes = [
            "pnpm-lock.yaml"
          ];
        };
    };
}
