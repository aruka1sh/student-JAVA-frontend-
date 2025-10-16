import React, { useState, useEffect } from 'react';

// Этот компонент будет отвечать за отображение, добавление студентов
function StudentManager() {
    // Состояние для хранения списка студентов с сервера
    const [students, setStudents] = useState([]);
    // Состояния для полей ввода в форме
    const [fullName, setFullName] = useState('');
    const [studentGroup, setStudentGroup] = useState('');

    // Функция для загрузки списка студентов с бэкенда
    const fetchStudents = () => {
        fetch('/api/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error("Ошибка при загрузке студентов:", error));
    };

    // useEffect будет выполнен один раз после первого рендера компонента,
    // чтобы загрузить начальный список студентов.
    useEffect(() => {
        fetchStudents();
    }, []); // Пустой массив означает "выполнить только один раз"

    // Обработчик отправки формы
    const handleSubmit = (event) => {
        // Предотвращаем стандартное поведение формы (перезагрузку страницы)
        event.preventDefault();

        // Создаем объект нового студента
        const newStudent = { fullName, studentGroup };

        // Отправляем POST-запрос на наш бэкенд
        fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
        })
        .then(response => response.json())
        .then(() => {
            // После успешного добавления:
            // 1. Очищаем поля формы
            setFullName('');
            setStudentGroup('');
            // 2. Обновляем список студентов, чтобы увидеть нового
            fetchStudents();
        })
        .catch(error => console.error("Ошибка при добавлении студента:", error));
    };

    return (
        <div>
            {/* Форма для добавления нового студента */}
            <form onSubmit={handleSubmit} className="student-form">
                <h3>Добавить нового студента</h3>
                <input
                    type="text"
                    placeholder="ФИО студента"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Группа"
                    value={studentGroup}
                    onChange={e => setStudentGroup(e.target.value)}
                    required
                />
                <button type="submit">Добавить</button>
            </form>

            {/* Список студентов */}
            <div className="student-list">
                <h3>Список студентов</h3>
                <ul>
                    {students.map(student => (
                        <li key={student.id}>
                            {student.fullName} ({student.studentGroup})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default StudentManager;