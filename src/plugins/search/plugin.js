
import { IndexSearch } from "./index-builder";
import { dirname, resolve } from "path"
import { fileURLToPath } from "url";

export function SearchPlugin(options) {
    /** @type {import('vite').ResolvedConfig} */
    let config;
    const virtualModuleId = "virtual:search-data";
    const resolvedVirtualModuleId = "\0" + virtualModuleId;

    return {
        name: "vite-plugin-search",
        enforce: "pre",
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },

        config: () => {
            const dir = dirname(fileURLToPath(import.meta.url));

            return {
                resolve: {
                    alias: {
                        "./VPNavBarSearch.vue": resolve(dir, "./NavBarSearch.vue"),
                    },
                },
            };
        },

        async resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
        },

        async load(id) {
            if (id === resolvedVirtualModuleId) {
                if (config.build.ssr || config.command === 'serve') {
                    return IndexSearch(config.root, options);
                }
            }
        },
    };
}
