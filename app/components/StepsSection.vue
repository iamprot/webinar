<script setup lang="ts">
const steps = [
    {
        title: "Разберем бизнес-логику",
        description:
            "Разберем логику реализованного проекта и определим, какие данные формируют производственный бюджет, себестоимость и финансовый результат.",
    },
    {
        title: "Соберем производственный бюджет",
        description:
            "Покажем удобство единой модели данных для заполнения бюджета. Совместно подготовим сценарий затрат производства с ориентиром на заказы.",
    },
    {
        title: "Подключим несколько ЦФО",
        description:
            "Настроим формы для подразделений и покажем, как их данные собираются в общем контуре бюджетирования.",
    },
    {
        title: "Проведем «что–если» анализ",
        description:
            "Изменим ключевые вводные, пересчитаем сценарий и сравним, как корректировки влияют на итоговые показатели.",
    },
];
</script>

<template>
    <section class="relative py-16 md:py-24 min-h-screen flex items-center" id="steps">
        <div class="absolute inset-0 w-full"
            style="
                background-color: #f5f5f7;
                opacity: 0.15;
                background-image:
                    linear-gradient(
                        #121212 1.4000000000000001px,
                        transparent 1.4000000000000001px
                    ),
                    linear-gradient(
                        to right,
                        #121212 1.4000000000000001px,
                        #e5e5f7 1.4000000000000001px
                    );
                background-size: 42px 42px;
                mask-image: radial-gradient(
                    ellipse at center,
                    rgba(0, 0, 0, 0.7) 0%,
                    rgba(0, 0, 0, 0) 75%
                );
                -webkit-mask-image: radial-gradient(
                    ellipse at center,
                    rgba(0, 0, 0, 0.7) 0%,
                    rgba(0, 0, 0, 0) 75%
                );
                mask-size: 100% 100%;
                -webkit-mask-size: 100% 100%;
                mask-repeat: no-repeat;
                -webkit-mask-repeat: no-repeat;
            "
        ></div>
        <div class="container mx-auto max-w-7xl px-4 md:px-8">
            <div v-reveal class="text-center max-w-185 mx-auto mb-20">
                <span class="section-tag">Что увидите</span>
                <h2 class="text-[clamp(36px,4.5vw,58px)] mb-4.5 tracking-tight text-balance">
                    От бизнес–кейса до сводного бюджета
                </h2>
                <p class="text-lg">
                    На реальном производственном кейсе пройдем ключевые этапы бюджетной кампании и покажем, как они работают в единой модели.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article
                    v-for="(item, idx) in steps" :key="idx"
                    v-reveal="{ delay: idx + 1 }"
                    class="bg-white border-2 border-line-soft rounded-[28px] p-10 cursor-pointer transition-all duration-400 relative hover:border-primary hover:bg-linear-to-br hover:from-white hover:to-primary/3 hover:-translate-y-1 hover:shadow-2xl group"
                >
                    <div
                        class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-ink text-white font-bold text-lg mb-5 transition-all group-hover:bg-primary group-hover:scale-105"
                    >
                        0{{ idx + 1 }}
                    </div>
                    <h3 class="text-xl mb-3 group-hover:text-primary">{{ item.title }}</h3>
                    <p class="text-[15px]">
                        {{ item.description }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>
