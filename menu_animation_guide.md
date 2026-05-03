# Реализация анимации меню в проекте CENTER-INTERNET

В проекте используется эффектная анимация открытия и закрытия полноэкранного меню. Ниже подробно описано, как она устроена.

## Основной стек технологий
- **React**: управление состоянием меню (`isOpen`), ссылки на DOM-элементы (`useRef`) и запуск анимаций при изменении состояния (`useEffect`).
- **GSAP (GreenSock Animation Platform)**: мощная библиотека для создания сложных последовательных анимаций с помощью `gsap.timeline()`.
- **CSS (Vanilla)**: стилизация элементов, позиционирование и эффекты наложения (`mix-blend-mode`).

---

## Структура DOM (HTML/JSX)

Меню состоит из двух основных визуальных частей:
1. **Фон ("Шторки")**: 8 горизонтальных блоков (`div.navigation-shutter`), которые при открытии выезжают с разных сторон и перекрывают экран.
2. **Ссылки меню**: Текстовые ссылки, каждая обернута в контейнер с `overflow: hidden` (`.navigation-link-wrapper`), что позволяет реализовать эффект "появления текста из ниоткуда" (reveal).

```jsx
{/* Контейнер для шторок */}
<div className="navigation-shutters-container">
  {[...Array(8)].map((_, i) => (
    <div key={i} ref={el => shuttleRef.current[i] = el} className="navigation-shutter" />
  ))}
</div>

{/* Контейнер для ссылок */}
<div className="navigation-menu">
  {menuItems.map((item, i) => (
    <div key={item.id} className="navigation-link-wrapper">
      <a ref={el => linksRef.current[i] = el} className="navigation-link">
        {item.label}
      </a>
    </div>
  ))}
</div>
```

---

## Логика анимации (GSAP)

Вся логика анимации находится в хуке `useEffect` в компоненте `Navigation.jsx`. Анимация зависит от состояния `isOpen` (открыто/закрыто).

### 1. Открытие меню (`isOpen === true`)
Используется таймлайн (`gsap.timeline()`), чтобы запустить анимации одну за другой:

- **Шаг 1: Подготовка шторок.**
  Четные шторки устанавливаются за левым краем экрана (`x: "-100%"`), а нечетные — за правым (`x: "100%"`).
- **Шаг 2: Выезд шторок.**
  Шторки анимируются к центру (`x: "0%"`).
  - *Длительность*: 0.8 секунд.
  - *Stagger*: 0.05 сек (каждая следующая шторка начинает движение чуть позже предыдущей, создавая эффект волны).
  - *Easing (Плавность)*: `power4.inOut`.
- **Шаг 3: Появление ссылок.**
  Текст вылетает сверху вниз (`от y: -100` до `y: 0`) и становится видимым (`opacity: от 0 до 1`).
  - *Длительность*: 0.8 секунд.
  - *Easing*: `back.out(1.5)` (текст слегка "перелетает" нужную позицию и возвращается обратно, эффект пружины).
  - Запускается на 0.4 секунды раньше окончания выезда шторок (параметр `"-=0.4"`).

### 2. Закрытие меню (`isOpen === false`)
Происходит обратная анимация:

- **Шаг 1: Скрытие ссылок.**
  Ссылки уезжают вниз (`y: 40`) и затухают (`opacity: 0`).
  - *Длительность*: 0.4 секунды.
  - *Easing*: `power2.in`.
- **Шаг 2: Разъезд шторок.**
  Шторки уезжают обратно за пределы экрана (четные влево, нечетные вправо).
  - *Длительность*: 0.6 секунд.
  - *Stagger*: случайный порядок старта (`from: "random"`, `each: 0.03`). Это создает интересный "хаотичный" эффект исчезновения фона.
  - Запускается на 0.2 секунды раньше окончания скрытия ссылок (параметр `"-=0.2"`).

---

## Важные CSS детали
- `.navigation-nav`: Имеет свойство `mix-blend-mode: difference;` и цвет текста `#ffffff`. Это заставляет логотип и кнопку "Меню" автоматически менять цвет на контрастный в зависимости от того, что находится под ними (светлый или темный фон), поэтому они всегда читаемы.
- `.navigation-link-wrapper`: Имеет `overflow: hidden;`. Благодаря этому, когда ссылка внутри уезжает за пределы этого враппера по оси Y (например, при `y: -100` или `y: 40`), она обрезается и исчезает, не нарушая общую композицию.
- `.navigation-shutter`: Имеет фоновый цвет `#0b0b0b` (темно-серый/почти черный) и растягивается на весь контейнер (`flex: 1`, `width: 100%`).

---

## Полный код компонента (Navigation.jsx)

```jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef(null);
  const shuttleRef = useRef([]);
  const linksRef = useRef([]);

  useEffect(() => {
    const shutters = shuttleRef.current;
    const links = linksRef.current;

    if (isOpen) {
      const tl = gsap.timeline();

      shutters.forEach((shutter, i) => {
        gsap.set(shutter, { x: i % 2 === 0 ? "-100%" : "100%" });
      });

      tl.to(shutters, {
        x: "0%",
        duration: 0.8,
        stagger: 0.05,
        ease: "power4.inOut"
      });

      tl.fromTo(links, 
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.04, 
          ease: "back.out(1.5)" 
        },
        "-=0.4"
      );

    } else {
      const tl = gsap.timeline();

      tl.to(links, {
        y: 40,
        opacity: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.in"
      });

      tl.to(shutters, {
        x: (i) => i % 2 === 0 ? "-100%" : "100%",
        duration: 0.6,
        stagger: {
          each: 0.03,
          from: "random"
        },
        ease: "power4.inOut"
      }, "-=0.2");
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    } else {
      navigate('/', { state: { scrollTo: 'top' } });
      setTimeout(() => window.scrollTo(0, 0), 10);
    }
  };

  const handleMenuClick = (e, item) => {
    e.preventDefault();
    toggleMenu();

    if (item.route && item.route !== '/') {
      navigate(item.route);
      window.scrollTo(0, 0);
      return;
    }

    const hash = `#${item.id}`;
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: hash } });
    } else {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { label: 'Работы', id: 'work', route: '/' },
    { label: 'Студия', id: 'studio', route: '/' },
    { label: 'Стэк', id: 'stack', route: '/' },
    { label: 'Хочу к вам', id: 'join', route: '/join' },
    { label: 'Связаться с нами', id: 'contact', route: '/contact' }
  ];

  return (
    <>
      <nav className="navigation-nav">
        <div 
          onClick={handleLogoClick}
          className="navigation-logo"
        >
          <img src="/logo.svg" alt="CENTER-INTERNET" className="navigation-logo-img" />
          <span>CENTER-INTERNET</span>
        </div>

        <button 
          onClick={toggleMenu}
          className="navigation-toggle"
        >
          {isOpen ? 'Закрыть' : 'Меню'}
        </button>
      </nav>

      <div 
        ref={overlayRef}
        className={`navigation-overlay ${isOpen ? 'is-open' : ''}`}
      >
        <div className="navigation-shutters-container">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              ref={el => shuttleRef.current[i] = el}
              className="navigation-shutter"
            />
          ))}
        </div>

        <div className="navigation-menu">
          {menuItems.map((item, i) => (
            <div key={item.id} className="navigation-link-wrapper">
              <a 
                href={item.route === '/' ? `/#${item.id}` : item.route}
                onClick={(e) => handleMenuClick(e, item)}
                ref={el => linksRef.current[i] = el}
                className="navigation-link"
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
```
