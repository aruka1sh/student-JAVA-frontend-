import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Убедитесь, что axios установлен (npm install axios)
import { Settings, Phone, Mail, MapPin, Wrench, AlertTriangle, Package, ArrowRight, UserCircle2 } from 'lucide-react';
import './App.css';

// --- СЛОВАРЬ ДЛЯ ПЕРЕВОДОВ ---
const translations = {
    kz: {
        nav_about: "Біз туралы",
        nav_contact: "Байланыс",
        nav_development: "Дамыту",
        login_button: "КІРУ",
        register_button: "ТІРКЕЛУ",
        login_welcome: "Қош келдіңіз",
        login_prompt: "Жалғастыру үшін жүйеге кіріңіз",
        login_form_title: "Кіру",
        email_placeholder: "Пошта",
        password_placeholder: "Құпия сөз",
        remember_me: "Есте сақтау",
        forgot_password: "Құпия сөздi ұмыттыңыз ба?",
        continue_button: "ЖАЛҒАСТЫРУ",
        register_welcome: "Танысқаныма қуаныштымын :)",
        register_prompt: "Келесі бетке өту үшін тіркеліңіз",
        register_form_title: "Тіркелу",
        name_placeholder: "Атыңыз",
        contact_title: "Бізбен байланыс",
        contact_subtitle: "Егер сізде сұрақтар немесе ұсыныстар болса, бізге хабарласыңыз.",
        your_name_placeholder: "Сіздің атыңыз *",
        your_email_placeholder: "Сіздің поштаңыз *",
        your_phone_placeholder: "Сіздің байланыс нөміріңіз",
        your_role_placeholder: "Сіздің рөліңіз (мұғалім немесе студент)?",
        message_placeholder: "Хабарламаңызды осында жазыңыз",
        send_message_button: "ХАБАРЛАМА ЖІБЕРУ",
        contact_info_title: "Біздің байланыстар",
        dev_title: "ДАМУ ЖОЛЫНДА...",
        dev_subtitle: "Бұл бет қазіргі уақытта белсенді даму үстінде. Жақында жаңа жаңартулармен ораламыз!",
        about_title: "Smart Admission туралы",
        about_p1: "Smart Admission — бұл оқуға қабылдау процесін жеңілдетуге және автоматтандыруға арналған заманауи веб-жүйе.",
        about_p2: "Жүйе орташа баллды автоматты түрде есептейді, талапкерлерді рейтинг бойынша орналастырады және грант пен ақылы орындарға бөлуді жүзеге асырады.",
        error_title: "404",
        error_subtitle: "Бұл бет табылмады",
        error_text: "Сіз осында қалып, демалуға немесе басты бетке оралуға болады.",
        error_button: "БАСТЫ БЕТКЕ",
        maintenance_title: "Тех. ақаулар",
        maintenance_text: "Біздің веб-сайт техникалық қызмет көрсетілуде. Жақында арада жөндейміз.\nҚолайсыздықтар үшін кешірім сұраймыз! :)",
        logout_button: "Шығу",
        dashboard_greeting: "жеке кабинетіңіз",
        dashboard_info: "Жақында мұнда жаңа функциялар пайда болады.",
    },
    ru: {
        nav_about: "О нас",
        nav_contact: "Контакты",
        nav_development: "Развитие",
        login_button: "ВОЙТИ",
        register_button: "РЕГИСТРАЦИЯ",
        login_welcome: "Добро пожаловать",
        login_prompt: "Войдите в систему, чтобы продолжить",
        login_form_title: "Вход",
        email_placeholder: "Почта",
        password_placeholder: "Пароль",
        remember_me: "Запомнить меня",
        forgot_password: "Забыли пароль?",
        continue_button: "ПРОДОЛЖИТЬ",
        register_welcome: "Рады знакомству :)",
        register_prompt: "Зарегистрируйтесь, чтобы перейти на следующую страницу",
        register_form_title: "Регистрация",
        name_placeholder: "Ваше имя",
        contact_title: "Свяжитесь с нами",
        contact_subtitle: "Если у вас есть вопросы или предложения, свяжитесь с нами.",
        your_name_placeholder: "Ваше имя *",
        your_email_placeholder: "Ваша почта *",
        your_phone_placeholder: "Ваш контактный номер",
        your_role_placeholder: "Ваша роль (учитель или студент)?",
        message_placeholder: "Напишите ваше сообщение здесь",
        send_message_button: "ОТПРАВИТЬ СООБЩЕНИЕ",
        contact_info_title: "Наши контакты",
        dev_title: "В ПРОЦЕССЕ РАЗРАБОТКИ...",
        dev_subtitle: "Эта страница в настоящее время находится в активной разработке. Скоро вернемся с новыми обновлениями!",
        about_title: "О Smart Admission",
        about_p1: "Smart Admission — это современная веб-система, предназначенная для упрощения и автоматизации процесса приема в учебные заведения.",
        about_p2: "Система автоматически рассчитывает средний балл, ранжирует абитуриентов и осуществляет распределение на гранты и платные места.",
        error_title: "404",
        error_subtitle: "Эта страница не найдена",
        error_text: "Вы можете остаться здесь, отдохнуть или вернуться на главную страницу.",
        error_button: "НА ГЛАВНУЮ",
        maintenance_title: "Тех. работы",
        maintenance_text: "Наш сайт находится на техническом обслуживании. Мы скоро вернемся.\nПриносим извинения за неудобства! :)",
        logout_button: "Выйти",
        dashboard_greeting: "личный кабинет",
        dashboard_info: "Скоро здесь появятся новые функции.",
    }
};

// --- Компоненты страниц ---

const LoginPage = ({ t, navigateTo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            alert(`${t('login_welcome')}, ${response.data.name}!`);
            navigateTo('dashboard', response.data);
        } catch (error) {
            alert(`Қате: ${error.response ? error.response.data.message : 'Сервер қатесі'}`);
        }
    };

    return (
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
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <h2>{t('login_form_title')}</h2>
                        <input type="email" placeholder={t('email_placeholder')} value={email} onChange={e => setEmail(e.target.value)} required />
                        <input type="password" placeholder={t('password_placeholder')} value={password} onChange={e => setPassword(e.target.value)} required />
                        <div className="form-options">
                            <label><input type="checkbox" /> {t('remember_me')}</label>
                            <a href="#" onClick={(e) => e.preventDefault()}>{t('forgot_password')}</a>
                        </div>
                        <button type="submit">{t('continue_button')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const RegisterPage = ({ t, navigateTo }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/register', { name, email, password });
            alert('Тіркелу сәтті аяқталды! Енді жүйеге кіре аласыз.');
            navigateTo('login');
        } catch (error) {
            alert(`Тіркелу қатесі: ${error.response ? error.response.data.message : 'Сервер жауап бермеді'}`);
        }
    };

    return (
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
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <h2>{t('register_form_title')}</h2>
                        <input type="text" placeholder={t('name_placeholder')} value={name} onChange={e => setName(e.target.value)} required />
                        <input type="email" placeholder={t('email_placeholder')} value={email} onChange={e => setEmail(e.target.value)} required />
                        <input type="password" placeholder={t('password_placeholder')} value={password} onChange={e => setPassword(e.target.value)} required />
                        <button type="submit">{t('continue_button')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const AboutPage = ({ t }) => (
    <div className="utility-page page-enter about-page">
        <h1>{t('about_title')}</h1>
        <p>{t('about_p1')}</p>
        <p>{t('about_p2')}</p>
    </div>
);

const ContactPage = ({ t }) => (
    <div className="contact-page page-enter">
        <div className="contact-container">
            <div className="contact-form-card">
                <h2>{t('contact_title')}</h2>
                <p>{t('contact_subtitle')}</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder={t('your_name_placeholder')} required />
                    <input type="email" placeholder={t('your_email_placeholder')} required />
                    <input type="tel" placeholder={t('your_phone_placeholder')} />
                    <input type="text" placeholder={t('your_role_placeholder')} />
                    <textarea placeholder={t('message_placeholder')} rows="4"></textarea>
                    <button type="submit">{t('send_message_button')}</button>
                </form>
            </div>
            <div className="contact-info">
                <h3>{t('contact_info_title')}</h3>
                <div className="info-item"><Phone size={20} /><span>+ 776-888-30-07</span></div>
                <div className="info-item"><Mail size={20} /><span>seriksisembaev@gmail.com</span></div>
                <div className="info-item"><MapPin size={20} /><span>Astana, Mangilik El C1</span></div>
            </div>
        </div>
    </div>
);

const DevelopmentPage = ({ t }) => (
    <div className="utility-page page-enter">
        <Package size={80} className="dev-icon" />
        <h1>{t('dev_title')}</h1>
        <p>{t('dev_subtitle')}</p>
    </div>
);

const ErrorPage = ({ t, navigateTo }) => (
    <div className="utility-page page-enter">
        <div className="error-content">
            <div className="error-robot">🤖</div>
            <div className="error-text">
                <h1>{t('error_title')}</h1>
                <h2>{t('error_subtitle')}</h2>
                <p>{t('error_text')}</p>
                <button onClick={() => navigateTo('login')}>{t('error_button')}</button>
            </div>
        </div>
    </div>
);

const MaintenancePage = ({ t }) => (
    <div className="utility-page page-enter">
        <div className="maintenance-icons">
            <Wrench className="icon-main" size={80} />
            <AlertTriangle className="icon-sub" size={30} />
        </div>
        <h1>{t('maintenance_title')}</h1>
        <p style={{ whiteSpace: 'pre-line' }}>{t('maintenance_text')}</p>
    </div>
);

const DashboardPage = ({ t, user, navigateTo }) => {
    // ИСПРАВЛЕНИЕ: Хук вызывается на верхнем уровне
    useEffect(() => {
        if (!user) {
            // Если пользователь не вошел, перенаправляем на логин
            navigateTo('login');
        }
    }, [user, navigateTo]);

    // Пока происходит редирект, ничего не отображаем
    if (!user) {
        return null;
    }

    return (
        <div className="dashboard-page page-enter">
            <h1>{t('login_welcome')}, {user.name}!</h1>
            <p>Бұл сіздің {t('dashboard_greeting')}. {t('dashboard_info')}</p>
        </div>
    );
};


// --- Основной компонент приложения ---
function App() {
  const [language, setLanguage] = useState('kz');
  const [currentPage, setCurrentPage] = useState('register');
  const [pageData, setPageData] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const t = (key) => translations[language]?.[key] || key;

  const navigateTo = (page, data = null) => {
    if (currentPage === page) return;
    setIsExiting(true);
    setTimeout(() => {
        setCurrentPage(page);
        setPageData(data);
        setIsExiting(false);
    }, 400);
  };

  const handleLogout = () => {
    setPageData(null);
    navigateTo('login');
  }

  const renderPage = () => {
    const pageClassName = isExiting ? "page-exit" : "";
    const wrapPage = (Component) => <div className={pageClassName}>{Component}</div>;

    switch (currentPage) {
      case 'login': return wrapPage(<LoginPage t={t} navigateTo={navigateTo} />);
      case 'register': return wrapPage(<RegisterPage t={t} navigateTo={navigateTo} />);
      case 'dashboard': return wrapPage(<DashboardPage t={t} user={pageData} navigateTo={navigateTo}/>);
      case 'about': return wrapPage(<AboutPage t={t} />);
      case 'contact': return wrapPage(<ContactPage t={t} />);
      case 'development': return wrapPage(<DevelopmentPage t={t} />);
      case 'maintenance': return wrapPage(<MaintenancePage t={t} />);
      case 'error': return wrapPage(<ErrorPage t={t} navigateTo={navigateTo} />);
      default: return wrapPage(<RegisterPage t={t} navigateTo={navigateTo} />);
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
                {pageData ? (
                    <>
                        <span className="user-greeting"><UserCircle2 size={20}/> {pageData.name}</span>
                        <button onClick={handleLogout} className="logout-btn">{t('logout_button')}</button>
                    </>
                ) : (
                    <>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('login'); }}>{t('login_button')}</a>
                        <button onClick={() => navigateTo('register')} className="register-btn">{t('register_button')}</button>
                    </>
                )}
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('maintenance'); }} className="settings-btn"><Settings /></a>
            </div>
        </header>

        <main className="app-main">
            {renderPage()}
        </main>

        <footer className="app-footer">
            {/* ... */}
            <select className="lang-switcher" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="kz">Қазақша - kz</option>
                <option value="ru">Русский - ru</option>
            </select>
        </footer>
    </div>
  );
}

export default App;

