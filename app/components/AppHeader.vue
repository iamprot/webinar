<script setup lang="ts">
const scrolled = ref(false)

function onScroll() { scrolled.value = window.scrollY > 40 }


const links = [
  { label: 'О мероприятии', to: '#cases' },
  { label: 'Шаги', to: '#steps' },
  { label: 'Интерактив', to: '#interactive' },
  { label: 'Спикеры', to: '#speakers' },
  { label: 'Для кого', to: '#audience' },
]

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 py-2 backdrop-blur-lg backdrop-saturate-150 border-b border-line-soft transition-all duration-300 ease-soft"
  :class="scrolled ? 'border-hairline bg-surface/80 py-3 backdrop-blur-[14px]' : 'border-transparent py-5'"
  >
    <div class="container mx-auto max-w-7xl px-2 md:px-8 flex items-center justify-between gap-8 transition-all duration-300 ease-soft">
      <!-- Logo & Nav links stay exactly the same -->
      <div class="flex items-center justify-around gap-3 md:gap-6">
        <a href="#">
          <BrandMark class="h-6 md:h-9 w-fit shrink-0" />
        </a>
        <KplanLogo class="h-5 md:h-9 w-fit shrink-0" />
        <AxenixLogo class="h-7 md:h-9 mb-3 w-fit shrink-0" />
      </div>
      <nav class="hidden min-[1071px]:flex gap-8">
        <a v-for="(link, idx) in links" :key="idx" :href="link.to" class="text-sm font-medium text-muted hover:text-ink transition-colors relative group">
          {{ link.label }}<span class="absolute left-0 -bottom-2 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </a>
        
      </nav>
      
      <AppButton href="#register" size="sm" class="w-fit!">Регистрация</AppButton>
    </div>
  </header>
</template>