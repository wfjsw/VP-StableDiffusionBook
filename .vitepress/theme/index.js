import DefaultTheme from "vitepress/theme";
import { onMounted, watch, nextTick } from "vue";
import { useRoute } from "vitepress";
import mediumZoom from "medium-zoom";

import "./index.scss";

export default {
    ...DefaultTheme,

    setup() {
        const route = useRoute();
        const initZoom = () => {
            new mediumZoom(".main img", { background: "var(--vp-c-bg)" });
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    },
    enhanceApp({ router }) {
        if (!import.meta.env.SSR) {
            if (typeof window !== 'undefined' && window.ga) {
                watch(
                    () => router.route.data.relativePath,
                    (path) => {
                        ga('send', 'pageview', path)
                    },
                    { immediate: true }
                )
            }
        }
	},
};
