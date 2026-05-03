import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Navigation from '../components/Navigation';
import CreativeFooter from '../components/CreativeFooter';
import '../styles/Privacy.css';

export default function Privacy() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.privacy-close-btn', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
      gsap.from('.privacy-header', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.privacy-content', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="privacy-main" ref={containerRef}>
      <div className="privacy-close-btn" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Назад</span>
      </div>
      <Navigation />
      <article className="privacy-container">
        <header className="privacy-header">
          <h1 className="privacy-title">Соглашение на обработку персональных данных</h1>
        </header>
        
        <section className="privacy-content">
          <p>
            Предоставляя свои персональные данные Пользователь даёт согласие на обработку, хранение и использование своих персональных данных на основании ФЗ № 152-ФЗ «О персональных данных» от 27.07.2006 г. в следующих целях:
          </p>
          
          <ul>
            <li>Осуществление клиентской поддержки</li>
            <li>Получения Пользователем информации о маркетинговых событиях</li>
            <li>Проведения аудита и прочих внутренних исследований с целью повышения качества предоставляемых услуг.</li>
          </ul>

          <p>
            Под персональными данными подразумевается любая информация личного характера, позволяющая установить личность Пользователя/Покупателя такая как:
          </p>

          <ul>
            <li>Фамилия, Имя, Отчество</li>
            <li>Дата рождения</li>
            <li>Контактный телефон</li>
            <li>Адрес электронной почты</li>
            <li>Почтовый адрес</li>
          </ul>

          <p>
            Персональные данные Пользователей хранятся исключительно на электронных носителях и обрабатываются с использованием автоматизированных систем, за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства.
          </p>

          <p>
            Компания обязуется не передавать полученные персональные данные третьим лицам, за исключением следующих случаев:
          </p>

          <ul>
            <li>По запросам уполномоченных органов государственной власти РФ только по основаниям и в порядке, установленным законодательством РФ</li>
            <li>Стратегическим партнерам, которые работают с Компанией для предоставления продуктов и услуг, или тем из них, которые помогают Компанию реализовывать продукты и услуги потребителям. Мы предоставляем третьим лицам минимальный объем персональных данных, необходимый только для оказания требуемой услуги или проведения необходимой транзакции.</li>
          </ul>

          <p>
            Компания оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила, при условии, что изменения не противоречат действующему законодательству РФ. Изменения условий настоящих правил вступают в силу после их публикации на Сайте.
          </p>
        </section>
      </article>
      <CreativeFooter />
    </main>
  );
}
