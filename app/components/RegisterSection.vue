<script setup lang="ts">
interface FormData {
    name: string;
    surname: string;
    company: string;
    position: string;
    email: string;
    phone: string;
    website: string; // Honeypot (ловушка для ботов)
}

// Типизация ошибок: ключи могут быть только из FormData, значение - строка
type FormErrors = Partial<Record<keyof FormData, string>>;

const toast = reactive({
    show: false,
    message: "",
    type: "success",
});

const form = ref<FormData>({
    name: "",
    surname: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    website: "",
});

const errors = ref<FormErrors>({});
const isSubmitting = ref(false);
const isSubmitted = ref(false);

const formatPhone = (value: string): string => {
    // Оставляем только цифры
    const digits = value.replace(/\D/g, "");

    // Ограничиваем максимум 11 цифрами (1 цифра кода + 10 цифр номера)
    const limited = digits.slice(0, 11);

    if (!limited) return "";

    // Собираем строку по маске +X XXX XXX-XX-XX
    let result = "+" + limited[0];
    if (limited.length > 1) result += " " + limited.slice(1, 4);
    if (limited.length > 4) result += " " + limited.slice(4, 7);
    if (limited.length > 7) result += "-" + limited.slice(7, 9);
    if (limited.length > 9) result += "-" + limited.slice(9, 11);

    return result;
};

const phoneModel = computed({
    get: () => form.value.phone,
    set: (val) => {
        form.value.phone = formatPhone(val);
        // Снимаем ошибку, как только пользователь начал исправлять поле
        if (errors.value.phone) {
            errors.value.phone = "";
        }
    },
});

// Функция валидации (заменяет computed, так как ошибки нужно показывать по факту попытки отправки)
const validateForm = (): boolean => {
    errors.value = {}; // Очищаем старые ошибки
    let isValid = true;

    // 1. Honeypot: если бот заполнил скрытое поле, молча отклоняем форму
    if (form.value.website.trim() !== "") {
        return false;
    }

    // 2. Проверка обязательных полей
    if (!form.value.name.trim()) {
        errors.value.name = "Введите имя";
        isValid = false;
    }
    if (!form.value.surname.trim()) {
        errors.value.surname = "Введите фамилию";
        isValid = false;
    }
    if (!form.value.company.trim()) {
        errors.value.company = "Введите название компании";
        isValid = false;
    }
    if (!form.value.position.trim()) {
        errors.value.position = "Введите должность";
        isValid = false;
    }

    // 3. Проверка Email
    if (!form.value.email.trim()) {
        errors.value.email = "Введите email";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = "Введите корректный email";
        isValid = false;
    }

    // 4. Проверка телефона (можно усилить регулярным выражением при необходимости)
    const phoneRegex = /^\+\d \d{3} \d{3}-\d{2}-\d{2}$/;
    if (!form.value.phone) {
        errors.value.phone = "Введите номер телефона";
        isValid = false;
    } else if (!phoneRegex.test(form.value.phone)) {
        errors.value.phone = "Неполный или неверный формат телефона";
        isValid = false;
    }

    if (!isValid) {
        showToast("Пожалуйста заполните корректно все поля", "error");
    }

    return isValid;
};

const handleSubmit = async () => {
    // Молча отклоняем ботов
    if (form.value.website.trim() !== "") return;

    // Запускаем валидацию. Если невалидно, она заполнит errors.value и вернет false
    if (!validateForm() || isSubmitting.value) return;

    isSubmitting.value = true;

    try {
        await $fetch("/api/formPost", {
            method: "POST",
            body: form.value,
        });

        // Успешная отправка
        isSubmitted.value = true;
        // isModalOpen.value = true;
        showToast(
            "Заявка отправлена! Ожидайте подтверждение на почту.",
            "success",
        );

        // Полный и типобезопасный сброс формы
        form.value = {
            name: "",
            surname: "",
            company: "",
            position: "",
            email: "",
            phone: "",
            website: "",
        };
        errors.value = {}; // Сбрасываем ошибки
    } catch (error) {
        // Обработка ошибок сети или сервера
        console.error("Form submission error:", error);
        showToast("Произошла ошибка при отправке. Попробуйте позже.", "error");
    } finally {
        isSubmitting.value = false;
    }
};

const showToast = (message: string, type = "success") => {
    toast.message = message;
    toast.type = type;
    toast.show = true;
    setTimeout(() => (toast.show = false), 6000);
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
        class="relative py-16 md:py-36 min-h-screen flex items-center bg-linear-to-br from-ink to-[#1a1a3a] text-white overflow-hidden"
        id="register"
    >
        <div
            class="absolute -top-50 -right-25 w-150 h-150 rounded-full bg-primary/50 blur-[80px] pointer-events-none"
        ></div>
        <div
            class="absolute -bottom-50 -left-25 w-125 h-125 rounded-full bg-accent/35 blur-[80px] pointer-events-none"
        ></div>

        <div class="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
            <div
                class="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-20 items-center"
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
                    v-reveal="{ delay: 1 }"
                    @submit.prevent="handleSubmit"
                    class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-4 md:p-10"
                >
                    <input
                        type="text"
                        name="formId"
                        v-model="form.website"
                        autocomplete="off"
                        tabindex="-1"
                        class="absolute -left-96 -top-96 -z-10 opacity-0 pointer-events-none"
                        aria-hidden="true"
                    />
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-3.5">
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
                                placeholder="Иван"
                                maxlength="64"
                                class="p-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
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
                                placeholder="Иванов"
                                maxlength="64"
                                class="p-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.surname,
                                }"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-3.5">
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
                                maxlength="64"
                                class="p-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
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
                                maxlength="64"
                                class="p-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.position,
                                }"
                            />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-3.5">
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
                                placeholder="ivan@company.ru"
                                maxlength="64"
                                class="p-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
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
                                v-model="phoneModel"
                                type="tel"
                                id="phone"
                                placeholder="+7 999 123-45-67"
                                maxlength="16"
                                class="p-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-[15px] transition-all placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(149,223,255,0.12)]"
                                :class="{
                                    'border-red-500! shadow-[0_0_0_4px_rgba(255,107,107,0.12)]!':
                                        errors.phone,
                                }"
                            />
                            <!-- Текст ошибки -->
                            <p
                                v-if="errors.phone"
                                class="text-red-400 text-xs mt-1 ml-1"
                            >
                                {{ errors.phone }}
                            </p>
                        </div>
                    </div>

                    <AppButton
                        :disabled="isSubmitting || isSubmitted"
                        type="submit"
                        size="large"
                        class="w-full! mt-3 transition-all duration-300"
                        :class="[
                            isSubmitting || isSubmitted
                                ? 'bg-primary text-white/40! cursor-not-allowed! hover:shadow-none! hover:translate-y-0!'
                                : 'bg-primary hover:shadow-[0_0px_32px_-3px_rgba(0,45,255,0.8)]',
                        ]"
                    >
                        <span v-if="isSubmitted">Отправлено</span>
                        <span v-else-if="isSubmitting">Отправляется ...</span>
                        <span v-else class="flex items-center gap-2"
                            >Зарегистрироваться <Icon name="lucide:arrow-right"
                        /></span>
                        <svg
                            v-if="isSubmitting"
                            class="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            />
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                        </svg>
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
            class="fixed bottom-10 left-1/2 -translate-x-1/2 translate-y-5 bg-white text-ink px-6 py-4 rounded-2xl flex items-center gap-3 text-base font-medium shadow-2xl z-1000 transition-all duration-300 max-w-[90vw]"
            :class="{
                'opacity-0': !toast.show,
                'opacity-100 translate-y-0': toast.show,
            }"
            v-if="toast.show"
        >
            <Icon
                :name="`lucide:${toast.type === 'success' ? 'check' : 'circle-alert'}`"
                :class="`${toast.type === 'success' ? 'text-green-600' : 'text-red-400'}`"
                class="shrink-0 w-8! h-8! text-lg"
            />
            <span>{{ toast.message }}</span>
        </div>
    </section>
</template>
