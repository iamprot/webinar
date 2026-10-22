<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: "primary", // 'primary' | 'ghost'
    },
    size: {
        type: String,
        default: "default", // 'default' | 'large' | 'sm'
    },
    href: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: "button",
    },
});

const baseClasses =
    "inline-flex w-full md:w-fit items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-body font-semibold text-[15px] tracking-tight transition-all duration-300 relative overflow-hidden whitespace-nowrap hover:cursor-pointer";

const variantClasses = computed(() => {
    if (props.variant === "ghost") {
        return "bg-white/60 text-ink border border-line-strong backdrop-blur-[10px] hover:bg-white hover:border-ink hover:-translate-y-0.5";
    }
    // Primary variant with pure Tailwind pseudo-elements
    return "bg-ink text-white hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(68,19,217,0.5)] before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:z-0 before:bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] hover:before:opacity-100";
});

const sizeClasses = computed(() => {
    if (props.size === "large") return "px-8 py-[18px] text-base";
    if (props.size === "sm") return "px-5 py-2.5 text-sm";
    return "";
});
</script>

<template>
    <a
        v-if="href"
        :href="href"
        :class="[baseClasses, variantClasses, sizeClasses]"
    >
        <span class="relative z-10 flex items-center gap-2.5">
            <slot />
        </span>
    </a>
    <button
        v-else
        :type="type"
        :class="[baseClasses, variantClasses, sizeClasses]"
    >
        <span class="relative z-10 flex items-center gap-2.5">
            <slot />
        </span>
    </button>
</template>
