import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Settings, Phone, Mail, MapPin, Wrench, AlertTriangle, Package, ArrowRight,
    UserCircle2, User, Briefcase, ChevronDown, LogOut, LayoutDashboard, Calculator, FileText, PlusCircle, Trash2
} from 'lucide-react';
import './App.css';

// --- СЛОВАРЬ ДЛЯ ПЕРЕВОДОВ ---
const translations = {
    kz: {
        nav_about: "Біз туралы",
        nav_contact: "Байланыс",
        nav_development: "Дамыту",
        nav_dashboard: "Жеке кабинет",
        nav_calculator: "Грант калькуляторы",
        nav_apply: "Өтінім беру",
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
        your_role_placeholder: "Сіздің рөліңізді таңдаңыз",
        role_student: "Студент",
        role_teacher: "Мұғалім",
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
        dashboard_title: "Жеке кабинет",
        dashboard_greeting: "Сәлем",
        dashboard_info: "Немен айналысқыңыз келеді?",
        dashboard_card_calculator_title: "Грант калькуляторы",
        dashboard_card_calculator_text: "Бағаларыңызды енгізіп, грантқа түсу мүмкіндігіңізді алдын ала бағалаңыз.",
        dashboard_card_apply_title: "Өтінім беру",
        dashboard_card_apply_text: "Ресми өтінім беру үшін толық ақпаратты толтырып, аттестатыңызды жүктеңіз.",
        calculator_title: "Грант калькуляторы",
        calculator_intro: "Негізгі пәндер бойынша бағаларыңызды енгізіңіз. Жүйе сіздің орташа балыңызды есептейді.",
        calculator_priority_subjects: "Приоритетті пәндер",
        calculator_result_text: "Егер сіздің балыңыз басқа үміткерлерден жоғары болса және квота болса, сіздің мүмкіндігіңіз жоғары.",
        subject_informatics: "Информатика",
        subject_math: "Математика",
        subject_kazakh: "Қазақ тілі",
        subject_russian: "Орыс тілі",
        subject_history: "Қазақстан тарихы",
        calculate_button: "Есептеу",
        your_avg_score: "Сіздің орташа балыңыз",
        apply_title: "Ресми өтінім беру",
        apply_intro: "Барлық мәліметтерді мұқият толтырыңыз және қажетті құжаттарды жүктеңіз.",
        apply_lastname: "Тегі",
        apply_firstname: "Аты",
        apply_patronymic: "Әкесінің аты",
        apply_iin: "ЖСН (ИИН)",
        apply_language: "Оқу тілі",
        apply_application_type: "Өтінім түрі",
        apply_grant: "Грант",
        apply_paid: "Ақылы",
        apply_has_quota: "Менде квота бар",
        apply_grades: "Пәндер бойынша бағалар",
        apply_add_subject: "Пән қосу",
        apply_subject_name: "Пән атауы",
        apply_grade: "Баға",
        apply_certificate_upload: "Аттестатты жүктеу (PDF)",
        apply_quota_upload: "Квотаны растайтын құжаттар (PDF)",
        apply_add_quota_doc: "Квота құжатын қосу",
        apply_submit_button: "ӨТІНІМДІ ЖІБЕРУ",
        iin_error_length: "ЖСН 12 саннан тұруы керек",
        iin_error_format: "ЖСН тек сандардан тұруы керек",
    },
    ru: {
        nav_about: "О нас",
        nav_contact: "Контакты",
        nav_development: "Развитие",
        nav_dashboard: "Личный кабинет",
        nav_calculator: "Калькулятор гранта",
        nav_apply: "Подать заявку",
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
        your_role_placeholder: "Выберите вашу роль",
        role_student: "Студент",
        role_teacher: "Учитель",
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
        dashboard_title: "Личный кабинет",
        dashboard_greeting: "Привет",
        dashboard_info: "Чем бы вы хотели заняться?",
        dashboard_card_calculator_title: "Калькулятор гранта",
        dashboard_card_calculator_text: "Введите свои оценки и предварительно оцените свои шансы на получение гранта.",
        dashboard_card_apply_title: "Подать заявку",
        dashboard_card_apply_text: "Заполните полную информацию и загрузите свой аттестат для официальной подачи заявки.",
        calculator_title: "Калькулятор гранта",
        calculator_intro: "Введите свои оценки по основным предметам. Система рассчитает ваш средний балл.",
        calculator_priority_subjects: "Приоритетные предметы",
        calculator_result_text: "Если ваш балл выше, чем у других кандидатов, и у вас есть квота, ваши шансы высоки.",
        subject_informatics: "Информатика",
        subject_math: "Математика",
        subject_kazakh: "Казахский язык",
        subject_russian: "Русский язык",
        subject_history: "История Казахстана",
        calculate_button: "Рассчитать",
        your_avg_score: "Ваш средний балл",
        apply_title: "Подача официальной заявки",
        apply_intro: "Внимательно заполните все данные и загрузите необходимые документы.",
        apply_lastname: "Фамилия",
        apply_firstname: "Имя",
        apply_patronymic: "Отчество",
        apply_iin: "ИИН",
        apply_language: "Язык обучения",
        apply_application_type: "Тип заявки",
        apply_grant: "Грант",
        apply_paid: "Платное",
        apply_has_quota: "У меня есть квота",
        apply_grades: "Оценки по предметам",
        apply_add_subject: "Добавить предмет",
        apply_subject_name: "Название предмета",
        apply_grade: "Оценка",
        apply_certificate_upload: "Загрузить аттестат (PDF)",
        apply_quota_upload: "Подтверждающие квоту документы (PDF)",
        apply_add_quota_doc: "Добавить документ для квоты",
        apply_submit_button: "ОТПРАВИТЬ ЗАЯВКУ",
        iin_error_length: "ИИН должен состоять из 12 цифр",
        iin_error_format: "ИИН должен состоять только из цифр",
    }
};

// --- КОМПОНЕНТЫ СТРАНИЦ ---

const ApplicationFormPage = ({ t }) => {
    // Персональные данные
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [iin, setIin] = useState('');
    const [iinError, setIinError] = useState('');

    // Выбор обучения
    const [language, setLanguage] = useState('kz');
    const [applicationType, setApplicationType] = useState('GRANT');
    const [hasQuota, setHasQuota] = useState(false);

    // Оценки и файлы
    const [subjects, setSubjects] = useState([]);
    const [certificate, setCertificate] = useState(null);
    const [quotaFiles, setQuotaFiles] = useState([]);

    // Автоматическое добавление предметов при смене языка
    useEffect(() => {
        const prioritySubjects = language === 'kz'
            ? [
                { name: t('subject_math'), grade: '' },
                { name: t('subject_informatics'), grade: '' },
                { name: t('subject_kazakh'), grade: '' }
            ]
            : [
                { name: t('subject_math'), grade: '' },
                { name: t('subject_informatics'), grade: '' },
                { name: t('subject_russian'), grade: '' }
            ];
        setSubjects(prioritySubjects);
    }, [language, t]);

    // Валидация ИИН
    const handleIinChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 12) {
            setIin(value);
            if (value.length > 0 && value.length < 12) {
                setIinError(t('iin_error_length'));
            } else {
                setIinError('');
            }
        } else if (value && !/^\d*$/.test(value)) {
            setIinError(t('iin_error_format'));
        }
    };

    // Функции для управления предметами
    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };
    const addSubject = () => setSubjects([...subjects, { name: '', grade: '' }]);
    const removeSubject = (index) => setSubjects(subjects.filter((_, i) => i !== index));

    // Функции для управления файлами квот
    const handleQuotaFileChange = (e) => {
        if (e.target.files[0]) {
            setQuotaFiles([...quotaFiles, e.target.files[0]]);
        }
    };
    const removeQuotaFile = (index) => setQuotaFiles(quotaFiles.filter((_, i) => i !== index));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (iin.length !== 12) {
            setIinError(t('iin_error_length'));
            alert(t('iin_error_length'));
            return;
        }

        const fullName = `${lastName} ${firstName} ${patronymic}`.trim();
        const grades = subjects.reduce((acc, {name, grade}) => {
            if(name && grade) acc[name.trim()] = parseInt(grade, 10);
            return acc;
        }, {});

        const formData = new FormData();
        formData.append('certificate', certificate);
        quotaFiles.forEach(file => {
            formData.append('quotaFiles', file); // Бэкенд должен быть готов принять массив
        });

        const enrolleeData = {
            fullName, iin,
            languageOfStudy: language,
            applicationType, hasQuota, grades
        };
        formData.append('enrollee', JSON.stringify(enrolleeData));

        try {
            await axios.post('http://localhost:8080/api/enrollees', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Өтінім сәтті жіберілді!');
        } catch (error) {
            console.error("Application submission failed:", error);
            alert('Өтінім жіберу кезінде қате пайда болды.');
        }
    };

    return (
        <div className="form-page page-enter">
            <h1>{t('apply_title')}</h1>
            <p className="subtitle">{t('apply_intro')}</p>
            <form className="form-card" onSubmit={handleSubmit}>
                {/* --- Персональные данные --- */}
                <div className="form-row">
                    <div className="input-group">
                        <label>{t('apply_lastname')}</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required/>
                    </div>
                    <div className="input-group">
                        <label>{t('apply_firstname')}</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                    </div>
                     <div className="input-group">
                        <label>{t('apply_patronymic')}</label>
                        <input type="text" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
                    </div>
                </div>
                 <div className="input-group">
                    <label>{t('apply_iin')}</label>
                    <input type="text" value={iin} onChange={handleIinChange} required/>
                    {iinError && <small className="error-message">{iinError}</small>}
                </div>

                <hr/>

                {/* --- Выбор обучения --- */}
                <div className="form-row">
                    <div className="input-group">
                        <label>{t('apply_language')}</label>
                        <select value={language} onChange={e => setLanguage(e.target.value)}>
                            <option value="kz">Қазақ</option>
                            <option value="ru">Русский</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>{t('apply_application_type')}</label>
                        <select value={applicationType} onChange={e => setApplicationType(e.target.value)}>
                            <option value="GRANT">{t('apply_grant')}</option>
                            <option value="PAID">{t('apply_paid')}</option>
                        </select>
                    </div>
                </div>
                <div className="form-options">
                    <label>
                        <input type="checkbox" checked={hasQuota} onChange={e => setHasQuota(e.target.checked)} />
                        {t('apply_has_quota')}
                    </label>
                </div>

                <hr/>

                {/* --- Оценки --- */}
                <h3>{t('apply_grades')}</h3>
                {subjects.map((subject, index) => (
                    <div className="subject-grade-row" key={index}>
                        <input type="text" placeholder={t('apply_subject_name')} value={subject.name} onChange={e => handleSubjectChange(index, 'name', e.target.value)} readOnly={index < 3} />
                        <input type="number" min="0" max="5" placeholder={t('apply_grade')} value={subject.grade} onChange={e => handleSubjectChange(index, 'grade', e.target.value)} />
                        {index >= 3 && <button type="button" onClick={() => removeSubject(index)} className="remove-btn"><Trash2 size={16}/></button>}
                    </div>
                ))}
                <button type="button" onClick={addSubject} className="secondary-button">
                    <PlusCircle size={16}/> {t('apply_add_subject')}
                </button>

                <hr/>

                {/* --- Файлы --- */}
                <div className="input-group">
                    <label>{t('apply_certificate_upload')}</label>
                    <input type="file" accept=".pdf" onChange={e => setCertificate(e.target.files[0])} required/>
                </div>
                {hasQuota && (
                    <div className="input-group">
                        <label>{t('apply_quota_upload')}</label>
                        {quotaFiles.map((file, index) => (
                             <div className="file-chip" key={index}>
                                <span>{file.name}</span>
                                <button type="button" onClick={() => removeQuotaFile(index)}>&times;</button>
                             </div>
                        ))}
                        <label className="secondary-button file-add-button">
                             <PlusCircle size={16}/> {t('apply_add_quota_doc')}
                            <input type="file" accept=".pdf" onChange={handleQuotaFileChange} style={{ display: 'none' }} />
                        </label>
                    </div>
                )}

                <button type="submit">{t('apply_submit_button')}</button>
            </form>
        </div>
    );
};

// --- Dummy components to avoid breaking the App ---
const DummyPage = ({ name }) => <div className="form-page page-enter"><h1>{name} Page</h1></div>;
const LoginPage = ({ t, navigateTo }) => <DummyPage name="Login"/>;
const RegisterPage = ({ t, navigateTo }) => <DummyPage name="Register"/>;
const AboutPage = ({ t }) => <DummyPage name="About"/>;
const ContactPage = ({ t }) => <DummyPage name="Contact"/>;
const DevelopmentPage = ({ t }) => <DummyPage name="Development"/>;
const ErrorPage = ({ t, navigateTo }) => <DummyPage name="Error"/>;
const MaintenancePage = ({ t }) => <DummyPage name="Maintenance"/>;
const DashboardPage = ({ t, user, navigateTo }) => <DummyPage name="Dashboard"/>;
const GrantCalculatorPage = ({ t }) => <DummyPage name="Calculator"/>;


function App() {
  const [language, setLanguage] = useState('kz');
  const [currentPage, setCurrentPage] = useState('apply'); // Start on the application form page for testing
  const [user, setUser] = useState({ name: 'Test User' }); // Mock user for testing
  const [isExiting, setIsExiting] = useState(false);

  const t = (key) => (translations[language] && translations[language][key]) || translations.kz[key] || key;

  const navigateTo = (page, data = null) => {
    if (currentPage === page) return;
    setIsExiting(true);
    setTimeout(() => {
        setCurrentPage(page);
        if (data) setUser(data);
        setIsExiting(false);
    }, 400);
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('login');
  }

  const renderPage = () => {
    const pageClassName = isExiting ? "page-exit" : "";
    const wrapPage = (Component) => <div className={pageClassName}>{Component}</div>;

    // For this example, we always show the application form
    return wrapPage(<ApplicationFormPage t={t} />);
  };

  return (
    <div className="app-wrapper">
        <div className="background-shapes">
            <div className="shape1"></div>
            <div className="shape2"></div>
            <div className="shape3"></div>
        </div>
      <main className="app-main" style={{alignItems: 'flex-start', paddingTop: '50px'}}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;

