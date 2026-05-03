const LIMITS = {
  name:     { min: 2,   max: 100 },
  email:    { min: 5,   max: 254 },   
  company:  { min: 0,   max: 500 },
  position: { min: 2,   max: 100 },
  message:  { min: 10,  max: 3000 },
  resume:   { maxSizeMB: 10, types: ['.pdf', '.doc', '.docx'] },
};
const EMAIL_REGEX =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+\-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
const DANGEROUS_PATTERNS = [
  /<script[\s>]/i,
  /javascript:/i,
  /on\w+\s*=/i,        
  /<iframe/i,
  /<object/i,
  /<embed/i,
  /<form/i,
];
export function sanitize(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')   
    .replace(/&[#\w]+;/g, '')  
    .trim();
}
function containsDangerousContent(value) {
  return DANGEROUS_PATTERNS.some((re) => re.test(value));
}
function validateName(value, fieldLabel = 'Имя') {
  const clean = sanitize(value);
  if (!clean) return `${fieldLabel} — обязательное поле`;
  if (clean.length < LIMITS.name.min)
    return `${fieldLabel} должно содержать минимум ${LIMITS.name.min} символа`;
  if (clean.length > LIMITS.name.max)
    return `${fieldLabel} — максимум ${LIMITS.name.max} символов`;
  if (containsDangerousContent(clean))
    return `${fieldLabel} содержит недопустимые символы`;
  if (!/^[\p{L}\s\-'.]+$/u.test(clean))
    return `${fieldLabel} может содержать только буквы, пробелы и дефисы`;
  return null;
}
function validateEmail(value) {
  const clean = sanitize(value);
  if (!clean) return 'Email — обязательное поле';
  if (clean.length < LIMITS.email.min)
    return `Email слишком короткий (минимум ${LIMITS.email.min} символов)`;
  if (clean.length > LIMITS.email.max)
    return `Email слишком длинный (максимум ${LIMITS.email.max} символов)`;
  if (!EMAIL_REGEX.test(clean))
    return 'Неверный формат email (пример: name@domain.com)';
  // Additional domain validation
  const domain = clean.split('@')[1];
  if (domain) {
    const parts = domain.split('.');
    const tld = parts[parts.length - 1];
    if (tld.length < 2) return 'Некорректный домен email';
    if (parts.some((p) => p.length === 0)) return 'Некорректный домен email';
  }
  return null;
}
function validateMessage(value, fieldLabel = 'Сообщение', required = true) {
  const clean = sanitize(value);
  if (required && !clean) return `${fieldLabel} — обязательное поле`;
  if (!required && !clean) return null;
  if (clean.length < LIMITS.message.min)
    return `${fieldLabel} — минимум ${LIMITS.message.min} символов`;
  if (clean.length > LIMITS.message.max)
    return `${fieldLabel} — максимум ${LIMITS.message.max} символов`;
  if (containsDangerousContent(clean))
    return `${fieldLabel} содержит недопустимый контент`;
  return null;
}
function validateCompany(value) {
  const clean = sanitize(value);
  if (!clean) return null; // optional field
  if (clean.length > LIMITS.company.max)
    return `Максимум ${LIMITS.company.max} символов`;
  if (containsDangerousContent(clean))
    return 'Поле содержит недопустимые символы';
  return null;
}
function validatePosition(value) {
  const clean = sanitize(value);
  if (!clean) return 'Позиция — обязательное поле';
  if (clean.length < LIMITS.position.min)
    return `Минимум ${LIMITS.position.min} символа`;
  if (clean.length > LIMITS.position.max)
    return `Максимум ${LIMITS.position.max} символов`;
  if (containsDangerousContent(clean))
    return 'Поле содержит недопустимые символы';
  return null;
}
function validateResume(file) {
  if (!file) return null; // optional
  const ext = '.' + file.name.split('.').pop().toLowerCase();
  if (!LIMITS.resume.types.includes(ext))
    return `Допустимые форматы: ${LIMITS.resume.types.join(', ')}`;
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > LIMITS.resume.maxSizeMB)
    return `Файл слишком большой (максимум ${LIMITS.resume.maxSizeMB} МБ)`;
  return null;
}
// ─── Form-level validators ──────────────────────────────────────
export function validateContactForm(data) {
  const errors = {};
  const nameErr = validateName(data.name, 'Имя / Компания');
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;
  const companyErr = validateCompany(data.company);
  if (companyErr) errors.company = companyErr;
  const msgErr = validateMessage(data.message, 'Описание задачи', true);
  if (msgErr) errors.message = msgErr;
  return errors;
}
export function validateJoinUsForm(data) {
  const errors = {};
  const nameErr = validateName(data.name, 'Имя');
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;
  const posErr = validatePosition(data.position);
  if (posErr) errors.position = posErr;
  const msgErr = validateMessage(data.message, 'О себе', false);
  if (msgErr) errors.message = msgErr;
  const resumeErr = validateResume(data.resume);
  if (resumeErr) errors.resume = resumeErr;
  return errors;
}
// ─── Rate Limiting (persistent, localStorage-based) ─────────────
const SUBMIT_COOLDOWN_MS   = 60_000;
const MAX_SUBMITS_PER_HOUR = 5;
const HOUR_MS              = 3_600_000;
const STORAGE_KEY          = 'cinet_form_submissions';
function getSubmissionLog() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}
function saveSubmissionLog(log) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(log)); } catch {}
}
export function checkRateLimit(formId) {
  const now = Date.now();
  const log = getSubmissionLog();
  const history = (log[formId] || []).filter(ts => now - ts < HOUR_MS);
  if (history.length > 0) {
    const lastSubmit = Math.max(...history);
    const elapsed = now - lastSubmit;
    if (elapsed < SUBMIT_COOLDOWN_MS) {
      const remaining = Math.ceil((SUBMIT_COOLDOWN_MS - elapsed) / 1000);
      return { allowed: false, remainingSeconds: remaining, reason: `Подождите ${remaining} сек. перед повторной отправкой` };
    }
  }
  if (history.length >= MAX_SUBMITS_PER_HOUR) {
    const oldestInWindow = Math.min(...history);
    const resetIn = Math.ceil((HOUR_MS - (now - oldestInWindow)) / 60_000);
    return { allowed: false, remainingSeconds: resetIn * 60, reason: `Достигнут лимит отправок (${MAX_SUBMITS_PER_HOUR} в час). Повторите через ${resetIn} мин.` };
  }
  return { allowed: true, remainingSeconds: 0, reason: '' };
}
export function recordSubmission(formId) {
  const now = Date.now();
  const log = getSubmissionLog();
  const history = (log[formId] || []).filter(ts => now - ts < HOUR_MS);
  history.push(now);
  log[formId] = history;
  saveSubmissionLog(log);
}
// ─── Honeypot (invisible bot trap) ──────────────────────────────
export function validateHoneypot(value) {
  return !value || value.trim().length === 0;
}
// ─── Character counter helper ───────────────────────────────────
export function getCharCount(value, fieldName) {
  const max = LIMITS[fieldName]?.max ?? Infinity;
  const current = (value || '').length;
  return { current, max, remaining: max - current, isOver: current > max };
}
export { LIMITS };
