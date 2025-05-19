export const lab_2 = `
<h1>Лабораторная работа 2: Развертывание PostgreSQL и подключение к Spring Boot</h1>

<h2>1. Подготовка базы данных</h2>

<ol>
  <li><strong>Установка PostgreSQL</strong><br/>
    Установите PostgreSQL 15+ на локальную машину или используйте Docker-контейнер.
  </li>

  <li><strong>Создание базы данных</strong><br/>
    <pre><code class="language-sql">CREATE DATABASE spring_boot_db;</code></pre>
  </li>

  <li><strong>Создание пользователя</strong><br/>
    <pre><code class="language-sql">CREATE USER spring_user WITH PASSWORD 'securepass123';</code></pre>
  </li>

  <li><strong>Назначение прав</strong><br/>
    <pre><code class="language-sql">GRANT ALL PRIVILEGES ON DATABASE spring_boot_db TO spring_user;</code></pre>
  </li>

  <li><strong>Проверка подключения</strong><br/>
    <pre><code class="language-sql">\\c spring_boot_db spring_user</code></pre>
  </li>

  <li><strong>Создание тестовой таблицы (опционально)</strong><br/>
    <pre><code class="language-sql">
CREATE TABLE IF NOT EXISTS test_table (
  id SERIAL PRIMARY KEY,
  test_field VARCHAR(100)
);
    </code></pre>
  </li>

  <li><strong>Настройка SSL (для production)</strong><br/>
    В <code>postgresql.conf</code>:
    <pre><code class="language-ini">ssl = on</code></pre>
  </li>

  <li><strong>Конфигурация pg_hba.conf</strong><br/>
    Добавьте строку для локального доступа:
    <pre><code class="language-ini">host    all             all             127.0.0.1/32            md5</code></pre>
  </li>

  <li><strong>Проверка работы БД</strong><br/>
    <pre><code class="language-bash">psql -h localhost -U spring_user -d spring_boot_db</code></pre>
  </li>

  <li><strong>Создание резервной копии (опционально)</strong><br/>
    <pre><code class="language-bash">pg_dump -U spring_user -F c spring_boot_db > backup.dump</code></pre>
  </li>
</ol>

<h2>2. Настройка Spring Boot</h2>

<ol start="11">
  <li><strong>Добавление зависимостей</strong><br/>
    В <code>pom.xml</code>:
    <pre><code class="language-xml">
&lt;dependency&gt;
    &lt;groupId&gt;org.postgresql&lt;/groupId&gt;
    &lt;artifactId&gt;postgresql&lt;/artifactId&gt;
    &lt;version&gt;42.6.0&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
&lt;/dependency&gt;
    </code></pre>
  </li>

  <li><strong>Базовая конфигурация application.properties</strong><br/>
    <pre><code class="language-properties">
spring.datasource.url=jdbc:postgresql://localhost:5432/spring_boot_db
spring.datasource.username=spring_user
spring.datasource.password=securepass123
    </code></pre>
  </li>

  <li><strong>Настройка Hibernate</strong><br/>
    <pre><code class="language-properties">
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
    </code></pre>
  </li>

  <li><strong>Настройка пула соединений</strong><br/>
    <pre><code class="language-properties">
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.connection-timeout=5000
    </code></pre>
  </li>

  <li><strong>SSL конфигурация (опционально)</strong><br/>
    <pre><code class="language-properties">
spring.datasource.url=jdbc:postgresql://localhost:5432/spring_boot_db?ssl=true&sslmode=require
    </code></pre>
  </li>

  <li><strong>Логирование SQL</strong><br/>
    <pre><code class="language-properties">
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
    </code></pre>
  </li>

  <li><strong>Проверка конфигурации</strong><br/>
    Создайте контроллер с методом:
    <pre><code class="language-java">
@GetMapping("/db-check")
public Integer checkDb() {
    return jdbcTemplate.queryForObject("SELECT 1", Integer.class);
}
    </code></pre>
  </li>

  <li><strong>Настройка миграций</strong><br/>
    Добавьте Flyway:
    <pre><code class="language-xml">
&lt;dependency&gt;
    &lt;groupId&gt;org.flywaydb&lt;/groupId&gt;
    &lt;artifactId&gt;flyway-core&lt;/artifactId&gt;
&lt;/dependency&gt;
    </code></pre>
  </li>

  <li><strong>Конфигурация для тестов</strong><br/>
    В <code>application-test.properties</code>:
    <pre><code class="language-properties">
spring.datasource.url=jdbc:postgresql://localhost:5432/spring_boot_test_db
    </code></pre>
  </li>

  <li><strong>Профили конфигурации</strong><br/>
    Активация профиля:
    <pre><code class="language-properties">spring.profiles.active=dev</code></pre>
  </li>
</ol>

<h2>3. Описание Entity</h2>

<ol start="21">
  <li><strong>Базовая сущность</strong><br/>
    <pre><code class="language-java">
@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;
}
    </code></pre>
  </li>

  <li><strong>Аннотации валидации</strong><br/>
    <pre><code class="language-java">
@Email
@Column(unique = true)
private String email;
    </code></pre>
  </li>

  <li><strong>Связи между таблицами</strong><br/>
    <pre><code class="language-java">
@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
private List&lt;Task&gt; tasks;
    </code></pre>
  </li>

  <li><strong>Аудит полей</strong><br/>
    <pre><code class="language-java">
@CreatedDate
@Column(updatable = false)
private LocalDateTime createdAt;
    </code></pre>
  </li>

  <li><strong>Конвертеры атрибутов</strong><br/>
    <pre><code class="language-java">
@Convert(converter = EmployeeStatusConverter.class)
private EmployeeStatus status;
    </code></pre>
  </li>
</ol>

<h2>Приложение: Пример полного файла конфигурации</h2>

<h3><code>application-dev.properties</code></h3>
<pre><code class="language-properties">
# Datasource
spring.datasource.url=jdbc:postgresql://localhost:5432/spring_boot_db
spring.datasource.username=spring_user
spring.datasource.password=securepass123

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation=true

# Connection pool
spring.datasource.hikari.maximum-pool-size=15
spring.datasource.hikari.connection-timeout=30000

# Flyway
spring.flyway.locations=classpath:db/migration
spring.flyway.baseline-on-migrate=true
</code></pre>

<h2>Вывод</h2>
<p>
  В ходе лабораторной работы были рассмотрены все этапы подключения Spring Boot приложения к PostgreSQL, включая детальную настройку параметров соединения, конфигурацию Entity и оптимальные практики работы с базой данных.
</p>
`;