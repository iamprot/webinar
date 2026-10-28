<script setup lang="ts">
const cases = [
    {
        icon: "factory-duotone",
        title: "Связать производство и финансы",
        description:
            "В прямом эфире эксперты покажут расчет полной себестоимости: от заполнения бюджетной формы производственным подразделением до получения финансового результата.",
    },
    {
        icon: "hard-drive-download-duotone",
        title: "Собрать данные подразделений",
        description:
            "Покажем, как организовать заполнение бюджета несколькими подразделениями в единой модели данных и собрать их заявки без ручного сведения файлов.",
    },
    {
        icon: "chart-column-big-duotone",
        title: "Сценарное моделирование и «что-если» анализ",
        description:
            "Изменим заявки, макропараметры и драйверы, пересчитаем модель и сравним результаты разных сценариев.",
    },
];
</script>
<template>
    <section
        class="relative py-16 md:py-24 min-h-screen flex items-center"
        id="cases"
    >
        <div class="container mx-auto max-w-7xl px-4 md:px-8">
            <div v-reveal class="text-center max-w-185 mx-auto mb-20">
                <span class="section-tag">Производственный кейс</span>
                <h2
                    class="text-[clamp(36px,4.5vw,58px)] mb-4.5 tracking-tight text-balance"
                >
                    Одна логика для компаний разных отраслей
                </h2>
                <p class="text-lg">
                    Финансовые команды предприятий — от металлургии и добычи до
                    FMCG и пищевого производства — при формировании бюджета
                    следуют одной логике: собирают данные от подразделений,
                    связывают производственные показатели с доходами и
                    расходами, формируют сводный бюджет и пересчитывают его при
                    изменении вводных.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article
                    v-for="(item, idx) in cases"
                    :key="idx"
                    v-reveal="{ delay: idx + 1 }"
                    class="relative bg-white rounded-[28px] p-9 border border-line-soft transition-all duration-[400ms] overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-line-strong group"
                >
                    <div
                        class="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary to-secondary origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    ></div>
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary text-xl"
                    >
                        <Icon
                            :name="`lucide-extended:${item.icon}`"
                            class="shrink-9 w-6! h-6!"
                        />
                    </div>
                    <h3 class="text-xl mb-3 leading-7 text-balance">{{ item.title }}</h3>
                    <p class="text-[16px] mb-6">
                        {{ item.description }}
                    </p>
                </article>
            </div>
        </div>
    </section>
</template>
