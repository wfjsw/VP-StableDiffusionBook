import { buildIndex, buildPreview } from './index-builder'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

export function SearchPlugin(options) {
    /** @type {import('vite').ResolvedConfig} */
    let config
    const virtualIndexModuleId = 'virtual:search-index'
    const resolvedVirtualIndexModuleId = '\0' + virtualIndexModuleId
    const virtualPreviewModuleId = 'virtual:search-preview'
    const resolvedVirtualPreviewModuleId = '\0' + virtualPreviewModuleId
    return {
        name: 'vite-plugin-search',
        enforce: 'pre',
        configResolved(resolvedConfig) {
            config = resolvedConfig
        },

        config: () => {
            const dir = dirname(fileURLToPath(import.meta.url))

            return {
                resolve: {
                    alias: {
                        './VPNavBarSearch.vue': resolve(
                            dir,
                            './NavBarSearch.vue'
                        ),
                    },
                },
            }
        },

        async resolveId(id) {
            switch (id) {
                case virtualIndexModuleId:
                    return resolvedVirtualIndexModuleId
                case virtualPreviewModuleId:
                    return resolvedVirtualPreviewModuleId
            }
        },

        async load(id) {
            if (config.build.ssr || config.command === 'serve') {
                switch (id) {
                    case resolvedVirtualIndexModuleId:
                        return buildIndex(config.root, options)
                    case resolvedVirtualPreviewModuleId:
                        return buildPreview(config.root)
                }
            }
        },
    }
}
