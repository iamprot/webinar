<script setup>
const speakers = [
  {
    name: 'Андрей Клопотовский',
    role: 'Генеральный директор «К-План», ранее — директор по экономике FESCO',
    bio: 'Много лет работает с корпоративным планированием и бюджетированием со стороны бизнеса. На уроке Андрей соберет модель на практическом производственном кейсе и покажет, как финансовая команда может работать с ней дальше.',
    tags: ['К–ПЛАН'],
    image: 'images/andrey_k.jpg'
  },
  {
    name: 'Юрий Кузьмин',
    role: 'Руководитель проектов, Практика IBP / Платформенные решения,',
    bio: 'Опыт — более 15 проектов в планировании и цифровых двойниках на российском и международном рынках.',
    tags: ['Axenix'],
    image: 'images/yuri_k.jpg'
  }
];
</script>

<template>
  <section class="relative py-16 md:py-24 min-h-screen flex items-center" id="speakers">
    <div class="container mx-auto max-w-7xl px-4 md:px-8">
      <div v-reveal class="text-center max-w-185 mx-auto mb-10 md:mb-20">
        <span class="section-tag">Спикеры</span>
        <h2 class="text-[clamp(28px,4.5vw,54px)] text-balance mb-4.5 tracking-tight">Практический взгляд со стороны бизнеса и&nbsp;внедрения</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-230 mx-auto">
        <article v-for="(speaker, i) in speakers" :key="i" v-reveal="{ delay: i + 1 }" class="bg-white rounded-4xl overflow-hidden border border-line-soft transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl hover:border-line-strong group">
          <div class="aspect-4/3 overflow-hidden relative bg-linear-to-br from-primary/10 to-accent/15">
            <div :style="`background-image: url(${speaker.image});`" class="w-full h-full bg-cover transition-transform duration-600 ease-in-out group-hover:scale-105"></div>
            <div class="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink/60 pointer-events-none"></div>
          </div>
          <div class="p-7">
            <h3 class="text-2xl mb-2">{{ speaker.name }}</h3>
            <p class="text-[15px] text-ink/50 font-semibold mb-3.5">{{ speaker.role }}</p>
            <p class="text-[16px] mb-4.5">{{ speaker.bio }}</p>
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in speaker.tags" :key="tag" class="px-3 py-1 bg-primary/10 text-primary text-base font-medium rounded-full">
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>