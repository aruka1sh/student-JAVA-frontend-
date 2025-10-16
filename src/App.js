import React, { useState, useEffect } from 'react';
// ИСПРАВЛЕНО: Заменили 'Tool' на 'Wrench'
import { Settings, Phone, Mail, MapPin, Wrench, AlertTriangle, Package, ArrowRight } from 'lucide-react';
import './App.css';

// --- СЛОВАРЬ ПЕРЕВОДОВ ---
const translations = {
  kz: {
    // Навигация
    nav_about: 'Біз туралы',
    nav_contact: 'Байланыс',
    nav_development: 'Дамыту',
    nav_login: 'КІРУ',
    nav_register: 'ТІРКЕЛУ',
    // Подвал
    footer_company: 'КОМПАНИЯ',
    footer_services: 'ҚЫЗМЕТТЕР',
    footer_service1: 'Автоматты балл есептеу',
    footer_service2: 'Грант және ақылы тізімін қалыптастыру',
    footer_service3: 'Аттестатты жүктеу және тексеру',
    footer_copyright: '© Smart admission 2025',
    // Страница входа
    login_welcome: 'Қош келдіңіз',
    login_prompt: 'Жалғастыру үшін жүйеге кіріңіз',
    login_title: 'Кіру',
    login_email_placeholder: 'Пошта',
    login_password_placeholder: 'Құпия сөз',
    login_remember_me: 'Есте сақтау',
    login_forgot_password: 'Құпия сөздi ұмыттыңыз ба?',
    login_button: 'ЖАЛҒАСТЫРУ',
    // Страница регистрации
    register_welcome: 'Танысқаныма қуаныштымын :)',
    register_prompt: 'Келесі бетке өту үшін тіркеліңіз',
    register_title: 'Тіркелу',
    register_name_placeholder: 'Атыңыз',
    register_password_confirm_placeholder: 'Құпия сөздi қайталаңыз',
    register_button: 'ЖАЛҒАСТЫРУ',
    // Страница контактов
    contact_title: 'Бізбен байланыс',
    contact_prompt: 'Егер сізде сұрақтар немесе ұсыныстар болса, бізге хабарласыңыз. Біз сізге көмектесуге қуаныштымыз!',
    contact_name_placeholder: 'Сіздің атыңыз *',
    contact_email_placeholder: 'Сіздің поштаңыз *',
    contact_phone_placeholder: 'Сіздің байланыс нөміріңіз',
    contact_role_placeholder: 'Сіздің рөліңіз (мұғалім немесе студент)?',
    contact_message_placeholder: 'Хабарламаңызды осында жазыңыз',
    contact_button: 'ХАБАРЛАМА ЖІБЕРУ',
    contact_info_title: 'Біздің байланыстар',
    // Страница "О нас"
    about_title: 'Біздің Жоба Туралы',
    about_p1: 'Smart Admission — бұл талапкерлерді қабылдау үдерісін автоматтандыруға және оңтайландыруға арналған заманауи веб-жүйе.',
    about_p2: 'Біздің мақсатымыз – оқуға түсу процесін талапкерлер үшін де, қабылдау комиссиясының қызметкерлері үшін де мүмкіндігінше ашық, ыңғайлы және әділ ету. Жүйе аттестат бағаларының орташа балын автоматты түрде есептейді, студенттерді рейтинг бойынша саралайды және оларды гранттық және ақылы орындарға бөледі.',
    about_p3: 'Біз қолмен атқарылатын жұмысты азайтып, қателіктердің санын төмендетіп, барлық қатысушылар үшін уақытты үнемдеуге тырысамыз.',
    // Страница "Развитие" (Скоро...)
    coming_soon_title: 'ЖАҚЫН АРАДА...',
    coming_soon_prompt: 'Бұл бөлім әзірленуде. Жаңалықтардан хабардар болу үшін поштаңызды қалдырыңыз.',
    coming_soon_button: 'МАҒАН ХАБАРЛАҢЫЗ',
    coming_soon_months: 'Ай',
    coming_soon_days: 'Күн',
    coming_soon_hours: 'Сағат',
    coming_soon_minutes: 'Минут',
    // 404
    error_404_title: '404',
    error_404_subtitle: 'Бұл бет табылмады',
    error_404_prompt: 'Сіз осында қалып, демалуға немесе басты бетке оралуға болады.',
    error_404_button: 'БАСТЫ БЕТКЕ',
    // Тех. работы
    maintenance_title: 'Тех. ақаулар',
    maintenance_prompt: 'Біздің веб-сайт техникалық қызмет көрсетілуде. Жақында арада жөндейміз.',
    maintenance_apology: 'Қолайсыздықтар үшін кешірім сұраймыз! :)',
  },
  ru: {
    // Навигация
    nav_about: 'О нас',
    nav_contact: 'Контакты',
    nav_development: 'Развитие',
    nav_login: 'ВОЙТИ',
    nav_register: 'РЕГИСТРАЦИЯ',
    // Подвал
    footer_company: 'КОМПАНИЯ',
    footer_services: 'УСЛУГИ',
    footer_service1: 'Автоматический подсчет баллов',
    footer_service2: 'Формирование списка грантов и платных мест',
    footer_service3: 'Загрузка и проверка аттестатов',
    footer_copyright: '© Smart admission 2025',
    // Страница входа
    login_welcome: 'Добро пожаловать',
    login_prompt: 'Войдите, чтобы продолжить',
    login_title: 'Вход',
    login_email_placeholder: 'Почта',
    login_password_placeholder: 'Пароль',
    login_remember_me: 'Запомнить меня',
    login_forgot_password: 'Забыли пароль?',
    login_button: 'ПРОДОЛЖИТЬ',
    // Страница регистрации
    register_welcome: 'Рады знакомству :)',
    register_prompt: 'Зарегистрируйтесь, чтобы перейти на следующую страницу',
    register_title: 'Регистрация',
    register_name_placeholder: 'Имя',
    register_password_confirm_placeholder: 'Повторите пароль',
    register_button: 'ПРОДОЛЖИТЬ',
    // Страница контактов
    contact_title: 'Свяжитесь с нами',
    contact_prompt: 'Если у вас есть вопросы или предложения, свяжитесь с нами. Мы будем рады вам помочь!',
    contact_name_placeholder: 'Ваше имя *',
    contact_email_placeholder: 'Ваша почта *',
    contact_phone_placeholder: 'Ваш контактный номер',
    contact_role_placeholder: 'Ваша роль (учитель или студент)?',
    contact_message_placeholder: 'Напишите ваше сообщение здесь',
    contact_button: 'ОТПРАВИТЬ СООБЩЕНИЕ',
    contact_info_title: 'Наши контакты',
     // Страница "О нас"
    about_title: 'О Нашем Проекте',
    about_p1: 'Smart Admission — это современная веб-система, предназначенная для автоматизации и оптимизации процесса приема абитуриентов.',
    about_p2: 'Наша цель – сделать процесс поступления максимально прозрачным, удобным и справедливым как для абитуриентов, так и для сотрудников приемной комиссии. Система автоматически подсчитывает средний балл аттестатов, ранжирует студентов по рейтингу и распределяет их на грантовые и платные места.',
    about_p3: 'Мы стремимся сократить ручной труд, уменьшить количество ошибок и сэкономить время для всех участников процесса.',
    // Страница "Развитие" (Скоро...)
    coming_soon_title: 'СКОРО...',
    coming_soon_prompt: 'Этот раздел в разработке. Оставьте свою почту, чтобы быть в курсе новостей.',
    coming_soon_button: 'УВЕДОМИТЬ МЕНЯ',
    coming_soon_months: 'Месяцев',
    coming_soon_days: 'Дней',
    coming_soon_hours: 'Часов',
    coming_soon_minutes: 'Минут',
    // 404
    error_404_title: '404',
    error_404_subtitle: 'Эта страница не найдена',
    error_404_prompt: 'Вы можете остаться здесь, отдохнуть или вернуться на главную страницу.',
    error_404_button: 'НА ГЛАВНУЮ',
    // Тех. работы
    maintenance_title: 'Тех. работы',
    maintenance_prompt: 'Наш сайт находится на техническом обслуживании. Мы скоро все исправим.',
    maintenance_apology: 'Приносим извинения за неудобства! :)',
  }
};


// --- Компоненты страниц ---

const LoginPage = ({ t, setCurrentPage }) => (
  <div className="auth-page page-enter">
    <div className="auth-container">
      <div className="auth-panel left-panel">
        <div className="panel-content">
          <h1>{t('login_welcome')}</h1>
          <p>{t('login_prompt')}</p>
          <ArrowRight className="arrow-icon" />
        </div>
      </div>
      <div className="auth-panel right-panel">
        <form className="auth-form">
          <h2>{t('login_title')}</h2>
          <input type="email" placeholder={t('login_email_placeholder')} />
          <input type="password" placeholder={t('login_password_placeholder')} />
          <div className="form-options">
            <label><input type="checkbox" /> {t('login_remember_me')}</label>
            <a href="#" onClick={(e) => e.preventDefault()}>{t('login_forgot_password')}</a>
          </div>
          <button type="submit">{t('login_button')}</button>
        </form>
      </div>
    </div>
  </div>
);

const RegisterPage = ({ t, setCurrentPage }) => (
    <div className="auth-page page-enter">
      <div className="auth-container">
        <div className="auth-panel left-panel register-panel">
          <div className="panel-content">
            <h1>{t('register_welcome')}</h1>
            <p>{t('register_prompt')}</p>
            <ArrowRight className="arrow-icon" />
          </div>
        </div>
        <div className="auth-panel right-panel">
          <form className="auth-form">
            <h2>{t('register_title')}</h2>
            <input type="text" placeholder={t('register_name_placeholder')} />
            <input type="email" placeholder={t('login_email_placeholder')} />
            <input type="password" placeholder={t('login_password_placeholder')} />
            <input type="password" placeholder={t('register_password_confirm_placeholder')} />
            {/* УБРАЛИ УСЛОВИЯ */}
            <div style={{marginBottom: '25px'}}></div>
            <button type="submit">{t('register_button')}</button>
          </form>
        </div>
      </div>
    </div>
  );

const ContactPage = ({ t, setCurrentPage }) => (
    <div className="contact-page page-enter">
        <div className="contact-container">
            <div className="contact-form-card">
                <h2>{t('contact_title')}</h2>
                <p>{t('contact_prompt')}</p>
                <form>
                    <input type="text" placeholder={t('contact_name_placeholder')} required />
                    <input type="email" placeholder={t('contact_email_placeholder')} required />
                    <input type="tel" placeholder={t('contact_phone_placeholder')} defaultValue="+7 776 888 30 07" />
                    <input type="text" placeholder={t('contact_role_placeholder')} />
                    <textarea placeholder={t('contact_message_placeholder')} rows="4"></textarea>
                    {/* УБРАЛИ УСЛОВИЯ */}
                    <button type="submit">{t('contact_button')}</button>
                </form>
            </div>
            <div className="contact-info">
                <h3>{t('contact_info_title')}</h3>
                <div className="info-item">
                    <Phone size={20} />
                    <span>+ 776-888-30-07</span>
                </div>
                <div className="info-item">
                    <Mail size={20} />
                    <span>seriksisembaev@gmail.com</span>
                </div>
                <div className="info-item">
                    <MapPin size={20} />
                    <span>Astana, Mangilik El C1</span>
                </div>
            </div>
        </div>
    </div>
);

// НОВАЯ СТРАНИЦА "О НАС"
const AboutPage = ({ t }) => (
    <div className="utility-page page-enter about-page">
        <h1>{t('about_title')}</h1>
        <p>{t('about_p1')}</p>
        <p>{t('about_p2')}</p>
        <p>{t('about_p3')}</p>
    </div>
);


const ComingSoonPage = ({ t }) => (
    <div className="utility-page page-enter">
        <div className="timer-box">
            <div className="time-segment"><span>2</span>{t('coming_soon_months')}</div>
            <div className="time-colon">:</div>
            <div className="time-segment"><span>12</span>{t('coming_soon_days')}</div>
            <div className="time-colon">:</div>
            <div className="time-segment"><span>40</span>{t('coming_soon_hours')}</div>
             <div className="time-colon">:</div>
            <div className="time-segment"><span>11</span>{t('coming_soon_minutes')}</div>
        </div>
        <h1>{t('coming_soon_title')}</h1>
        <p>{t('coming_soon_prompt')}</p>
        <form className="subscribe-form">
            <input type="email" placeholder={t('login_email_placeholder')} />
            <button type="submit">{t('coming_soon_button')}</button>
        </form>
    </div>
);

const ErrorPage = ({ t, setCurrentPage }) => (
    <div className="utility-page page-enter">
        <div className="error-content">
            <div className="error-robot">🤖</div>
            <div className="error-text">
                <h1>{t('error_404_title')}</h1>
                <h2>{t('error_404_subtitle')}</h2>
                <p>{t('error_404_prompt')}</p>
                <button onClick={() => setCurrentPage('login')}>{t('error_404_button')}</button>
            </div>
        </div>
    </div>
);

const MaintenancePage = ({ t }) => (
    <div className="utility-page page-enter">
        <div className="maintenance-icons">
            <Settings className="icon-main" size={80} />
            <Wrench className="icon-sub" size={40} />
            <AlertTriangle className="icon-sub" size={30} />
        </div>
        <h1>{t('maintenance_title')}</h1>
        <p>{t('maintenance_prompt')}<br/>{t('maintenance_apology')}</p>
    </div>
);


// --- Основной компонент приложения ---

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isExiting, setIsExiting] = useState(false);
  const [language, setLanguage] = useState('kz'); // 'kz' или 'ru'

  // Функция для получения текста
  const t = (key) => translations[language][key] || key;

  const navigateTo = (page) => {
    setIsExiting(true);
    setTimeout(() => {
        setCurrentPage(page);
        setIsExiting(false);
    }, 400); // Соответствует времени анимации
  };

  const renderPage = () => {
    const pageClassName = isExiting ? "page-exit" : "";

    // Обертка для анимации
    const wrapPage = (Component) => <div className={pageClassName}>{Component}</div>;

    switch (currentPage) {
      case 'login':
        return wrapPage(<LoginPage t={t} setCurrentPage={navigateTo} />);
      case 'register':
        return wrapPage(<RegisterPage t={t} setCurrentPage={navigateTo} />);
      case 'contact':
        return wrapPage(<ContactPage t={t} setCurrentPage={navigateTo} />);
      case 'development':
         return wrapPage(<ComingSoonPage t={t} />);
      case 'about':
         return wrapPage(<AboutPage t={t} />); // ИЗМЕНЕНО
      case 'error':
         return wrapPage(<ErrorPage t={t} setCurrentPage={navigateTo} />);
      case 'maintenance':
         return wrapPage(<MaintenancePage t={t} />);
      default:
        return wrapPage(<LoginPage t={t} setCurrentPage={navigateTo} />);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="background-shapes">
        <div className="shape1"></div>
        <div className="shape2"></div>
        <div className="shape3"></div>
      </div>

      <header className="app-header">
        <nav className="main-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className={currentPage === 'about' ? 'active' : ''}>{t('nav_about')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className={currentPage === 'contact' ? 'active' : ''}>{t('nav_contact')}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('development'); }} className={currentPage === 'development' ? 'active' : ''}>{t('nav_development')}</a>
        </nav>
        <div className="auth-nav">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('login'); }}>{t('nav_login')}</a>
          <button onClick={() => navigateTo('register')} className="register-btn">{t('nav_register')}</button>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('maintenance'); }} className="settings-btn"><Settings /></a>
        </div>
      </header>

      <main className="app-main">
        {renderPage()}
      </main>

      <footer className="app-footer">
        <div className="footer-column">
          <h4>{t('footer_company')}</h4>
          <a href="#">{t('nav_about')}</a>
          <a href="#">Неге біз? / Почему мы?</a>
          <a href="#">Пайдаланушыға / Пользователю</a>
          <a href="#">Бизнеске / Бизнесу</a>
        </div>
        <div className="footer-column">
          <h4>{t('footer_services')}</h4>
          <a href="#">{t('footer_service1')}</a>
          <a href="#">{t('footer_service2')}</a>
          <a href="#">{t('footer_service3')}</a>
        </div>
        <div className="footer-column footer-right">
            <p>{t('footer_copyright')}</p>
             <select className="lang-switcher" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="kz">Қазақша - kz</option>
                <option value="ru">Русский - ru</option>
            </select>
        </div>
      </footer>
    </div>
  );
}

export default App;

