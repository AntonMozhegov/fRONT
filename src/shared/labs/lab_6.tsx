
export const lab_6 = `
<div>
<h2>Вопросы с выбором ответа:</h2>

<h3>Вопрос 1. Что такое Spring Data JPA?</h3>
<ul>
    <li>a) Библиотека для работы с NoSQL базами данных</li>
    <li><strong>✅ b) Модуль Spring для упрощения работы с JPA</strong></li>
    <li>c) Инструмент для миграции баз данных</li>
    <li>d) Фреймворк для создания REST API</li>
</ul>

<h3>Вопрос 2. Какую зависимость нужно добавить в pom.xml для использования Spring Data JPA?</h3>
<ul>
    <li>a) spring-boot-starter-web</li>
    <li><strong>✅ b) spring-boot-starter-data-jpa</strong></li>
    <li>c) spring-boot-starter-security</li>
    <li>d) spring-boot-starter-test</li>
</ul>

<h3>Вопрос 3. Какой JPA-провайдер используется по умолчанию в Spring Data JPA?</h3>
<ul>
    <li>a) EclipseLink</li>
    <li><strong>✅ b) Hibernate</strong></li>
    <li>c) OpenJPA</li>
    <li>d) TopLink</li>
</ul>

<h3>Вопрос 4. Какой интерфейс репозитория предоставляет базовые CRUD-операции?</h3>
<ul>
    <li>a) JpaRepository</li>
    <li><strong>✅ b) CrudRepository</strong></li>
    <li>c) PagingAndSortingRepository</li>
    <li>d) ListCrudRepository</li>
</ul>

<h3>Вопрос 5. Какой метод репозитория возвращает сущность по её идентификатору?</h3>
<ul>
    <li>a) findAll()</li>
    <li><strong>✅ b) findById()</strong></li>
    <li>c) save()</li>
    <li>d) delete()</li>
</ul>

<h3>Вопрос 6. Какое свойство транзакций гарантирует, что все операции выполняются как единое целое?</h3>
<ul>
    <li>a) Consistency</li>
    <li>b) Isolation</li>
    <li><strong>✅ c) Atomicity</strong></li>
    <li>d) Durability</li>
</ul>

<h3>Вопрос 7. Какое значение параметра propagation аннотации @Transactional используется по умолчанию?</h3>
<ul>
    <li>a) Propagation.REQUIRES_NEW</li>
    <li><strong>✅ b) Propagation.REQUIRED</strong></li>
    <li>c) Propagation.NESTED</li>
    <li>d) Propagation.NOT_SUPPORTED</li>
</ul>

<h3>Вопрос 8. Какое значение propagation создаёт новую транзакцию, приостанавливая существующую?</h3>
<ul>
    <li>a) Propagation.REQUIRED</li>
    <li><strong>✅ b) Propagation.REQUIRES_NEW</strong></li>
    <li>c) Propagation.NESTED</li>
    <li>d) Propagation.MANDATORY</li>
</ul>

<h3>Вопрос 9. При каких исключениях Spring по умолчанию откатывает транзакцию?</h3>
<ul>
    <li>a) При любых Exception</li>
    <li>b) При Checked Exception</li>
    <li><strong>✅ c) При RuntimeException и Error</strong></li>
    <li>d) При любых ошибках компиляции</li>
</ul>

<h3>Вопрос 10. Какой параметр @Transactional позволяет указать, при каких исключениях транзакция должна откатываться?</h3>
<ul>
    <li><strong>✅ a) rollbackFor</strong></li>
    <li>b) noRollbackFor</li>
    <li>c) isolation</li>
    <li>d) propagation</li>
</ul>

<h2>Вопросы на последовательность:</h2>

<h3>Вопрос 11. Последовательность настройки Spring Data JPA</h3>
<p>Расположите шаги в правильном порядке для настройки Spring Data JPA в проекте:</p>
<ol>
    <li>Добавить зависимость spring-boot-starter-data-jpa в pom.xml/build.gradle.</li>
    <li>Настроить application.properties/application.yml с параметрами БД.</li>
    <li>Определить сущность с аннотациями @Entity и @Id.</li>
    <li>Создать репозиторий, расширяющий JpaRepository.</li>
</ol>

<h3>Вопрос 12. Порядок выполнения запроса через JPA</h3>
<p>Укажите правильную последовательность этапов при выполнении запроса через Spring Data JPA:</p>
<ol>
    <li>Вызов метода репозитория (например, findAll()).</li>
    <li>Spring Data создает реализацию репозитория.</li>
    <li>JPA преобразует вызов метода в SQL-запрос.</li>
    <li>Получение результатов и маппинг в сущности.</li>
</ol>

<h3>Вопрос 13. Этапы работы с транзакцией в Spring</h3>
<p>Расположите этапы обработки транзакции в Spring:</p>
<ol>
    <li>Пометить метод аннотацией @Transactional.</li>
    <li>Spring открывает транзакцию перед выполнением метода.</li>
    <li>Выполнение бизнес-логики с обращениями к БД.</li>
    <li>Spring фиксирует транзакцию (если нет исключений).</li>
</ol>

<h3>Вопрос 14. Порядок создания REST API с доступом к БД</h3>
<p>Укажите правильную последовательность разработки REST-контроллера с доступом к БД:</p>
<ol>
    <li>Описать DTO для запросов/ответов.</li>
    <li>Создать @RestController с методами-обработчиками.</li>
    <li>Реализовать сервисный слой с вызовом репозитория.</li>
    <li>Настроить маппинг между сущностью и DTO (например, через ModelMapper).</li>
</ol>

<h3>Вопрос 15. Жизненный цикл сущности JPA</h3>
<p>Расположите этапы жизненного цикла сущности JPA в правильном порядке:</p>
<ol>
    <li>Сущность управляется (managed) после вызова entityManager.persist().</li>
    <li>Изменения в managed-сущности автоматически отслеживаются.</li>
    <li>При коммите транзакции изменения синхронизируются с БД.</li>
    <li>Сущность переходит в состояние detached после закрытия транзакции.</li>
</ol>

<h3>Вопрос 16. Укажите порядок выполнения запроса в Spring Data JPA:</h3>
<ol>
    <li>Генерация SQL-запроса Hibernate</li>
    <li>Вызов метода репозитория</li>
    <li>Маппинг результата в сущности</li>
    <li>Отправка запроса в БД</li>
</ol>

<h3>Вопрос 17. Укажите правильный порядок наследования интерфейсов Spring Data JPA:</h3>
<p>(Расположите от базового к более специализированному)</p>
<ol>
    <li>Repository</li>
    <li>CrudRepository</li>
    <li>PagingAndSortingRepository</li>
    <li>JpaRepository</li>
</ol>

<h3>Вопрос 18. Выставите в правильном порядке жизненный цикл Hibernate Entity-объектов</h3>
<ol>
    <li>Transient</li>
    <li>Persistent (or Managed)</li>
    <li>Detached</li>
    <li>Removed</li>
</ol>

<h3>Вопрос 19. Выставите иерархию интерфейсов в Collections по возрастанию:</h3>
<ol>
    <li>Iterable</li>
    <li>Collection</li>
    <li>List</li>
    <li>ArrayList</li>
</ol>

<h3>Вопрос 20. Три уровня кэширования поставьте их по возрастанию</h3>
<ol>
    <li>Кеширование на уровне сессии (Session)</li>
    <li>Кеширование на уровне SessionFactory</li>
    <li>Кеширование запросов (и их результатов)</li>
</ol>

<h2>Вопросы на сопоставление:</h2>

<h3>Вопрос 21. Сопоставьте аннотации и их назначение:</h3>
<ul>
    <li>1. @Controller - Определяет класс как Spring MVC контроллер</li>
    <li>2. @Service - Помечает класс как сервисный компонент</li>
    <li>3. @Autowired - Внедряет зависимости автоматически</li>
    <li>4. @RequestMapping - Сопоставляет URL с методами контроллера</li>
</ul>

<h3>Вопрос 22. Сопоставьте методы CrudRepository и их действия:</h3>
<ul>
    <li>1. save() - Сохраняет или обновляет сущность</li>
    <li>2. deleteById() - Удаляет сущность по ID</li>
    <li>3. findAll() - Возвращает все записи</li>
    <li>4. existsById() - Проверяет наличие по ID</li>
</ul>

<h3>Вопрос 23. Сопоставьте свойства application.properties и их назначение:</h3>
<ul>
    <li>1. spring.datasource.url - URL подключения к БД</li>
    <li>2. spring.jpa.show-sql - Показывает SQL-запросы в логах</li>
    <li>3. spring.jpa.hibernate.ddl-auto - Управляет созданием схемы БД</li>
    <li>4. spring.datasource.username - Имя пользователя БД</li>
</ul>

<h3>Вопрос 24. Сопоставьте стратегии генерации ID (@GeneratedValue) и их описание:</h3>
<ul>
    <li>1. AUTO - Выбор стратегии зависит от БД</li>
    <li>2. IDENTITY - ID генерируется БД (auto_increment)</li>
    <li>3. SEQUENCE - Используется последовательность БД</li>
    <li>4. TABLE - ID хранятся в отдельной таблице</li>
</ul>

<h3>Вопрос 25. Сопоставьте компоненты Spring и их назначение:</h3>
<ul>
    <li>1. JpaRepository - Расширенный интерфейс для работы с JPA</li>
    <li>2. JdbcTemplate - Выполнение SQL-запросов без ORM</li>
    <li>3. EntityManager - Управление сущностями в JPA</li>
    <li>4. @Repository - Помечает класс как репозиторий Spring</li>
</ul>

<h3>Вопрос 26. Сопоставьте HTTP-методы и их назначение в REST API:</h3>
<ul>
    <li>1. GET - Получение ресурса</li>
    <li>2. POST - Создание нового ресурса</li>
    <li>3. PUT - Полное обновление ресурса</li>
    <li>4. PATCH - Частичное обновление ресурса</li>
</ul>

<h3>Вопрос 27. Сопоставьте типы отношений в JPA и их описание:</h3>
<ul>
    <li>1. @OneToOne - Один к одному</li>
    <li>2. @OneToMany - Один ко многим</li>
    <li>3. @ManyToOne - Многие к одному</li>
    <li>4. @ManyToMany - Многие ко многим</li>
</ul>

<h3>Вопрос 28. Сопоставьте исключения Spring и их причины:</h3>
<ul>
    <li>1. DataIntegrityViolationException - Нарушение целостности данных</li>
    <li>2. EntityNotFoundException - Сущность не найдена</li>
    <li>3. TransactionSystemException - Ошибка в транзакции</li>
    <li>4. OptimisticLockingFailureException - Конфликт оптимистичной блокировки</li>
</ul>

<h3>Вопрос 29. Сопоставьте аннотации Spring MVC и их назначение:</h3>
<ul>
    <li>1. @Controller - Определяет класс как контроллер</li>
    <li>2. @RestController - Контроллер для REST API</li>
    <li>3. @RequestMapping - Маппинг URL на метод</li>
    <li>4. @GetMapping - Маппинг GET-запроса</li>
</ul>
    <h3>Вопрос 30. Сопоставьте методы работы с транзакциями и их описание:</h3>
    <ul>
      <li>1. @Transactional - Определяет границы транзакции</li>
      <li>2. propagation - Поведение распространения транзакции</li>
      <li>3. isolation - Уровень изоляции</li>
      <li>4. readOnly - Транзакция только для чтения</li>
    </ul>

    <h2>Вопросы открытого типа:</h2>

    <h3>Вопрос 31. Какая аннотация JPA указывает, что поле является первичным ключом?</h3>
    <p>Ответ: @Id</p>

    <h3>Вопрос 32. Какой метод CrudRepository используется для удаления сущности по её ID?</h3>
    <p>Ответ: deleteById()</p>

    <h3>Вопрос 33. Какое свойство в application.properties задаёт URL для подключения к базе данных?</h3>
    <p>Ответ: spring.datasource.url</p>

    <h3>Вопрос 34. Какая аннотация Spring позволяет выполнить метод в транзакции?</h3>
    <p>Ответ: @Transactional</p>

    <h3>Вопрос 35. Какой интерфейс в Spring Data JPA предоставляет пагинацию и сортировку?</h3>
    <p>Ответ: PagingAndSortingRepository</p>

    <h3>Вопрос 36. Какой Hibernate-параметр в application.properties автоматически создаёт таблицы при старте приложения?</h3>
    <p>Ответ: spring.jpa.hibernate.ddl-auto=create</p>

    <h3>Вопрос 37. Какой метод JpaRepository ищет сущность по её ID?</h3>
    <p>Ответ: findById()</p>

    <h3>Вопрос 38. Какой метод EntityManager используется для сохранения новой сущности в БД?</h3>
    <p>Ответ: persist()</p>

    <h3>Вопрос 39. Какая аннотация Spring обозначает класс как компонент сервисного слоя?</h3>
    <p>Ответ: @Service</p>

    <h3>Вопрос 40. Какой класс в Spring используется для выполнения "сырых" SQL-запросов без JPA?</h3>
    <p>Ответ: JdbcTemplate</p>

    <h2>Смешанная подборка вопросов:</h2>

    <h3>Вопрос 41. Какой аннотацией включается поддержка кэширования в Spring?</h3>
    <ul>
      <li>a) @EnableTransactionManagement</li>
      <li><strong>✅ b) @EnableCaching</strong></li>
      <li>c) @EnableJpaRepositories</li>
      <li>d) @EnableWebSecurity</li>
    </ul>

    <h3>Вопрос 42. Какой кэш-провайдер используется в Spring Cache Abstraction по умолчанию?</h3>
    <ul>
      <li>a) Ehcache</li>
      <li>b) Redis</li>
      <li>c) Caffeine</li>
      <li><strong>✅ d) ConcurrentMap</strong></li>
    </ul>

    <h3>Вопрос 43. Какой класс используется для программного управления транзакциями в Spring?</h3>
    <ul>
      <li><strong>✅ a) TransactionTemplate</strong></li>
      <li>b) TransactionManager</li>
      <li>c) CacheManager</li>
      <li>d) EntityManager</li>
    </ul>

    <h3>Вопрос 44. Поставь иерархию транзакций по степени изолированности по возрастанию:</h3>
    <ol>
      <li>READ UNCOMMITTED</li>
      <li>READ COMMITTED</li>
      <li>REPEATABLE READ</li>
      <li>SERIALIZABLE</li>
    </ol>

    <h3>Вопрос 45. Расположите этапы жизненного цикла транзакции в Spring в правильном порядке:</h3>
    <ol>
      <li>Начало транзакции</li>
      <li>Выполнение бизнес-логики</li>
      <li>Фиксация (commit) транзакции</li>
      <li>Откат (rollback) при ошибке</li>
      <li>Закрытие ресурсов</li>
    </ol>

    <h3>Вопрос 46. Сопоставьте паттерны проектирования и их назначение:</h3>
    <ul>
      <li>1. Singleton - Гарантирует единственный экземпляр класса</li>
      <li>2. Factory Method - Делегирует создание объектов</li>
      <li>3. Strategy - Инкапсулирует семейство алгоритмов</li>
      <li>4. Observer - Реализует механизм подписки</li>
    </ul>

    <h3>Вопрос 47. Какая аннотация Spring Data JPA позволяет написать кастомный SQL-запрос?</h3>
    <p>Ответ: @Query</p>

    <h3>Вопрос 48. Какой метод CrudRepository используется для проверки существования сущности по ID?</h3>
    <p>Ответ: existsById()</p>

    <h3>Вопрос 49. Какое свойство application.properties включает логирование SQL-запросов?</h3>
    <p>Ответ: spring.jpa.show-sql=true</p>

    <h3>Вопрос 50. Какая аннотация JPA определяет отношение "один ко многим" между сущностями?</h3>
    <p>Ответ: @OneToMany</p>
  </div>
`;