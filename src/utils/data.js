const rawProjects = [
  {
    id: 'project-1',
    title: 'Redmine kanban',
    category: 'Плагин',
    client: 'Redmine',
    year: '2023',
    role: 'Ruby/Ruby on Rails × Vue',
    goal: 'Разработка системы визуализации рабочих потоков для повышения прозрачности задач в крупных командах.',
    image: '/assets/0_Abstract_Blur_3840x21602-ezgif.com-optimize (1).gif',
    description: 'Плагин Kanban-доска для Redmine позволяет эффективно управлять потоком проектов благодаря наглядной визуализации задач, сокращению объема незавершенной работы. Устраняйте узкие места!',
    gallery: [
      '/assets/0_Abstract_Blur_3840x21602-ezgif.com-optimize (1).gif',
      '/assets/redmine_ui_1.png',
      '/assets/redmine_mobile_1.png',
      '/assets/Laptop Mockup.png',
      '/assets/project-1.png'
    ]
  },
  {
    id: 'project-2',
    title: 'Банк Центр-инвест',
    category: 'Корпоративный сайт',
    client: 'Центр-инвест',
    year: '2024',
    role: 'PHP/Symfony × Nuxt',
    goal: 'Создание инновационной банковской экосистемы с упором на скорость транзакций и UX-доступность сервисов.',
    image: '/assets/центр-инвест.png',
    description: 'Новый ресурс отличается современным дизайном, усовершенствованной структурой и удобной системой навигации, что облегчает клиентам поиск нужной информации и упрощает коммуникации с банком.',
    gallery: [
      '/assets/центр-инвест.png',
      '/assets/bank_ui_1.png',
      '/assets/bank_mobile_1.png',
      '/assets/project-2.png'
    ]
  },
  {
    id: 'project-3',
    title: 'CM Expert',
    category: 'Система управления',
    client: 'CM Expert',
    year: '2023',
    role: 'NodeJS/Strapi × Nuxt',
    goal: 'Построение платформы предиктивного анализа цен на базе агрегаторов и систем мониторинга бизнес-процессов.',
    image: '/assets/freepik_slow-360-rotation-of-the-subject-around-its-vertical-axis._0001-ezgif.com-optimize.gif',
    description: 'Построение прозрачных и эффективных систем управления бизнес-процессами. Отслеживание и анализ актуальных цен, рыночных позиций на основных сайтах-агрегаторах в заданном регионе.',
    gallery: [
      '/assets/freepik_slow-360-rotation-of-the-subject-around-its-vertical-axis._0001-ezgif.com-optimize.gif',
      '/assets/cm_ui_1.png',
      '/assets/cm_ui_mobile_1.png'
    ]
  },
  {
    id: 'project-4',
    title: 'Аренда бань',
    category: 'E-Commerce',
    client: 'Аренда бань',
    year: '2023',
    role: 'PHP/Symfony × Vue',
    goal: 'Автоматизация управления бронированием и операционного контроля филиальной сети в реальном времени.',
    image: '/assets/Банька.gif',
    description: 'Сервис бронирования бани автоматизирует действия сотрудников. Контролировать как оформляются заявки и как на них реагирует персонал можно из любой точки мира.',
    gallery: [
      '/assets/Банька.gif',
      '/assets/sauna_ui_1.png',
      '/assets/sauna_mobile_1.png'
    ]
  },
];
export const projectsData = rawProjects.map((p, index) => ({
  ...p,
  longread: [
    `Главной задачей в проекте ${p.title} было перевести их ключевые бизнес-требования в функциональный цифровой интерфейс. Мы создали надежную архитектуру, которая позволяет системе выдерживать высокие нагрузки и работать без сбоев.`,
    `Мы подобрали оптимальный стек технологий для этого проекта: ${p.role}. Это позволило достичь высоких показателей производительности и масштабируемости.`,
    `Под капотом мы использовали современные подходы к рендерингу вкупе с агрессивным кэшированием. Это позволило достичь почти мгновенных переходов между страницами, которые идеально дополняют спроектированный нами продукт.`
  ],
  techStack: p.role.split(' × '),
  team: [
    { role: 'Руководитель проекта', name: 'Иван С.' },
    { role: 'Бэкенд разработчик', name: 'Алексей В.' },
    { role: 'Фронтенд разработчик', name: 'Мария Д.' }
  ],
  metrics: [
    { label: 'Скорость ответа', value: `< 150мс` },
    { label: 'Отказоустойчивость', value: `99.9%` },
    { label: 'Ускорение процессов', value: `+${40 + index * 10}%` }
  ]
}));
