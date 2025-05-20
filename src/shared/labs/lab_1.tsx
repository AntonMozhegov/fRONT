export const lab_1 = `
<h1>Лабораторная работа 1: Развертывание PostgreSQL в Docker и подключение к БД через IntelliJ IDEA</h1>

<ol>
  <li>Откройте терминал (Linux/macOS) или командную строку/PowerShell (Windows)</li>
  
  <li>Проверьте наличие Docker, выполнив команду:
    <pre><code>docker --version</code></pre>
  </li>

  <li>Если Docker не установлен:
    <ul>
      <li>Скачайте Docker Desktop с <a href="https://www.docker.com/products/docker-desktop" target="_blank" rel="noopener noreferrer">официального сайта</a></li>
      <li>Установите, следуя инструкциям мастера установки</li>
      <li>Для Linux может потребоваться дополнительная настройка:
        <pre><code>sudo systemctl start docker</code></pre>
      </li>
    </ul>
  </li>

  <li>Проверьте наличие Docker Compose:
    <pre><code>docker-compose --version</code></pre>
  </li>

  <li>Если не установлен:
    <ul>
      <li>Для Windows устанавливается вместе с Docker Desktop</li>
    </ul>
  </li>

  <li>Создайте папку для проекта:
    <ul>
      <li>Linux/macOS:
        <pre><code>mkdir ~/postgres_docker && cd ~/postgres_docker</code></pre>
      </li>
      <li>Windows:
        <pre><code>mkdir C:\\postgres_docker && cd C:\\postgres_docker</code></pre>
      </li>
    </ul>
  </li>

  <li>Создайте файл конфигурации:
    <pre><code>nano docker-compose.yml</code></pre>
  </li>

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

<ol start="9">
  <li>Сохраните файл в nano:
    <pre><code>Ctrl+O, Enter, Ctrl+X</code></pre>
  </li>

  <li>Запустите контейнер:
    <pre><code>docker-compose up -d</code></pre>
  </li>

  <li>Проверьте статус:
    <pre><code>docker ps --filter "name=postgres"</code></pre>
  </li>

  <li>Проверьте работу PostgreSQL:
    <pre><code>docker exec -it postgres_docker_postgres_1 psql -U admin -d test_db -c "SELECT version();"</code></pre>
  </li>

  <li>Откройте IntelliJ IDEA</li>

  <li>Откройте панель Database:
    <ul>
      <li>Через меню: <b>View → Tool Windows → Database</b></li>
      <li>Горячие клавиши:
        <pre><code>Alt+1</code></pre> (Win/Linux) /
        <pre><code>Cmd+1</code></pre> (macOS)
      </li>
    </ul>
  </li>

  <li>Добавьте новый источник данных:
    <ul>
      <li>Нажмите <b>+</b> → <b>Data Source</b> → <b>PostgreSQL</b></li>
    </ul>
  </li>

  <li>Заполните параметры:
    <ul>
      <li><b>Host:</b> <code>localhost</code></li>
      <li><b>Port:</b> <code>5432</code></li>
      <li><b>Database:</b> <code>test_db</code></li>
      <li><b>User:</b> <code>admin</code></li>
      <li><b>Password:</b> <code>admin</code></li>
    </ul>
  </li>

  <li>Проверьте подключение (<b>Test Connection</b>)</li>
  <li>Сохраните (<b>OK</b>)</li>

  <li>Создайте таблицу:
    <ul>
      <li>Разверните <b>Schemas → public → Tables</b></li>
      <li>ПКМ → <b>New → Table</b></li>
      <li>Укажите:
        <ul>
          <li><b>Name:</b> <code>users</code></li>
          <li><b>Columns:</b>
            <ul>
              <li><code>id</code> — serial, PRIMARY KEY</li>
              <li><code>name</code> — varchar(100)</li>
              <li><code>email</code> — varchar(100), UNIQUE</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Выполните:
        <pre><code>Ctrl+Enter</code></pre>
      </li>
    </ul>
  </li>

  <li>Добавьте данные:
    <ul>
      <li>ПКМ на таблице <b>users</b> → <b>New → Edit Data</b></li>
      <li>Добавьте тестовые данные</li>
      <li>Сохраните:
        <pre><code>Ctrl+S</code></pre>
      </li>
    </ul>
  </li>

  <li>Выполните запрос:
    <ul>
      <li>Откройте вкладку <b>SQL</b></li>
      <li>Введите:
        <pre><code>SELECT * FROM users;</code></pre>
      </li>
      <li>Выполните (Execute)</li>
    </ul>
  </li>

  <li>Остановите контейнер:
    <pre><code>docker-compose down</code></pre>
  </li>

  <li>Для полной очистки:
    <pre><code>docker-compose down -v</code></pre>
  </li>

  <li>Проверьте остановку:
    <pre><code>docker ps -a</code></pre>
  </li>  
  <li>Очистите неиспользуемые образы и тома (при необходимости):
    <pre><code>docker system prune -a</code></pre>
    <p>⚠️ Команда удалит неиспользуемые контейнеры, образы, сети и кэш. Будьте внимательны!</p>
  </li>
  
</ol>
`;