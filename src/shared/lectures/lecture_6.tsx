export const lecture_6 = `
<div class="lecture-container">
  <h1>Лекция 6: SQL - язык структурированных запросов</h1>
  
  <p>SQL (Structured Query Language) — это стандартизированный язык программирования, предназначенный для управления реляционными базами данных и работы с данными. SQL позволяет создавать, читать, обновлять и удалять данные (CRUD-операции), а также управлять структурой самой базы данных. В современной разработке SQL является фундаментальным навыком для любого специалиста, работающего с данными, от backend-разработчиков до аналитиков.</p>

  <h2>Основные категории SQL-команд</h2>
  
  <h3>1. DDL (Data Definition Language) — язык определения данных:</h3>
  <ul>
    <li>CREATE — создание объектов базы данных (таблиц, индексов, представлений)</li>
    <li>ALTER — изменение структуры существующих объектов</li>
    <li>DROP — удаление объектов</li>
    <li>TRUNCATE — удаление всех данных из таблицы с сохранением структуры</li>
  </ul>

  <h3>2. DML (Data Manipulation Language) — язык манипулирования данными:</h3>
  <ul>
    <li>SELECT — выборка данных</li>
    <li>INSERT — вставка новых записей</li>
    <li>UPDATE — обновление существующих записей</li>
    <li>DELETE — удаление записей</li>
  </ul>

  <h3>3. DCL (Data Control Language) — язык управления данными:</h3>
  <ul>
    <li>GRANT — предоставление прав доступа</li>
    <li>REVOKE — отзыв прав доступа</li>
  </ul>

  <h3>4. TCL (Transaction Control Language) — язык управления транзакциями:</h3>
  <ul>
    <li>COMMIT — фиксация транзакции</li>
    <li>ROLLBACK — откат транзакции</li>
    <li>SAVEPOINT — создание точки сохранения внутри транзакции</li>
  </ul>

  <h2>Создание и изменение структуры базы данных (DDL)</h2>
  
  <h3>Создание таблиц</h3>
  <pre><code>CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE DEFAULT CURRENT_DATE,
    salary DECIMAL(10,2) CHECK (salary > 0),
    department_id INT REFERENCES departments(id)
);</code></pre>

  <h3>Изменение таблиц</h3>
  <pre><code>-- Добавление нового столбца
ALTER TABLE employees ADD COLUMN phone VARCHAR(15);

-- Удаление столбца
ALTER TABLE employees DROP COLUMN phone;

-- Изменение типа данных столбца
ALTER TABLE employees ALTER COLUMN salary TYPE DECIMAL(12,2);

-- Добавление ограничения
ALTER TABLE employees ADD CONSTRAINT salary_check CHECK (salary < 1000000);

-- Удаление ограничения
ALTER TABLE employees DROP CONSTRAINT salary_check;</code></pre>

  <h2>Работа с данными (DML)</h2>
  
  <h3>Вставка данных (INSERT)</h3>
  <pre><code>-- Вставка с указанием всех столбцов
INSERT INTO employees (id, first_name, last_name, email, hire_date, salary, department_id)
VALUES (1, 'John', 'Doe', 'john.doe@example.com', '2020-01-15', 75000.00, 1);</code></pre>

  <h3>Выборка данных (SELECT)</h3>
  <pre><code>-- Простейший запрос
SELECT * FROM employees;

-- Выбор конкретных столбцов
SELECT first_name, last_name, salary FROM employees;

-- Фильтрация строк
SELECT * FROM employees WHERE salary > 70000;</code></pre>

  <h3>Обновление данных (UPDATE)</h3>
  <pre><code>-- Обновление всех строк
UPDATE employees SET salary = salary * 1.05;

-- Обновление с условием
UPDATE employees SET salary = salary * 1.10 WHERE department_id = 1;</code></pre>

  <h3>Удаление данных (DELETE)</h3>
  <pre><code>-- Удаление всех строк (осторожно!)
DELETE FROM employees;

-- Удаление с условием
DELETE FROM employees WHERE salary < 50000;</code></pre>

  <h2>Сложные запросы SELECT</h2>
  
  <h3>Агрегатные функции</h3>
  <pre><code>SELECT 
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary
FROM employees;</code></pre>

  <h3>Соединения таблиц (JOIN)</h3>
  <pre><code>-- INNER JOIN
SELECT 
    e.first_name, 
    e.last_name, 
    d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;</code></pre>

  <h3>Подзапросы</h3>
  <pre><code>-- Подзапрос в WHERE
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);</code></pre>

  <h2>Заключение</h2>
  <p>SQL — мощный и выразительный язык для работы с реляционными базами данных, который включает в себя средства для определения структуры данных (DDL), манипулирования данными (DML), управления доступом (DCL) и контроля транзакций (TCL). Основные команды SQL — SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP — позволяют выполнять все необходимые операции с данными.</p>
</div>
`;