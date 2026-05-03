import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/PrivacyModal.css';

export default function PrivacyModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      tl.fromTo(contentRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { y: 30, opacity: 0, duration: 0.4, ease: 'power3.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.2');
  };

  return (
    <div className="privacy-modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="privacy-modal-container" ref={modalRef} onClick={e => e.stopPropagation()}>
        <button className="privacy-modal-close" onClick={handleClose} aria-label="Закрыть">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="privacy-modal-content" ref={contentRef} data-lenis-prevent>
          <header className="privacy-modal-header">
            <h2>Соглашение на обработку персональных данных</h2>
          </header>
          
          <div className="privacy-modal-body">
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
              <li>Стратегическим партнерам, которые работают с Компанией для предоставления продуктов и услуг, или тем из них, которые помогают Компанию реализовывать продукты и услуги потребителям.</li>
            </ul>

            <p>
              Компания оставляет за собой право вносить изменения в одностороннем порядке в настоящие правила, при условии, что изменения не противоречат действующему законодательству РФ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
