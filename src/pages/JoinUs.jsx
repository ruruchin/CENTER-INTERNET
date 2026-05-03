import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import Navigation from '../components/Navigation';
import CreativeFooter from '../components/CreativeFooter';
import { validateJoinUsForm, validateHoneypot, sanitize, getCharCount, checkRateLimit, recordSubmission, LIMITS } from '../utils/formValidation';
import { sendJoinUsForm, isConfigured } from '../utils/emailService';
import '../styles/JoinUs.css';
export default function JoinUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    message: '',
    resume: null
  });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [globalError, setGlobalError] = useState('');
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
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
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData(prev => ({ ...prev, resume: files[0] || null }));
    } else {
      const maxLen = LIMITS[name]?.max;
      const sanitized = maxLen ? value.slice(0, maxLen) : value;
      setFormData(prev => ({ ...prev, [name]: sanitized }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (globalError) setGlobalError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateHoneypot(honeypot)) { setStatus('success'); return; }
    const rateCheck = checkRateLimit('joinus');
    if (!rateCheck.allowed) { setGlobalError(rateCheck.reason); return; }
    const validationErrors = validateJoinUsForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const el = document.querySelector('.join-input.error, .join-textarea.error');
      if (el) el.focus();
      return;
    }
    setStatus('submitting');
    setGlobalError('');
    if (!isConfigured()) {
      console.warn('⚠️ EmailJS не настроен — симуляция. Настройте ключи в src/utils/emailService.js');
      await new Promise(r => setTimeout(r, 1200));
      recordSubmission('joinus');
      setStatus('success');
      return;
    }
    const form = e.target;
    const tempFields = [
      { name: 'from_name', value: formData.name },
      { name: 'reply_to', value: formData.email },
      { name: 'company', value: 'Вакансия: ' + formData.position }
    ];
    tempFields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      input.classList.add('temp-emailjs-field');
      form.appendChild(input);
    });
    const result = await sendJoinUsForm(form);
    form.querySelectorAll('.temp-emailjs-field').forEach(el => el.remove());
    if (result.success) { recordSubmission('joinus'); setStatus('success'); }
    else { setStatus('error'); setGlobalError(result.error); }
  };
  const resetForm = () => {
    setFormData({ name: '', email: '', position: '', message: '', resume: null });
    setErrors({}); setStatus('idle'); setGlobalError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const messageCount = getCharCount(formData.message, 'message');
  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.2, smoothWheel: true, syncTouch: true }}>
      <main className="join-main" ref={containerRef}>
        <Navigation />
        <article className="join-container">
          <header className="join-left-col">
            <h1 className="join-title">
              <div className="join-title-line"><span className="join-title-word reveal-text">Join</span></div>
              <div className="join-title-line"><span className="join-title-word indent reveal-text">Our Team</span></div>
            </h1>
            <div className="join-subtitle-wrapper">
              <p className="join-subtitle reveal-text">
                Мы всегда ищем талантливых людей. Оставьте заявку, и мы обсудим наше общее будущее.
              </p>
            </div>
          </header>
          <section className="join-right-col">
            {status === 'success' ? (
              <div className="join-success-view">
                <div className="success-header">
                  <div className="success-icon-wrap">
                    <div className="success-icon-bg"></div>
                    <svg className="success-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 className="success-title">Заявка получена!</h3>
                </div>
                <div className="success-body">
                  <p className="success-text">Мы получили ваши данные и свяжемся с вами в ближайшее время, если ваши навыки нам подходят.</p>
                  <button onClick={resetForm} className="success-button">
                    <span>Отправить еще раз</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="join-form" noValidate>
                <div className="join-hp-field" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="join-website">Website</label>
                  <input type="text" id="join-website" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>
                {globalError && (
                  <div className="join-global-error form-element">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    <span>{globalError}</span>
                  </div>
                )}
                <div className="join-form-group form-element">
                  <label htmlFor="join-name" className="join-label">Имя *<span className="join-char-hint">{formData.name.length}/{LIMITS.name.max}</span></label>
                  <input type="text" id="join-name" name="name" value={formData.name} onChange={handleChange} maxLength={LIMITS.name.max} className={`join-input ${errors.name ? 'error' : ''}`} placeholder="Как вас зовут?" autoComplete="name" />
                  {errors.name && <span className="join-error-message">{errors.name}</span>}
                </div>
                <div className="join-form-group form-element">
                  <label htmlFor="join-email" className="join-label">Email *<span className="join-char-hint">{formData.email.length}/{LIMITS.email.max}</span></label>
                  <input type="email" id="join-email" name="email" value={formData.email} onChange={handleChange} maxLength={LIMITS.email.max} className={`join-input ${errors.email ? 'error' : ''}`} placeholder="example@domain.com" autoComplete="email" />
                  {errors.email && <span className="join-error-message">{errors.email}</span>}
                </div>
                <div className="join-form-group form-element">
                  <label htmlFor="join-position" className="join-label">Желаемая позиция *<span className="join-char-hint">{formData.position.length}/{LIMITS.position.max}</span></label>
                  <input type="text" id="join-position" name="position" value={formData.position} onChange={handleChange} maxLength={LIMITS.position.max} className={`join-input ${errors.position ? 'error' : ''}`} placeholder="Например: Frontend Developer" />
                  {errors.position && <span className="join-error-message">{errors.position}</span>}
                </div>

                <div className="join-form-group form-element">
                  <label htmlFor="join-message" className="join-label">О себе / Портфолио<span className={`join-char-hint ${messageCount.isOver ? 'over' : ''}`}>{messageCount.current}/{messageCount.max}</span></label>
                  <textarea id="join-message" name="message" value={formData.message} onChange={handleChange} rows="4" maxLength={LIMITS.message.max} className={`join-textarea ${errors.message ? 'error' : ''}`} placeholder="Расскажите о своих достижениях или прикрепите ссылку на портфолио..."></textarea>
                  {errors.message && <span className="join-error-message">{errors.message}</span>}
                </div>
                <div className="form-element">
                  <button type="submit" className="join-submit-button" disabled={status === 'submitting'}>
                    {status === 'submitting' ? (<span className="join-btn-loading"><span className="join-spinner"></span>Отправка...</span>) : status === 'error' ? 'Попробовать снова' : 'Отправить анкету'}
                  </button>
                </div>
              </form>
            )}
          </section>
        </article>
        <CreativeFooter />
      </main>
    </ReactLenis>
  );
}
