export const lab_1 = `
<h1>Лабораторная работа 1: Развертывание PostgreSQL в Docker и подключение к БД через IntelliJ IDEA</h1>

<h2>1.1. Проверка и установка Docker</h2>
<ol>
  <li>Откройте терминал (Linux/macOS) или командную строку/PowerShell (Windows)</li>
  <li>Проверьте наличие Docker, выполнив команду:<br/><code>docker --version</code></li>
  <li>Если Docker не установлен:
    <ul>
      <li>Скачайте Docker Desktop с <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer">официального сайта</a></li>
      <li>Установите, следуя инструкциям мастера установки</li>
      <li>Для Linux может потребоваться дополнительная настройка:<br/><code>sudo systemctl start docker</code></li>
    </ul>
  </li>
</ol>

<h2>1.2. Проверка Docker Compose</h2>
<ol>
  <li>Проверьте наличие Docker Compose:<br/><code>docker-compose --version</code></li>
  <li>Если не установлен:
    <ul>
      <li>Для Windows устанавливается вместе с Docker Desktop</li>
    </ul>
  </li>
</ol>

<h2>2.1. Создание рабочей директории</h2>
<ol>
  <li>Создайте папку для проекта:
    <ul>
      <li>Linux/macOS:<br/><code>mkdir ~/postgres_docker && cd ~/postgres_docker</code></li>
      <li>Windows:<br/><code>mkdir C:\\postgres_docker && cd C:\\postgres_docker</code></li>
    </ul>
  </li>
</ol>

<h2>2.2. Создание <code>docker-compose.yml</code></h2>
<ol>
  <li>Создайте файл конфигурации:<br/><code>nano docker-compose.yml</code></li>
  <li>Вставьте следующую конфигурацию:</li>
</ol>

<pre><code class="language-yaml">
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin
      POSTGRES_DB: test_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d test_db"]
      interval: 5s
      timeout: 5s
      retries: 5
volumes:
  postgres_data:
</code></pre>

<ol start="3">
  <li>Сохраните файл (в <code>nano</code>: Ctrl+O, Enter, Ctrl+X)</li>
</ol>

<h2>2.3. Запуск контейнера</h2>
<ol>
  <li>Запустите контейнер:<br/><code>docker-compose up -d</code></li>
  <li>Проверьте статус:<br/><code>docker ps --filter "name=postgres"</code></li>
  <li>Проверьте работу PostgreSQL:<br/><code>docker exec -it postgres_docker_postgres_1 psql -U admin -d test_db -c "SELECT version();"</code></li>
</ol>

<h2>3. Подключение к БД из IntelliJ IDEA</h2>

<h3>3.1. Настройка подключения</h3>
<ol>
  <li>Откройте IntelliJ IDEA</li>
  <li>Откройте панель Database:
    <ul>
      <li>Через меню: <b>View → Tool Windows → Database</b></li>
      <li>Или горячими клавишами: Alt+1 (Win/Linux) / Cmd+1 (macOS)</li>
    </ul>
  </li>
  <li>Добавьте новый источник данных:
    <ul>
      <li>Нажмите <b>+</b> → <b>Data Source</b> → <b>PostgreSQL</b></li>
    </ul>
  </li>
  <li>Заполните параметры:
    <ul>
      <li><b>Host:</b> localhost</li>
      <li><b>Port:</b> 5432</li>
      <li><b>Database:</b> test_db</li>
      <li><b>User:</b> admin</li>
      <li><b>Password:</b> admin</li>
    </ul>
  </li>
  <li>Проверьте подключение (<b>Test Connection</b>)</li>
  <li>Сохраните (<b>OK</b>)</li>
</ol>

<h3>3.2. Работа с базой данных</h3>
<ol>
  <li>Создайте таблицу:
    <ul>
      <li>Разверните <b>Schemas → public → Tables</b></li>
      <li>ПКМ → <b>New → Table</b></li>
      <li>Укажите:
        <ul>
          <li><b>Name:</b> users</li>
          <li><b>Columns:</b>
            <ul>
              <li><code>id</code> (serial, PRIMARY KEY)</li>
              <li><code>name</code> (varchar(100))</li>
              <li><code>email</code> (varchar(100), UNIQUE)</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Выполните (Execute или Ctrl+Enter)</li>
    </ul>
  </li>
  <li>Добавьте данные:
    <ul>
      <li>ПКМ на таблице <b>users</b> → <b>New → Edit Data</b></li>
      <li>Добавьте тестовые данные</li>
      <li>Сохраните (Ctrl+S)</li>
    </ul>
  </li>
  <li>Выполните запрос:
    <ul>
      <li>Откройте вкладку <b>SQL</b></li>
      <li>Введите:<br/><code>SELECT * FROM users;</code></li>
      <li>Выполните (Execute)</li>
    </ul>
  </li>
</ol>

<h2>4. Завершение работы</h2>
<ol>
  <li>Остановите контейнер:<br/><code>docker-compose down</code></li>
  <li>Для полной очистки:<br/><code>docker-compose down -v</code></li>
  <li>Проверьте остановку:<br/><code>docker ps -a</code></li>
</ol>
`;