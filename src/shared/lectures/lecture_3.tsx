export const lecture_3 = `
<h1>Лекция 3: Основы создания запросов к базам данных из Java</h1>

<p>Spring Data JPA — это модуль в экосистеме Spring, который значительно упрощает работу с базами данных через Java Persistence API (JPA). Он предоставляет разработчикам удобный и эффективный способ реализации слоя доступа к данным, минимизируя количество шаблонного кода, упрощая написание запросов, обеспечивая гибкость в настройке и управлении транзакциями, а также поддерживая тесную интеграцию с другими компонентами Spring Framework.</p>

<p>Основная цель Spring Data JPA — ускорить разработку, повысить читаемость кода и облегчить сопровождение приложений, особенно в крупных проектах, где требуется масштабируемость, надёжность и удобство тестирования.</p>

<h2>Настройка Spring Data JPA</h2>

<p>Для начала работы с Spring Data JPA необходимо создать проект и подключить необходимые зависимости. В большинстве случаев разработчики используют Spring Boot, так как он предоставляет удобный способ быстрого старта приложения с минимальной конфигурацией.</p>

<p>Основные зависимости, которые нужно подключить, включают:</p>

<ul>
  <li><strong>Spring Boot Starter Data JPA</strong> — стартовая зависимость, которая включает Spring Data JPA, Hibernate (как JPA-провайдер по умолчанию) и другие необходимые библиотеки:
  <code>
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
&lt;/dependency&gt;
  </code>
  </li>
  
  <li><strong>Драйвер базы данных</strong> — зависимость для взаимодействия с конкретной базой данных:
    <ul>
      <li>Для PostgreSQL:
      <code>
&lt;dependency&gt;
    &lt;groupId&gt;org.postgresql&lt;/groupId&gt;
    &lt;artifactId&gt;postgresql&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;
      </code>
      </li>
      <li>Для MySQL:
      <code>
&lt;dependency&gt;
    &lt;groupId&gt;mysql&lt;/groupId&gt;
    &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;
      </code>
      </li>
      <li>Для H2 (удобно для тестирования):
      <code>
&lt;dependency&gt;
    &lt;groupId&gt;com.h2database&lt;/groupId&gt;
    &lt;artifactId&gt;h2&lt;/artifactId&gt;
    &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;
      </code>
      </li>
    </ul>
  </li>
</ul>

<h2>Конфигурация подключения к базе данных</h2>

<p>После подключения зависимостей необходимо настроить параметры подключения к базе данных в файле application.properties или application.yml:</p>

<code>
spring.datasource.url=jdbc:postgresql://localhost:5432/mydatabase
spring.datasource.username=myuser
spring.datasource.password=mypassword
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
</code>

<p>Разберём основные параметры:</p>
<ul>
  <li><code>spring.datasource.url</code> — URL подключения к базе данных</li>
  <li><code>spring.datasource.username</code> и <code>spring.datasource.password</code> — учётные данные</li>
  <li><code>spring.datasource.driver-class-name</code> — класс драйвера JDBC</li>
  <li><code>spring.jpa.database-platform</code> — диалект Hibernate для генерации SQL-запросов</li>
  <li><code>spring.jpa.hibernate.ddl-auto</code> — стратегия генерации схемы базы данных:
    <ul>
      <li><code>none</code> — ничего не изменяется</li>
      <li><code>validate</code> — проверяет соответствие схемы сущностям</li>
      <li><code>update</code> — автоматически обновляет схему</li>
      <li><code>create</code> — создаёт схему заново</li>
      <li><code>create-drop</code> — создаёт схему при запуске и удаляет при завершении</li>
    </ul>
  </li>
  <li><code>spring.jpa.show-sql</code> — включает логирование SQL-запросов</li>
  <li><code>spring.jpa.properties.hibernate.format_sql</code> — форматирует SQL-запросы для лучшей читаемости</li>
</ul>

<h2>Создание сущностей</h2>

<p>Сущность в JPA — это Java-класс, представляющий таблицу в базе данных. Каждый экземпляр сущности соответствует строке в таблице, а поля класса — столбцам.</p>

<p>Пример сущности User:</p>

<code>
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "age")
    private Integer age;

    // Геттеры и сеттеры
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}
</code>

<p>Ключевые аннотации:</p>
<ul>
  <li><code>@Entity</code> — указывает, что класс является JPA-сущностью</li>
  <li><code>@Table(name = "users")</code> — определяет имя таблицы в базе данных</li>
  <li><code>@Id</code> — обозначает поле как первичный ключ</li>
  <li><code>@GeneratedValue</code> — указывает стратегию генерации ключа</li>
  <li><code>@Column</code> — позволяет настроить параметры столбца</li>
</ul>

<h2>Валидация данных</h2>

<p>Для валидации данных можно использовать аннотации из пакета jakarta.validation.constraints:</p>

<code>
import jakara.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Full name is mandatory")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Min(value = 0, message = "Age cannot be negative")
    @Column(name = "age")
    private Integer age;

    // Геттеры и сеттеры
}
</code>

<h2>Создание репозиториев</h2>

<p>Репозиторий — это интерфейс, предоставляющий методы для выполнения операций с базой данных. Spring Data JPA предлагает несколько базовых интерфейсов:</p>

<ul>
  <li><code>CrudRepository&lt;T, ID&gt;</code> — базовые CRUD-операции</li>
  <li><code>PagingAndSortingRepository&lt;T, ID&gt;</code> — добавляет поддержку пагинации и сортировки</li>
  <li><code>JpaRepository&lt;T, ID&gt;</code> — добавляет методы, специфичные для JPA</li>
</ul>

<p>Пример репозитория для сущности User:</p>

<code>
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
}
</code>

<p>После создания такого интерфейса Spring автоматически создаёт его реализацию со следующими методами:</p>
<ul>
  <li><code>save(S entity)</code> — сохраняет сущность</li>
  <li><code>findById(ID id)</code> — возвращает сущность по идентификатору</li>
  <li><code>findAll()</code> — возвращает все сущности</li>
  <li><code>deleteById(ID id)</code> — удаляет сущность по идентификатору</li>
  <li><code>delete(S entity)</code> — удаляет переданную сущность</li>
  <li><code>existsById(ID id)</code> — проверяет существование сущности</li>
  <li><code>count()</code> — возвращает общее количество записей</li>
</ul>

<h2>Автоматическая генерация запросов</h2>

<p>Одной из ключевых особенностей Spring Data JPA является возможность автоматической генерации запросов на основе соглашений об именовании методов:</p>

<code>
public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    Optional&lt;User&gt; findByEmail(String email);
    List&lt;User&gt; findByFullNameContainingIgnoreCase(String namePart);
    List&lt;User&gt; findByAgeGreaterThan(Integer age);
    List&lt;User&gt; findByAgeBetween(Integer startAge, Integer endAge);
    List&lt;User&gt; findByEmailIn(List&lt;String&gt; emails);
    List&lt;User&gt; findByOrderByFullNameAsc();
}
</code>

<p>Разберём, как работают эти методы:</p>
<ul>
  <li><code>findByEmail(String email)</code> — ищет пользователя по точному совпадению email. Генерируемый JPQL: <code>SELECT u FROM User u WHERE u.email = ?1</code></li>
  <li><code>findByFullNameContainingIgnoreCase(String namePart)</code> — ищет пользователей, у которых fullName содержит заданную подстроку (без учёта регистра)</li>
  <li><code>findByAgeGreaterThan(Integer age)</code> — ищет пользователей, у которых возраст больше заданного</li>
  <li><code>findByAgeBetween(Integer startAge, Integer endAge)</code> — ищет пользователей в заданном диапазоне возраста</li>
  <li><code>findByEmailIn(List&lt;String&gt; emails)</code> — ищет пользователей, у которых email находится в заданном списке</li>
  <li><code>findByOrderByFullNameAsc()</code> — возвращает пользователей, отсортированных по имени</li>
</ul>

<h2>Вывод лекции</h2>

<p>Spring Data JPA значительно упрощает работу с базами данных в Java-приложениях, предоставляя разработчикам удобный интерфейс для выполнения операций с данными. Ключевые преимущества включают минимизацию шаблонного кода, автоматическую генерацию запросов на основе именования методов, гибкую настройку и управление транзакциями.</p>

<p>Для начала работы необходимо подключить соответствующие зависимости, настроить подключение к базе данных, создать сущности с помощью аннотаций JPA и определить репозитории, расширяющие базовые интерфейсы Spring Data. Этот подход значительно ускоряет разработку и упрощает сопровождение приложений, особенно в крупных проектах.</p>

<p>Использование стандартных методов репозиториев, таких как save, findById, findAll, и возможность создания собственных методов с автоматической генерацией запросов делают Spring Data JPA мощным инструментом для работы с реляционными базами данных в Java-приложениях.</p>`;
