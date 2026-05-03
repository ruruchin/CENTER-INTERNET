import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import Navigation from '../components/Navigation';
import CreativeFooter from '../components/CreativeFooter';
import PointCube from '../components/PointCube';
import { validateContactForm, validateHoneypot, sanitize, getCharCount, checkRateLimit, recordSubmission, LIMITS } from '../utils/formValidation';
import { sendContactForm, isConfigured } from '../utils/emailService';
import PrivacyModal from '../components/PrivacyModal';
import '../styles/Contact.css';
export default function Contact() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [globalError, setGlobalError] = useState('');
  const containerRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal-text', 
        { y: '100%' },
        { y: '0%', duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo('.form-element',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (status === 'success') {
      const ctx = gsap.context(() => {
        gsap.from('.success-icon-bg', { scale: 0, duration: 0.8, ease: 'back.out(2)' });
        gsap.from('.success-svg', { opacity: 0, scale: 0.5, delay: 0.3, duration: 0.5, ease: 'power2.out' });
        gsap.from('.success-title', { y: 20, opacity: 0, delay: 0.4, duration: 0.6, ease: 'power3.out' });
        gsap.from('.success-text', { y: 20, opacity: 0, delay: 0.5, duration: 0.6, ease: 'power3.out' });
        gsap.from('.success-button', { y: 20, opacity: 0, delay: 0.6, duration: 0.6, ease: 'power3.out' });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [status]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const maxLen = LIMITS[name]?.max;
    const sanitized = maxLen ? value.slice(0, maxLen) : value;
    setFormData(prev => ({ ...prev, [name]: sanitized }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (globalError) setGlobalError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateHoneypot(honeypot)) { setStatus('success'); return; }
    const rateCheck = checkRateLimit('contact');
    if (!rateCheck.allowed) { setGlobalError(rateCheck.reason); return; }
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const el = document.querySelector('.contact-input.error, .contact-textarea.error');
      if (el) el.focus();
      return;
    }
    setStatus('submitting');
    setGlobalError('');
    if (!isConfigured()) {
      console.warn('⚠️ EmailJS не настроен — симуляция. Настройте ключи в src/utils/emailService.js');
      await new Promise(r => setTimeout(r, 1200));
      recordSubmission('contact');
      setStatus('success');
      return;
    }
    const result = await sendContactForm({
      name: sanitize(formData.name), email: sanitize(formData.email),
      company: sanitize(formData.company), message: sanitize(formData.message),
    });
    if (result.success) { recordSubmission('contact'); setStatus('success'); }
    else { setStatus('error'); setGlobalError(result.error); }
  };
  const resetForm = () => {
    setFormData({ name: '', email: '', company: '', message: '' });
    setErrors({}); setStatus('idle'); setGlobalError('');
  };
  const messageCount = getCharCount(formData.message, 'message');
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="contact-main" ref={containerRef}>
        <Navigation />
        <article className="contact-container">
          <header className="contact-left-col">
            <h1 className="contact-title">
              <div className="contact-title-line"><span className="contact-title-word reveal-text">Let's</span></div>
              <div className="contact-title-line"><span className="contact-title-word indent reveal-text">Connect</span></div>
            </h1>
            <div className="contact-subtitle-wrapper">
              <p className="contact-subtitle reveal-text">
                Готовы начать проект? Напишите нам, и мы свяжемся с вами в течение 24 часов.
              </p>
            </div>
          </header>
          <section className="contact-right-col">
            {status === 'success' ? (
              <div className="contact-success-view">
                <div className="success-header">
                  <div className="success-icon-wrap">
                    <div className="success-icon-bg"></div>
                    <svg className="success-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="success-title">Спасибо!</h3>
                </div>
                <div className="success-body">
                  <p className="success-text">Ваше сообщение успешно отправлено.<br/>Мы свяжемся с вами в ближайшее время.</p>
                  <button onClick={resetForm} className="success-button">
                    <span>Отправить еще раз</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Honeypot */}
                <div className="contact-hp-field" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="contact-website">Website</label>
                  <input type="text" id="contact-website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>
                {globalError && (
                  <div className="contact-global-error form-element">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    <span>{globalError}</span>
                  </div>
                )}
                <div className="contact-form-group form-element">
                  <label htmlFor="contact-name" className="contact-label">Имя / Компания *<span className="contact-char-hint">{formData.name.length}/{LIMITS.name.max}</span></label>
                  <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleChange} maxLength={LIMITS.name.max} className={`contact-input ${errors.name ? 'error' : ''}`} placeholder="Как к вам обращаться?" autoComplete="name" />
                  {errors.name && <span className="contact-error-message">{errors.name}</span>}
                </div>
                <div className="contact-form-group form-element">
                  <label htmlFor="contact-email" className="contact-label">Email *<span className="contact-char-hint">{formData.email.length}/{LIMITS.email.max}</span></label>
                  <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleChange} maxLength={LIMITS.email.max} className={`contact-input ${errors.email ? 'error' : ''}`} placeholder="example@domain.com" autoComplete="email" />
                  {errors.email && <span className="contact-error-message">{errors.email}</span>}
                </div>
                <div className="contact-form-group form-element">
                  <label htmlFor="contact-company" className="contact-label">Ссылка на проект (Необязательно)<span className="contact-char-hint">{formData.company.length}/{LIMITS.company.max}</span></label>
                  <input type="text" id="contact-company" name="company" value={formData.company} onChange={handleChange} maxLength={LIMITS.company.max} className={`contact-input ${errors.company ? 'error' : ''}`} placeholder="Сайт, Figma или соцсети" autoComplete="url" />
                  {errors.company && <span className="contact-error-message">{errors.company}</span>}
                </div>
                <div className="contact-form-group form-element">
                  <label htmlFor="contact-message" className="contact-label">Описание задачи *<span className={`contact-char-hint ${messageCount.isOver ? 'over' : ''}`}>{messageCount.current}/{messageCount.max}</span></label>
                  <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows="4" maxLength={LIMITS.message.max} className={`contact-textarea ${errors.message ? 'error' : ''}`} placeholder="Расскажите о вашем проекте подробнее..."></textarea>
                  {errors.message && <span className="contact-error-message">{errors.message}</span>}
                </div>
                <div className="form-element">
                  <button type="submit" className="contact-submit-button" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (<span className="contact-btn-loading"><span className="contact-spinner"></span>Отправка...</span>) : status === 'error' ? 'Попробовать снова' : 'Отправить заявку'}
                  </button>
                  <p className="contact-privacy-notice">
                    Нажимая кнопку, вы соглашаетесь с <span className="privacy-link" onClick={() => setIsPrivacyOpen(true)}>условиями обработки персональных данных</span>
                  </p>
                </div>
              </form>
            )}
          </section>
        </article>
        <CreativeFooter />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      </main>
    </ReactLenis>
  );
}
