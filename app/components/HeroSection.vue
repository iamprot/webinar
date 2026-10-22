<script setup>
const heroCardRef = ref(null);
let rafId = null;

const handleMouseMove = (e) => {
    if (rafId) cancelAnimationFrame(rafId);

    // Calculate synchronously before the async rAF callback
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rafId = requestAnimationFrame(() => {
        if (heroCardRef.value) {
            heroCardRef.value.style.transform = `perspective(1500px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(30px)`;
        }
    });
};

const handleMouseLeave = () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (heroCardRef.value) {
        heroCardRef.value.style.transform =
            "perspective(1500px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    }
};

const event = [
    {
        icon: 'calendar',
        description: '13 ноября 2026',
    },
    {
        icon: 'clock-2',
        description: '12:00–14:00',
    },
    {
        icon: 'wifi',
        description: 'Онлайн',
    },
    {
        icon: 'star',
        description: 'Бесплатно',
    },
]

</script>

<template>
    <section
        class="relative pt-30 md:pt-40 pb-20 overflow-hidden min-h-screen flex items-center border-b border-ink/10"
        id="hero"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
    >
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div
                class="absolute rounded-full blur-[90px] w-155 h-155 bg-primary/5 md:bg-primary/20 -top-55 -right-30 animate-float1"
            ></div>
            <div
                class="absolute rounded-full blur-[90px] w-130 h-130 bg-accent/65 -bottom-40 -left-30 animate-float2"
            ></div>
            <div
                class="absolute rounded-full blur-[90px] w-105 h-105 bg-secondary/40 top-[28%] left-[42%] animate-float3"
            ></div>
        </div>

        <div
            class="container mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-4 md:gap-20 items-center relative z-10"
        >
            <div class="hero-content">
                <div
                    v-reveal
                    class="inline-flex items-center gap-4 md:gap-4 text-[13px] font-medium text-primary mb-7 leading-5"
                >
                    <span
                        class="w-2 h-2 shrink-0 rounded-full bg-primary shadow-[0_0_0_4px_rgba(68,19,217,0.2)] animate-pulse-custom"
                    ></span>
                    Открытый практический урок &mdash; Knowledge Space × Axenix
                </div>
                
                <div v-reveal="{ delay: 1 }" class="flex gap-3 flex-wrap mb-8">
                    <div v-for="(item,idx) in event" class="flex items-center gap-2.5 text-sm text-primary px-4 py-2 bg-primary/5 hover:bg-white/50 border border-primary/20 rounded-full transition-colors duration-300 ease-in-out">
                        <Icon :name="`lucide:${item.icon}`" /><span>{{ item.description }}</span>
                    </div>

                </div>

                <h1
                    v-reveal="{ delay: 2 }"
                    class="text-[clamp(40px,5vw,64px)] mb-7 tracking-tight font-extrabold"
                >
                    Как собрать бюджетную модель
                    <span class="text-gradient block">за 2 часа</span>
                </h1>
                <p
                    v-reveal="{ delay: 3 }"
                    class="text-base font-light md:text-lg leading-relaxed mb-10 max-w-135 text-ink"
                >
                    На примере реализованного проекта в производственной
                    компании покажем, как без программирования собрать бюджетную
                    модель, организовать сбор данных подразделений, рассчитать
                    полную себестоимость и&nbsp;проверить разные сценарии.
                </p>
                <div
                    v-reveal="{ delay: 4 }"
                    class="flex gap-3.5 mb-12 flex-wrap"
                >
                    <AppButton href="#register" size="large"
                        >Зарегистрироваться</AppButton
                    >
                    <AppButton href="#steps" variant="ghost" size="large">
                        Узнать больше <Icon name="lucide:arrow-right" />
                    </AppButton>
                </div>

            </div>

            <div v-reveal="{ delay: 3 }" class="perspective-[1500px]">
                <div
                    ref="heroCardRef"
                    class="relative bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 rounded-4xl p-9 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform transform-3d"
                >
                    <div
                        class="absolute -inset-px rounded-4xl bg-linear-to-br from-primary/10 to-accent/20 -z-10 blur-[2px]"
                    ></div>
                    <div class="mb-7">
                        <span
                            class="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-2.5"
                            >Практика на производственном кейсе</span
                        >
                        <h3 class="text-2xl tracking-tight">
                            Пройдем весь бюджетный процесс
                        </h3>
                    </div>
                    <ul class="list-none mb-7">
                        <li
                            class="flex items-start gap-3 py-3 border-t border-line-soft text-[15px] text-ink"
                        >
                        <Icon name="lucide:check" class="text-primary mt-1.5" />
                            <span
                                >заполнение бюджетных форм производственными
                                подразделениями</span
                            >
                        </li>
                        <li
                            class="flex items-start gap-3 py-3 border-t border-line-soft text-[15px] text-ink"
                        >
                            <Icon name="lucide:check" class="text-primary mt-1.5" />
                            <span
                                >расчет полной себестоимости в единой модели
                                данных</span
                            >
                        </li>
                        <li
                            class="flex items-start gap-3 py-3 border-t border-line-soft text-[15px] text-ink"
                        >
                            <Icon name="lucide:check" class="text-primary mt-1.5" />
                            <span
                                >сбор заявок подразделений в сводный
                                бюджет</span
                            >
                        </li>
                        <li
                            class="flex items-start gap-3 py-3 border-t border-line-soft text-[15px] text-ink"
                        >
                            <Icon name="lucide:check" class="text-primary mt-1.5" />
                            <span
                                >сценарное моделирование и «что-если»
                                анализ</span
                            >
                        </li>
                    </ul>
                    <div
                        class="flex justify-between pt-5.5 border-t border-line-soft"
                    >
                        <div class="flex flex-col items-center gap-1 flex-1">
                            <span class="text-2xl font-extrabold text-gradient"
                                >2ч</span
                            >
                            <span
                                class="text-[11px] text-muted uppercase tracking-wider font-medium"
                                >онлайн</span
                            >
                        </div>
                        <div
                            class="flex flex-col items-center gap-1 flex-1 border-l border-line-soft"
                        >
                            <span class="text-2xl font-extrabold text-gradient"
                                >7</span
                            >
                            <span
                                class="text-[11px] text-muted uppercase tracking-wider font-medium"
                                >сценариев</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
