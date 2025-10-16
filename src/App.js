import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// URL нашего бэкенда. Убедитесь, что Spring Boot приложение запущено.
const API_URL = 'http://localhost:8080/api/enrollees';

function App() {
  // Состояние для хранения списка всех абитуриентов
  const [enrollees, setEnrollees] = useState([]);

  // Состояние для данных формы нового абитуриента
  const [formData, setFormData] = useState({
    fullName: '',
    iin: '',
    languageOfStudy: 'рус', // Значение по умолчанию
  });

  // Отдельное состояние для предметов и оценок
  const [grades, setGrades] = useState([{ subject: '', grade: '' }]);

  // Состояние для хранения выбранного файла аттестата
  const [certificateFile, setCertificateFile] = useState(null);

  // Состояние для количества грантов (для админки)
  const [grantCount, setGrantCount] = useState(30);

  // --- Функции для работы с API ---

  // Функция для получения списка абитуриентов с бэкенда
  const fetchEnrollees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEnrollees(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке списка абитуриентов:", error);
      alert("Не удалось загрузить данные. Убедитесь, что бэкенд-сервер запущен.");
    }
  };

  // useEffect будет вызван один раз при загрузке компонента для получения списка
  useEffect(() => {
    fetchEnrollees();
  }, []);

  // --- Функции для обработки формы ---

  // Обработчик изменения текстовых полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработчик выбора файла
  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };

  // Обработчик изменения оценок
  const handleGradeChange = (index, e) => {
    const newGrades = [...grades];
    newGrades[index][e.target.name] = e.target.value;
    setGrades(newGrades);
  };

  // Добавление нового поля для предмета и оценки
  const addGradeField = () => {
    setGrades([...grades, { subject: '', grade: '' }]);
  };

  // Удаление поля для предмета и оценки
  const removeGradeField = (index) => {
    const newGrades = [...grades];
    newGrades.splice(index, 1);
    setGrades(newGrades);
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault(); // Отменяем стандартное поведение формы

    if (!certificateFile) {
        alert("Пожалуйста, загрузите PDF-аттестат.");
        return;
    }

    // Преобразуем массив оценок в объект (Map), как ожидает бэкенд
    const gradesMap = grades.reduce((acc, grade) => {
        if (grade.subject && grade.grade) {
            acc[grade.subject] = parseInt(grade.grade, 10);
        }
        return acc;
    }, {});

    const finalData = { ...formData, grades: gradesMap };

    // Создаем объект FormData для отправки файла и JSON данных вместе
    const submission = new FormData();
    submission.append('certificate', certificateFile);
    // Бэкенд ожидает JSON в поле 'data', поэтому преобразуем наш объект в строку, а затем в Blob
    submission.append('data', new Blob([JSON.stringify(finalData)], { type: 'application/json' }));

    try {
      await axios.post(API_URL, submission, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Заявка успешно отправлена!');
      // Обновляем список абитуриентов
      fetchEnrollees();
      // Сбрасываем форму
      setFormData({ fullName: '', iin: '', languageOfStudy: 'рус' });
      setGrades([{ subject: '', grade: '' }]);
      setCertificateFile(null);
      e.target.reset(); // Очистка поля файла
    } catch (error) {
      console.error("Ошибка при отправке заявки:", error);
      alert("Произошла ошибка при отправке. Проверьте консоль.");
    }
  };

  // --- Функции для админ-панели ---

  const handleDistribute = async () => {
    try {
        await axios.post(`${API_URL}/distribute`, { grantCount });
        alert(`Гранты успешно распределены!`);
        fetchEnrollees(); // Обновляем список, чтобы увидеть статусы
    } catch (error) {
        console.error("Ошибка при распределении грантов:", error);
        alert("Произошла ошибка при распределении.");
    }
  }


  return (
    <div className="container">
      <header>
        <h1>Smart Admission — Приёмная комиссия</h1>
        <p>Система автоматического расчёта баллов и распределения абитуриентов</p>
      </header>

      <main>
        <div className="form-section">
          <h2>Подать заявление</h2>
          <form onSubmit={handleSubmit}>
            <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="ФИО" required />
            <input name="iin" value={formData.iin} onChange={handleInputChange} placeholder="ИИН" required />
            <select name="languageOfStudy" value={formData.languageOfStudy} onChange={handleInputChange}>
              <option value="рус">Русский</option>
              <option value="каз">Казахский</option>
            </select>

            <hr />
            <h3>Оценки из аттестата</h3>
            {grades.map((g, index) => (
              <div key={index} className="grade-field">
                <input name="subject" value={g.subject} onChange={(e) => handleGradeChange(index, e)} placeholder="Предмет (напр. Математика)" />
                <input name="grade" type="number" min="1" max="5" value={g.grade} onChange={(e) => handleGradeChange(index, e)} placeholder="Оценка" />
                {grades.length > 1 && <button type="button" onClick={() => removeGradeField(index)}>–</button>}
              </div>
            ))}
            <button type="button" onClick={addGradeField} className="add-grade-btn">+ Добавить предмет</button>
            <hr />

            <label>Загрузите аттестат (PDF):</label>
            <input type="file" name="certificate" onChange={handleFileChange} accept=".pdf" required />

            <button type="submit" className="submit-btn">Отправить</button>
          </form>
        </div>

        <div className="admin-section">
          <h2>Панель администратора</h2>
          <div className="distribute-controls">
            <label>Количество грантов:</label>
            <input type="number" value={grantCount} onChange={(e) => setGrantCount(e.target.value)} />
            <button onClick={handleDistribute}>Распределить гранты</button>
          </div>
        </div>

        <div className="list-section">
          <h2>Список абитуриентов</h2>
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>ФИО</th>
                <th>Средний балл</th>
                <th>Статус</th>
                <th>Язык обучения</th>
              </tr>
            </thead>
            <tbody>
              {enrollees.map((enrollee, index) => (
                <tr key={enrollee.id}>
                  <td>{index + 1}</td>
                  <td>{enrollee.fullName}</td>
                  <td>{enrollee.averageScore.toFixed(2)}</td>
                  <td className={`status-${enrollee.status?.toLowerCase()}`}>{enrollee.status}</td>
                  <td>{enrollee.languageOfStudy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;

