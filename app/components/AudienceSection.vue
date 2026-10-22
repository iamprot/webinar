<script setup>
const roles = [
  { icon: 'briefcase-business-duotone', title: 'Финансовые директора', desc: 'Тут бы описание' },
  { icon: 'file-chart-line-duotone', title: 'Руководители ПЭО', desc: 'Тут бы описание' },
  { icon: 'clipboard-check-duotone', title: 'Специалисты по бюджетированию', desc: 'Тут бы описание' },
  { icon: 'chart-candlestick-duotone', title: 'Финансовые аналитики', desc: 'Тут бы описание' },
  { icon: 'calculator-duotone', title: 'Контролеры', desc: 'Тут бы описание' },
  { icon: 'cog-duotone', title: 'Команды автоматизации', desc: 'Тут бы описание' }
];
</script>

<template>
  <section class="relative py-16 md:py-36 min-h-screen flex items-center" id="audience">
    <div class="container mx-auto max-w-7xl px-4 md:px-8">
      <div v-reveal class="text-center max-w-185 mx-auto mb-10 md:mb-20">
        <span class="section-tag">Для кого</span>
        <h2 class="text-[clamp(36px,4.5vw,58px)] mb-4.5 tracking-tight">Кому будет полезен открытый урок</h2>
        <p class="text-lg">В первую очередь — командам производственных компаний, которые участвуют в бюджетировании, планировании и автоматизации финансовых процессов.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article v-for="(role, i) in roles" :key="i" v-reveal="{ delay: Math.floor(i/2) + 1 }" class="bg-white border border-line-soft rounded-3xl p-7 flex items-center gap-4.5 transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl group hover:cursor-default">
          <div class="w-13 h-13 rounded-2xl bg-primary/5 flex items-center justify-center text-xl text-primary shrink-0 transition-all duration-500 group-hover:bg-primary  group-hover:text-white">
            <Icon :name="`lucide-extended:${role.icon}`" class="shrink-0 h-6! w-6!"/>
          </div>
          <div>
            <h4 class="text-[clamp(16px,1.5vw,20px)] mb-0.5 tracking-tight leading-6">{{ role.title }}</h4>
            <p class="text-[15px] text-muted">{{ role.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>