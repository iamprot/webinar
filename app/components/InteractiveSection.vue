<script setup>
import { onMounted, onUnmounted, ref } from "vue";

// Use individual refs for each card to avoid inline function ref issues
const card0 = ref(null);
const card1 = ref(null);
const card2 = ref(null);

let ticking = false;

const updateTilt = () => {
    [card0.value, card1.value, card2.value].forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        const delta = (center - windowCenter) / window.innerHeight;
        const tilt = Math.max(-6, Math.min(6, delta * -8));
        card.style.setProperty("--tilt", `${tilt}deg`);
    });
    ticking = false;
};

const handleScroll = () => {
    if (!ticking) {
        requestAnimationFrame(updateTilt);
        ticking = true;
    }
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTilt();
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <section
        class="relative py-16 md:py-24 min-h-screen flex items-center bg-[#1D1D3B] text-white overflow-hidden"
        id="interactive"
    >
        <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
            <div
                class="h-full"
                style="
                    background-color: #1D1D3B;
                    opacity: 1;
                    background-image: radial-gradient(
                        circle,
                        #ffffff 0.96px,
                        transparent 0.96px
                    );
                    background-size: 16px 16px;
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
        </div>

        <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div
                class="absolute rounded-full blur-[90px] w-175 h-175 bg-primary/25 -top-62.5 left-1/2 -translate-x-1/2 animate-float4"
            >
        </div>
            <div
                class="absolute rounded-full blur-[90px] w-125 h-125 bg-accent/15 -bottom-50 -right-25 animate-float1"
            ></div>
        </div>

        <div class="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
            <div v-reveal class="text-center max-w-185 mx-auto mb-20">
                <span class="section-tag bg-accent/15! text-accent!"
                    >Интерактив</span
                >
                <h2
                    class="text-[clamp(28px,4.5vw,54px)] mb-4.5 tracking-tight text-white"
                >
                    Бюджетирование в&nbsp;реальном времени
                </h2>
                <p class="text-lg text-white/70">
                    На примере реализованной производственной модели покажем
                    заполнение форм, свод данных, расчет себестоимости и
                    изменение сценария прямо во время эфира.
                </p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] md:grid-rows-2 gap-6 items-stretch"
            >
                <article
                    v-reveal="{ delay: 1 }"
                    ref="card0"
                    class="group border border-accent/10 rounded-[28px] p-8 md:p-12 backdrop-blur-xl transition-all duration-400 hover:border-accent/40 flex flex-col justify-center md:row-span-2 bg-linear-to-br from-[#21214B] to-[#252552]"
                    style="
                        transform: perspective(500px)
                            rotateX(var(--tilt, 0deg));
                        transform-style: preserve-3d;
                        
                    "
                >
                    <span
                        class="inline-block px-3.5 py-1.5 bg-accent/15 text-accent text-xs font-semibold tracking-widest uppercase rounded-full mb-5 self-start"
                        >Живой ввод данных</span
                    >
                    <h3 class="text-accent group-hover:text-white text-3xl mb-4 tracking-tight transition-all duration-400">
                        Ввод данных и пересчет сценария
                    </h3>
                    <p class="text-white/75 text-lg max-w-115">
                        Покажем, как в модели меняются данные, заявки,
                        макропараметры и драйверы, а затем пересчитаем бюджет и
                        сравним результаты.
                    </p>
                </article>

                <article
                    v-reveal="{ delay: 2 }"
                    ref="card1"
                    class="group bg-[#21214B] border border-accent/10 rounded-[28px] p-8 backdrop-blur-xl transition-all duration-400 hover:bg-[#252552] hover:border-accent/40 flex flex-col justify-start"
                    style="
                        transform: perspective(1000px)
                            rotateX(var(--tilt, 0deg));
                        transform-style: preserve-3d;
                    "
                >
                    <span
                        class="inline-block px-3 py-1.5 bg-accent/15 text-accent text-[11px] font-semibold tracking-widest uppercase rounded-full mb-4 self-start"
                        >Многопользовательский режим</span
                    >
                    <h3 class="text-accent text-xl mb-3 group-hover:text-white transition-all duration-400">
                        Несколько пользователей
                    </h3>
                    <p class="text-white/60 text-[15px]">
                        Покажем, как организовать одновременную работу
                        подразделений в одной бюджетной модели.
                    </p>
                </article>

                <article
                    v-reveal="{ delay: 3 }"
                    ref="card2"
                    class="group bg-[#21214B] border border-accent/10 rounded-[28px] p-8 backdrop-blur-xl transition-all duration-400 hover:bg-[#252552] hover:border-accent/40 flex flex-col justify-start"
                    style="
                        transform: perspective(1000px)
                            rotateX(var(--tilt, 0deg));
                        transform-style: preserve-3d;
                    "
                >
                    <span
                        class="inline-block px-3 py-1.5 bg-accent/15 text-accent text-[11px] font-semibold tracking-widest uppercase rounded-full mb-4 self-start"
                        >Реактивность</span
                    >
                    <h3 class="text-accent text-xl mb-3 group-hover:text-white transition-all duration-400">
                        Изменения видны сразу
                    </h3>
                    <p class="text-white/60 text-[15px]">
                        Посмотрим, как новые данные и корректировки отражаются в
                        своде, расходах и прибыли.
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>
