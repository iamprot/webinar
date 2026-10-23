// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    modules: ["@nuxt/icon/module", "@nuxtjs/google-fonts"],
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },
    app: {
        head: {
            title: "Как собрать бюджетную модель за 2 часа | Вебинар",
            link: [
                { rel: "icon", type: "image/png", href: "/favicon.png" },
            ],
        },
    },
    runtimeConfig: {
        yandexUserToken:
            "y0__wgBEO_RnqCq94ACGL2LRiD18eu0GDgC4OKsnbEi_vMmq0tZhFjbL7pw",
        yandexFormId: "6ada3e27c45c07002926f0ba",
        yandexOrgId: "3502018",
    },
    googleFonts: {
        families: {
            Mulish: "200..1000",
            Geologica: "100..900",
        },
    },
});
