<template>
  <footer class="py-20 pb-8 bg-surface border-t border-line-soft">
    <div class="container mx-auto max-w-7xl px-8">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-15 mb-15">
        <div>
      <div class="flex w-full items-center gap-8">
        <BrandMark />
        <AxenixLogo />
      </div>
          <p class="mt-6 text-sm max-w-[320px] text-muted">Совместный открытый урок по&nbsp;бюджетированию</p>
        </div>
        
        <div class="grid grid-cols-2 gap-10">
          <div>
            <h5 class="text-[13px] mb-4.5 tracking-wide uppercase font-bold">Вебинар</h5>
            <a href="#cases" class="block text-sm text-muted py-1 hover:text-primary transition-colors">О мероприятии</a>
            <a href="#steps" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Шаги</a>
            <a href="#interactive" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Интерактив</a>
            <a href="#speakers" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Спикеры</a>
            <a href="#audience" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Для кого</a>
          </div>
          <div>
            <h5 class="text-[13px] mb-4.5 tracking-wide uppercase font-bold">Knowledge Space</h5>
            <a href="https://im.systems/about/" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Основная информация</a>
            <a href="https://im.systems/decision/" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Продукты</a>
            <a href="https://im.systems/project-page/" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Проекты</a>
            <a href="https://im.systems/contact/" class="block text-sm text-muted py-1 hover:text-primary transition-colors">Контакты</a>
          </div>
        </div>
      </div>
      
      <div class="flex flex-col md:flex-row items-center md:items-end  md:justify-between pt-8 border-t border-line-soft text-[13px] text-muted gap-2">
        <span>&copy; {{ new Date().getFullYear() }} Knowledge Space.</span>
        <span>Увидимся на вебинаре!</span>
      </div>
    </div>
  </footer>
</template>