<script setup>

const toast = reactive({
    show: false,
    message: "",
    type: "success",
});

const form = reactive({
    name: "",
    surname: "",
    company: "",
    position: "",
    email: "",
    phone: "",
});

const errors = ref({});

const showToast = (message, type = "success") => {
    toast.message = message;
    toast.type = type;
    toast.show = true;
    setTimeout(() => (toast.show = false), 4200);
};

const handleSubmit = () => {
    errors.value = {};
    let valid = true;

    for (const field in form) {
        if (!form[field].trim()) {
            errors.value[field] = true;
            valid = false;
        }
    }

    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.value.email = true;
        valid = false;
    }

    if (form.phone.replace(/\D/g, "").length < 6) {
        errors.value.phone = true;
        valid = false;
    }

    if (!valid) {
        showToast("Пожалуйста заполните корректно все поля", "error");
        return;
    }

    try {
        $fetch("/api/formPost", {
            method: "POST",
            body: form,
        })
        
    } finally {
    showToast(
        "Заявка отправлена! Ожидайте подтверждение на почту.",
        "success",
    );

    // Reset form
    Object.keys(form).forEach((key) => (form[key] = ""));
    }
};

const event = [
    {
        icon: "check",
        description: "13 ноября 2026",
    },
    {
        icon: "check",
        description: "12:00 - 14:00",
    },
    {
        icon: "check",
        description: "Онлайн",
    },
    {
        icon: "check",
        description: "Участие бесплатно",
    },
    {
        icon: "check",
        description: "Запись вебинара — всем зарегистрированным участникам",
    },
];
</script>

<template>
    <section
        class="relative py-36 min-h-screen flex items-center bg-linear-to-br from-ink to-[#1a1a3a] text-white overflow-hidden"
        id="register"
    >
        <div
            class="absolute -top-50 -right-25 w-150 h-150 rounded-full bg-primary/50 blur-[80px] pointer-events-none"
        ></div>
        <div
            class="absolute -bottom-50 -left-25 w-125 h-125 rounded-full bg-accent/35 blur-[80px] pointer-events-none"
        ></div>

        <div class="container mx-auto max-w-7xl px-8 relative z-10">
            <div
                class="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-20 items-center"
            >
                <div v-reveal>
                    <span class="section-tag bg-accent/15! text-accent!"
                        >Регистрация</span
                    >
                    <h2
                        class="text-white text-[clamp(34px,4vw,48px)] mb-4.5 tracking-tight"
                    >
                        Как собрать бюджетную модель за 2 часа
                    </h2>
                    <p class="text-white/70 text-lg mb-8">
                        Совместный открытый урок Knowledge Space и Axenix
                        на&nbsp;примере реализованного проекта
                        в&nbsp;производственной компании.
                    </p>

                    <ul class="list-none flex flex-col gap-3.5">
                        <li
                            v-for="(item, idx) in event"
                            :key="idx"
                            class="flex items-center gap-3.5 text-white/90 text-[15px]"
                        >
                            <span
                                class="w-6.5 h-6.5 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-[11px] text-white shrink-0 shadow-lg"
                            >
                                <Icon
                                    :name="`lucide:${item.icon}`"
                                    class="w-4! h-4! shrink-0"
                                />
                            </span>
                            {{ item.description }}
                        </li>
                    </ul>
                </div>

                <form
                    v-reveal="{ delay: 2 }"
                    @submit.prevent="handleSubmit"
                    class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-10"
                >
                    <div class="grid grid-cols-2 gap-3.5 mb-3.5">
                        <div class="flex flex-col gap-2">
                            <label
                                for="name"
                                class="text-xs text-white/65 font-semibold tracking-wide uppercase"
                                >Имя</label
                            >
                            <input
                                v-model="form.name"
                                type="text"
                                id="name"
                                placeholder="Anna"
                                class="p-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.name,
                                }"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                for="surname"
                                class="text-xs text-white/65 font-semibold tracking-wide uppercase"
                                >Фамилия</label
                            >
                            <input
                                v-model="form.surname"
                                type="text"
                                id="surname"
                                placeholder="Sergeeva"
                                class="p-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.surname,
                                }"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3.5 mb-3.5">
                        <div class="flex flex-col gap-2">
                            <label
                                for="company"
                                class="text-xs text-white/65 font-semibold tracking-wide uppercase"
                                >Компания</label
                            >
                            <input
                                v-model="form.company"
                                type="text"
                                id="company"
                                placeholder="Название компании"
                                class="p-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.company,
                                }"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                for="position"
                                class="text-xs text-white/65 font-semibold tracking-wide uppercase"
                                >Должность</label
                            >
                            <input
                                v-model="form.position"
                                type="text"
                                id="position"
                                placeholder="Название должности"
                                class="p-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.position,
                                }"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3.5 mb-3.5">
                        <div class="flex flex-col gap-2">
                            <label
                                for="email"
                                class="text-xs text-white/65 font-semibold tracking-wide uppercase"
                                >Email</label
                            >
                            <input
                                v-model="form.email"
                                type="email"
                                id="email"
                                placeholder="anna@company.ru"
                                class="p-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.email,
                                }"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label
                                for="phone"
                                class="text-xs text-white/65 font-semibold tracking-wide uppercase"
                                >Телефон</label
                            >
                            <input
                                v-model="form.phone"
                                type="tel"
                                id="phone"
                                placeholder="+7 999 123 45 67"
                                class="p-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.phone,
                                }"
                            />
                        </div>
                    </div>

                    <AppButton
                        type="submit"
                        size="large"
                        class="w-full mt-3 bg-linear-to-br! from-primary! to-secondary! hover:shadow-[0_0px_32px_-3px_rgba(0,45,255,0.8)]!"
                    >
                        Зарегистрироваться <Icon name="lucide:arrow-right" />
                    </AppButton>

                    <p
                        class="text-xs text-white/50 text-center mt-4 leading-relaxed"
                    >
                        Нажимая кнопку «Зарегистрироваться», вы соглашаетесь на
                        обработку персональных данных и получение информационных
                        сообщений.
                    </p>
                </form>
            </div>
        </div>

        <!-- Toast Notification -->
        <div
            class="fixed bottom-8 left-1/2 -translate-x-1/2 translate-y-5 bg-ink text-white px-6 py-4 rounded-2xl flex items-center gap-3 text-sm font-medium shadow-2xl z-1000 transition-all duration-300 max-w-[90vw]"
            :class="{
                'opacity-0': !toast.show,
                'opacity-100 translate-y-0': toast.show,
            }"
            v-if="toast.show"
        >
            <i
                :class="`fa-solid ${toast.type === 'success' ? 'fa-circle-check text-accent' : 'fa-circle-exclamation text-red-400'}`"
                class="text-lg"
            ></i>
            <span>{{ toast.message }}</span>
        </div>
    </section>
</template>
