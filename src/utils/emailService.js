import emailjs from '@emailjs/browser';
const EMAILJS_CONFIG = {
  PUBLIC_KEY:           'dgEczJDBk9d9j3RvI',
  SERVICE_ID:           'service_vs8gona',
  CONTACT_TEMPLATE_ID:  'template_i7ox60g',
  JOINUS_TEMPLATE_ID:   'YOUR_JOINUS_TEMPLATE_ID',
};
let initialized = false;
function ensureInit() {
  if (!initialized && isConfigured()) {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    initialized = true;
  }
}
export async function sendContactForm(data) {
  ensureInit();
  const templateParams = { 
    from_name: data.name, 
    name: data.name, 
    reply_to: data.email, 
    email: data.email,
    company: data.company || '—', 
    message: data.message 
  };
  try {
    await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.CONTACT_TEMPLATE_ID, templateParams);
    await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, 'template_5n1i1jr', templateParams);
    return { success: true };
  } catch (err) {
    console.error('EmailJS Contact error:', err);
    return { success: false, error: 'Не удалось отправить сообщение. Попробуйте позже или напишите нам на info@cinet.ru' };
  }
}
export async function sendJoinUsForm(formElement) {
  ensureInit();
  try {
    await emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.CONTACT_TEMPLATE_ID, formElement);
    await emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, 'template_5n1i1jr', formElement);
    return { success: true };
  } catch (err) {
    console.error('EmailJS JoinUs error:', err);
    return { success: false, error: 'Не удалось отправить анкету. Попробуйте позже или напишите нам на info@cinet.ru' };
  }
}
export function isConfigured() {
  return EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && EMAILJS_CONFIG.PUBLIC_KEY.length > 0;
}
