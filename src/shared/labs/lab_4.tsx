export const lab_4 = `
<h1>Лабораторная работа 4: Реализация Service и Controller слоев в Spring Boot приложении с PostgreSQL</h1>

<h2>1. Создание Service слоя</h2>

<ol>
  <li><strong>Базовый сервис для сущности User</strong>
    <pre><code class="language-java">
public interface UserService {
    UserDTO createUser(UserCreateDTO dto);
    UserDTO getUserById(Long id);
    List&lt;UserDTO&gt; getAllUsers();
    UserDTO updateUser(Long id, UserUpdateDTO dto);
    void deleteUser(Long id);
}
    </code></pre>
  </li>

  <li><strong>Реализация сервиса</strong>
    <pre><code class="language-java">
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
}
    </code></pre>
  </li>

  <li><strong>Метод создания сущности</strong>
    <pre><code class="language-java">
@Override
@Transactional
public UserDTO createUser(UserCreateDTO dto) {
    User user = userMapper.fromCreateDto(dto);
    User saved = userRepository.save(user);
    return userMapper.toDto(saved);
}
    </code></pre>
  </li>

  <li><strong>Обработка ошибок</strong>
    <pre><code class="language-java">
@Override
public UserDTO getUserById(Long id) {
    return userRepository.findById(id)
        .map(userMapper::toDto)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
}
    </code></pre>
  </li>

  <li><strong>Транзакционные методы</strong>
    <pre><code class="language-java">
@Transactional(readOnly = true)
@Override
public List&lt;UserDTO&gt; getAllUsers() {
    return userRepository.findAll()
        .stream()
        .map(userMapper::toDto)
        .toList();
}
    </code></pre>
  </li>

  <li><strong>Метод обновления</strong>
    <pre><code class="language-java">
@Override
@Transactional
public UserDTO updateUser(Long id, UserUpdateDTO dto) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    userMapper.updateFromDto(dto, user);
    User updated = userRepository.save(user);
    return userMapper.toDto(updated);
}
    </code></pre>
  </li>

  <li><strong>Логирование в сервисе</strong>
    <pre><code class="language-java">
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Override
    public UserDTO createUser(...) {
        log.info("Creating user with email: {}", dto.getEmail());
        // ...
    }
}
    </code></pre>
  </li>

  <li><strong>Кеширование</strong>
    <pre><code class="language-java">
@Cacheable(value = "users", key = "#id")
@Override
public UserDTO getUserById(Long id) {
    ...
}
    </code></pre>
  </li>

  <li><strong>Валидация бизнес-логики</strong>
    <pre><code class="language-java">
if (userRepository.existsByEmail(dto.getEmail())) {
    throw new BusinessException("Email already exists");
}
    </code></pre>
  </li>

  <li><strong>Пагинация в сервисе</strong>
    <pre><code class="language-java">
@Override
public Page&lt;UserDTO&gt; getUsersPage(Pageable pageable) {
    return userRepository.findAll(pageable)
        .map(userMapper::toDto);
}
    </code></pre>
  </li>

  <li><strong>Специфическая бизнес-логика</strong>
    <pre><code class="language-java">
@Override
public void deactivateUser(Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(...);
    user.setActive(false);
    userRepository.save(user);
    sendDeactivationEmail(user.getEmail());
}
    </code></pre>
  </li>

  <li><strong>Интеграция с другими сервисами</strong>
    <pre><code class="language-java">
private final EmailService emailService;
private final AuditService auditService;
    </code></pre>
  </li>
</ol>

<h2>2. Создание Controller слоя</h2>

<ol start="13">
  <li><strong>Базовый REST-контроллер</strong>
    <pre><code class="language-java">
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
}
    </code></pre>
  </li>

  <li><strong>Метод создания (POST)</strong>
    <pre><code class="language-java">
@PostMapping
@ResponseStatus(HttpStatus.CREATED)
public UserDTO createUser(@Valid @RequestBody UserCreateDTO dto) {
    return userService.createUser(dto);
}
    </code></pre>
  </li>

  <li><strong>Получение по ID (GET)</strong>
    <pre><code class="language-java">
@GetMapping("/{id}")
public UserDTO getUser(@PathVariable Long id) {
    return userService.getUserById(id);
}
    </code></pre>
  </li>

  <li><strong>Получение всех (с фильтрацией)</strong>
    <pre><code class="language-java">
@GetMapping
public List&lt;UserDTO&gt; getAllUsers(@RequestParam(required = false) String emailFilter) {
    return userService.getAllUsers(emailFilter);
}
    </code></pre>
  </li>

  <li><strong>Обновление (PUT)</strong>
    <pre><code class="language-java">
@PutMapping("/{id}")
public UserDTO updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO dto) {
    return userService.updateUser(id, dto);
}
    </code></pre>
  </li>

  <li><strong>Удаление (DELETE)</strong>
    <pre><code class="language-java">
@DeleteMapping("/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
}
    </code></pre>
  </li>

  <li><strong>Обработка исключений</strong>
    <pre><code class="language-java">
@ExceptionHandler(ResourceNotFoundException.class)
@ResponseStatus(HttpStatus.NOT_FOUND)
public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
    return new ErrorResponse(ex.getMessage());
}
    </code></pre>
  </li>

  <li><strong>Валидация запросов</strong>
    <pre><code class="language-java">
public class UserCreateDTO {
    @NotBlank
    @Size(max = 100)
    private String name;
    
    @Email
    private String email;
}
    </code></pre>
  </li>

  <li><strong>Документирование API (Swagger)</strong>
    <pre><code class="language-java">
@Operation(summary = "Create new user")
@ApiResponses(value = {
    @ApiResponse(responseCode = "201", description = "User created"),
    @ApiResponse(responseCode = "400", description = "Invalid input")
})
@PostMapping
public UserDTO createUser(...) { ... }
    </code></pre>
  </li>

  <li><strong>Пагинация в контроллере</strong>
    <pre><code class="language-java">
@GetMapping("/page")
public Page&lt;UserDTO&gt; getUsersPage(
        @PageableDefault(sort = "name", direction = Sort.Direction.ASC) Pageable pageable) {
    return userService.getUsersPage(pageable);
}
    </code></pre>
  </li>

  <li><strong>Версионирование API</strong>
    <pre><code class="language-java">
@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 extends UserController {
    // Переопределенные методы
}
    </code></pre>
  </li>

  <li><strong>Аутентификация в методах</strong>
    <pre><code class="language-java">
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/{id}")
public void deleteUser(...) { ... }
    </code></pre>
  </li>

  <li><strong>Кастомные HTTP-заголовки</strong>
    <pre><code class="language-java">
@GetMapping("/{id}")
public ResponseEntity&lt;UserDTO&gt; getUserWithHeaders(@PathVariable Long id) {
    UserDTO dto = userService.getUserById(id);
    return ResponseEntity.ok()
        .header("X-Custom-Header", "value")
        .body(dto);
}
    </code></pre>
  </li>
</ol>

<h2>Пример интеграции</h2>

<pre><code class="language-java">
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "User Management", description = "Operations with users")
public class UserController {
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create new user")
    public UserDTO createUser(@Valid @RequestBody UserCreateDTO dto) {
        return userService.createUser(dto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
</code></pre>

<h2>Вывод</h2>
<p>
  В ходе работы были реализованы все ключевые компоненты сервисного и контроллерного слоев, включая обработку запросов, валидацию, пагинацию и обработку ошибок. Полученная структура соответствует <strong>best practices</strong> REST API разработки на Spring Boot.
</p>
`;