declare module "vite/client" {
  type ImportMetaEnv = {
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly BASE_URL: string;
  };

  type ImportMeta = {
    readonly env: ImportMetaEnv;
  };
}
