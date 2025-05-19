export const lab_3 = `
<h1>Лабораторная работа 3: Реализация DTO, Mapper и Repository в Spring Boot приложении с PostgreSQL</h1>

<h2>1. Создание DTO (Data Transfer Object)</h2>

<ol>
  <li><strong>Базовый DTO для сущности User</strong>
    <pre><code class="language-java">
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    // Геттеры и сеттеры
}
    </code></pre>
  </li>

  <li><strong>DTO для создания сущности</strong><br/> <code>UserCreateDTO.java</code>
    <pre><code class="language-java">
public class UserCreateDTO {
    @NotBlank
    private String username;
    @Email
    private String email;
}
    </code></pre>
  </li>

  <li><strong>DTO для обновления сущности</strong><br/> <code>UserUpdateDTO.java</code>
    <pre><code class="language-java">
public class UserUpdateDTO {
    private String username;
    private String email;
}
    </code></pre>
  </li>

  <li><strong>DTO с проекциями (для сложных запросов)</strong>
    <pre><code class="language-java">
public interface UserProjection {
    String getUsername();
    String getEmail();
}
    </code></pre>
  </li>

  <li><strong>Валидация DTO</strong>
    <pre><code class="language-java">
public class UserCreateDTO {
    @Size(min = 3, max = 50)
    private String username;
}
    </code></pre>
  </li>

  <li><strong>Ломбок-аннотации</strong>
    <pre><code class="language-java">
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
}
    </code></pre>
  </li>

  <li><strong>DTO для связанных сущностей</strong>
    <pre><code class="language-java">
public class UserWithPostsDTO {
    private UserDTO user;
    private List&lt;PostDTO&gt; posts;
}
    </code></pre>
  </li>

  <li><strong>Конвертер дат в DTO</strong>
    <pre><code class="language-java">
@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
private LocalDateTime createdAt;
    </code></pre>
  </li>
</ol>

<h2>2. Реализация Mapper</h2>

<ol start="9">
  <li><strong>Ручной маппинг</strong>
    <pre><code class="language-java">
public UserDTO toDto(User user) {
    UserDTO dto = new UserDTO();
    dto.setId(user.getId());
    dto.setUsername(user.getUsername());
    return dto;
}
    </code></pre>
  </li>

  <li><strong>Использование MapStruct</strong><br/> Добавьте зависимость:
    <pre><code class="language-xml">
&lt;dependency&gt;
    &lt;groupId&gt;org.mapstruct&lt;/groupId&gt;
    &lt;artifactId&gt;mapstruct&lt;/artifactId&gt;
    &lt;version&gt;1.5.5.Final&lt;/version&gt;
&lt;/dependency&gt;
    </code></pre>
  </li>

  <li><strong>Интерфейс маппера</strong><br/> <code>UserMapper.java</code>
    <pre><code class="language-java">
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDto(User user);
    User fromDto(UserDTO dto);
}
    </code></pre>
  </li>

  <li><strong>Кастомные методы маппера</strong>
    <pre><code class="language-java">
@AfterMapping
default void enrichDto(User user, @MappingTarget UserDTO dto) {
    dto.setFullName(user.getFirstName() + " " + user.getLastName());
}
    </code></pre>
  </li>

  <li><strong>Маппинг коллекций</strong>
    <pre><code class="language-java">
List&lt;UserDTO&gt; toDtoList(List&lt;User&gt; users);
    </code></pre>
  </li>

  <li><strong>Игнорирование полей</strong>
    <pre><code class="language-java">
@Mapping(target = "password", ignore = true)
UserDTO toDto(User user);
    </code></pre>
  </li>

  <li><strong>Маппинг разных типов полей</strong>
    <pre><code class="language-java">
@Mapping(target = "createdDate", 
         expression = "java(user.getCreatedAt().format(DateTimeFormatter.ISO_DATE))")
UserDTO toDto(User user);
    </code></pre>
  </li>
</ol>

<h2>3. Настройка Repository</h2>

<ol start="16">
  <li><strong>Базовый репозиторий</strong>
    <pre><code class="language-java">
public interface UserRepository extends JpaRepository&lt;User, Long&gt; {}
    </code></pre>
  </li>

  <li><strong>Кастомные запросы с @Query</strong>
    <pre><code class="language-java">
@Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
List&lt;User&gt; findByEmailDomain(@Param("domain") String domain);
    </code></pre>
  </li>

  <li><strong>Нативные SQL-запросы</strong>
    <pre><code class="language-java">
@Query(value = "SELECT * FROM users WHERE active = true", nativeQuery = true)
List&lt;User&gt; findActiveUsers();
    </code></pre>
  </li>

  <li><strong>Projections в репозиториях</strong>
    <pre><code class="language-java">
List&lt;UserProjection&gt; findByUsernameContaining(String keyword);
    </code></pre>
  </li>

  <li><strong>Pagination и сортировка</strong>
    <pre><code class="language-java">
Page&lt;User&gt; findByStatus(String status, Pageable pageable);
    </code></pre>
  </li>

  <li><strong>Методы с Optional</strong>
    <pre><code class="language-java">
Optional&lt;User&gt; findByEmail(String email);
    </code></pre>
  </li>

  <li><strong>Кастомный репозиторий</strong>
    <pre><code class="language-java">
public interface CustomUserRepository {
    List&lt;User&gt; findInactiveUsers();
}
    </code></pre>
  </li>

  <li><strong>Реализация кастомного репозитория</strong>
    <pre><code class="language-java">
public class CustomUserRepositoryImpl implements CustomUserRepository {
    @PersistenceContext
    private EntityManager em;

    // Реализация методов
}
    </code></pre>
  </li>

  <li><strong>Наследование кастомного репозитория</strong>
    <pre><code class="language-java">
public interface UserRepository extends JpaRepository&lt;User, Long&gt;, CustomUserRepository {}
    </code></pre>
  </li>

  <li><strong>Auditing репозиториев</strong>
    <pre><code class="language-java">
@EntityListeners(AuditingEntityListener.class)
public class User {
    @CreatedDate
    private LocalDateTime createdAt;
}
    </code></pre>
  </li>
</ol>

<h2>Пример интеграции в сервисном слое</h2>

<pre><code class="language-java">
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDTO createUser(UserCreateDTO dto) {
        User user = userMapper.fromCreateDto(dto);
        User saved = userRepository.save(user);
        return userMapper.toDto(saved);
    }

    public Page&lt;UserDTO&gt; getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toDto);
    }
}
</code></pre>

<h2>Рекомендации по форматированию (для Word)</h2>
<ul>
  <li>Используйте стили <strong>Heading 2</strong> для разделов DTO, Mapper, Repository</li>
  <li>Код оформляйте моноширинным шрифтом (например, Consolas 10pt)</li>
  <li>Настройте автоматическое оглавление</li>
  <li>Для каждого раздела используйте нумерованные списки</li>
</ul>

<h2>Вывод</h2>
<p>
  В ходе работы были реализованы все ключевые компоненты работы с данными:
  DTO для безопасной передачи данных, мапперы для преобразования между слоями и репозитории
  с различными вариантами доступа к данным. Полученная архитектура соответствует
  best practices современной Spring-разработки.
</p>
`;