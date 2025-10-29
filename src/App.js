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

const LoginPage = ({ t, navigateTo }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            navigateTo('dashboard', response.data);
        } catch (error) {
            alert(`Ошибка: ${error.response ? error.response.data.message : 'Ошибка сервера'}`);
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
                        <div className="input-group">
                           <Mail size={20} />
                           <input type="email" placeholder={t('email_placeholder')} value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                           <Wrench size={20} />
                           <input type="password" placeholder={t('password_placeholder')} value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
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
            alert('Регистрация прошла успешно! Теперь вы можете войти.');
            navigateTo('login');
        } catch (error) {
            alert(`Ошибка регистрации: ${error.response ? error.response.data.message : 'Сервер не отвечает'}`);
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
                         <div className="input-group">
                           <User size={20} />
                           <input type="text" placeholder={t('name_placeholder')} value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                         <div className="input-group">
                           <Mail size={20} />
                           <input type="email" placeholder={t('email_placeholder')} value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                         <div className="input-group">
                           <Wrench size={20} />
                           <input type="password" placeholder={t('password_placeholder')} value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
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

const ContactPage = ({ t }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/contact', formData);
            alert('Сообщение успешно отправлено!');
            setFormData({ name: '', email: '', phone: '', role: '', message: '' });
        } catch (error) {
            alert('Ошибка при отправке сообщения.');
        }
    };

    return (
      <div className="contact-page page-enter">
        <div className="contact-container">
          <div className="contact-form-card">
            <h2>{t('contact_title')}</h2>
            <p>{t('contact_subtitle')}</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <User size={20}/>
                <input type="text" name="name" placeholder={t('your_name_placeholder')} value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <Mail size={20}/>
                <input type="email" name="email" placeholder={t('your_email_placeholder')} value={formData.email} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <Phone size={20}/>
                <input type="tel" name="phone" placeholder={t('your_phone_placeholder')} value={formData.phone} onChange={handleChange} />
              </div>
              <div className="input-group">
                <Briefcase size={20}/>
                <input type="text" name="role" placeholder={t('your_role_placeholder')} value={formData.role} onChange={handleChange} />
              </div>
              <div className="input-group">
                <textarea name="message" placeholder={t('message_placeholder')} rows="4" value={formData.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit">{t('send_message_button')}</button>
            </form>
          </div>
          <div className="contact-info-map">
            <h3>{t('contact_info_title')}</h3>
            <div className="info-item"><Phone size={20} /><span>+ 776-888-30-07</span></div>
            <div className="info-item"><Mail size={20} /><span>seriksisembaev@gmail.com</span></div>
            <div className="info-item"><MapPin size={20} /><span>Astana, Mangilik El C1</span></div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2505.954332386109!2d71.4162818158402!3d51.0903248795689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585a60583195d%3A0x86e675285789433!2sAstana%20IT%20University!5e0!3m2!1sen!2skz!4v1668583842883!5m2!1sen!2skz"
                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Astana IT University Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
};

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
    return (
        <div className="dashboard-page page-enter">
            <h1>{t('dashboard_greeting')}, {user?.name}!</h1>
            <p className="subtitle">{t('dashboard_info')}</p>
            <div className="dashboard-cards">
                <div className="dashboard-card" onClick={() => navigateTo('calculator')}>
                    <div className="card-icon"><Calculator size={32}/></div>
                    <h3>{t('dashboard_card_calculator_title')}</h3>
                    <p>{t('dashboard_card_calculator_text')}</p>
                </div>
                <div className="dashboard-card" onClick={() => navigateTo('apply')}>
                    <div className="card-icon"><FileText size={32}/></div>
                    <h3>{t('dashboard_card_apply_title')}</h3>
                    <p>{t('dashboard_card_apply_text')}</p>
                </div>
            </div>
        </div>
    );
};

const GrantCalculatorPage = ({ t }) => {
    const [grades, setGrades] = useState({ math: '', physics: '', kazakh: '', russian: '', history: '' });
    const [average, setAverage] = useState(null);

    const handleGradeChange = (subject, value) => {
        const numValue = value === '' ? '' : Math.max(0, Math.min(5, Number(value)));
        setGrades(prev => ({ ...prev, [subject]: numValue }));
    };

    const calculateAverage = () => {
        const gradeValues = Object.values(grades).map(Number).filter(g => g > 0);
        if (gradeValues.length === 0) {
            setAverage(0);
            return;
        }
        const sum = gradeValues.reduce((acc, curr) => acc + curr, 0);
        setAverage((sum / gradeValues.length).toFixed(2));
    };

    return (
        <div className="form-page page-enter">
            <h1>{t('calculator_title')}</h1>
            <p className="subtitle">{t('calculator_intro')}</p>
            <div className="form-card">
                <div className="grade-inputs">
                    {Object.keys(grades).map(subject => (
                        <div className="input-group" key={subject}>
                            <label>{t(`subject_${subject}`)}</label>
                            <input type="number" min="0" max="5" value={grades[subject]} onChange={e => handleGradeChange(subject, e.target.value)} />
                        </div>
                    ))}
                </div>
                <button onClick={calculateAverage}>{t('calculate_button')}</button>
                {average !== null && (
                    <div className="result-box">
                        <h3>{t('your_avg_score')}:</h3>
                        <p>{average}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

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

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };
    const addSubject = () => setSubjects([...subjects, { name: '', grade: '' }]);
    const removeSubject = (index) => setSubjects(subjects.filter((_, i) => i !== index));

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
            formData.append('quotaFiles', file);
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
                <div className="form-row form-row-cols-3">
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

                <div className="form-row form-row-cols-2">
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


function App() {
  const [language, setLanguage] = useState('kz');
  const [currentPage, setCurrentPage] = useState('register');
  const [user, setUser] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const t = (key) => (translations[language] && translations[language][key]) || translations.kz[key] || key;

  const navigateTo = (page, data = null) => {
    if (currentPage === page && page !== 'dashboard') return;
    setIsExiting(true);
    setTimeout(() => {
        setCurrentPage(page);
        if (page === 'login' || page === 'register') setUser(null);
        else if(data) setUser(data);
        setIsExiting(false);
    }, 400);
  };

  const handleLogout = () => {
    setUser(null);
    navigateTo('login');
  }

  useEffect(() => {
    const loggedInPages = ['dashboard', 'calculator', 'apply'];
    if (user && !loggedInPages.includes(currentPage)) {
      navigateTo('dashboard');
    }
  }, [currentPage, user, navigateTo]);


  const renderPage = () => {
    const pageClassName = isExiting ? "page-exit" : "";
    const wrapPage = (Component) => <div className={pageClassName}>{Component}</div>;

    if (user) {
        switch (currentPage) {
            case 'dashboard': return wrapPage(<DashboardPage t={t} user={user} navigateTo={navigateTo} />);
            case 'calculator': return wrapPage(<GrantCalculatorPage t={t} />);
            case 'apply': return wrapPage(<ApplicationFormPage t={t} />);
            default: return null;
        }
    }

    switch (currentPage) {
      case 'login': return wrapPage(<LoginPage t={t} navigateTo={navigateTo} />);
      case 'register': return wrapPage(<RegisterPage t={t} navigateTo={navigateTo} />);
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
                {user ? (
                    <>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); }} className={currentPage === 'dashboard' ? 'active' : ''}><LayoutDashboard size={16}/> {t('nav_dashboard')}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('calculator'); }} className={currentPage === 'calculator' ? 'active' : ''}><Calculator size={16}/> {t('nav_calculator')}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('apply'); }} className={currentPage === 'apply' ? 'active' : ''}><FileText size={16}/> {t('nav_apply')}</a>
                    </>
                ) : (
                    <>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className={currentPage === 'about' ? 'active' : ''}>{t('nav_about')}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className={currentPage === 'contact' ? 'active' : ''}>{t('nav_contact')}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('development'); }} className={currentPage === 'development' ? 'active' : ''}>{t('nav_development')}</a>
                    </>
                )}
            </nav>
            <div className="auth-nav">
                {user ? (
                    <>
                        <span className="user-greeting"><UserCircle2 size={20}/> {user.name}</span>
                        <button onClick={handleLogout} className="logout-btn"><LogOut size={16}/> {t('logout_button')}</button>
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
            <div className="footer-column">
              <h4>КОМПАНИЯ</h4>
              <a href="#">Біз туралы</a>
              <a href="#">Неге біз?</a>
            </div>
            <div className="footer-column">
              <h4>ҚЫЗМЕТТЕР</h4>
              <a href="#">Автоматты балл есептеу</a>
              <a href="#">Грант және ақылы тізімін қалыптастыру</a>
            </div>
            <div className="footer-column footer-right">
                <p>© Smart admission 2025</p>
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

