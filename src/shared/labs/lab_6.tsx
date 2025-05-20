export const lab_6 = `
  <div>
    <h2>Вопрос 1. Что такое Spring Data JPA?</h2>
    <ul>
      <li>a) Библиотека для работы с NoSQL базами данных</li>
      <li><strong>✅ b) Модуль Spring для упрощения работы с JPA</strong></li>
      <li>c) Инструмент для миграции баз данных</li>
      <li>d) Фреймворк для создания REST API</li>
    </ul>

    <h2>Вопрос 2. Какую зависимость нужно добавить в pom.xml для использования Spring Data JPA?</h2>
    <ul>
      <li>a) spring-boot-starter-web</li>
      <li><strong>✅ b) spring-boot-starter-data-jpa</strong></li>
      <li>c) spring-boot-starter-security</li>
      <li>d) spring-boot-starter-test</li>
    </ul>

    <h2>Вопрос 3. Какой JPA-провайдер используется по умолчанию в Spring Data JPA?</h2>
    <ul>
      <li>a) EclipseLink</li>
      <li><strong>✅ b) Hibernate</strong></li>
      <li>c) OpenJPA</li>
      <li>d) TopLink</li>
    </ul>

    <h2>Вопрос 4. Какой аннотацией обозначается сущность в JPA?</h2>
    <ul>
      <li>a) @Table</li>
      <li><strong>✅ b) @Entity</strong></li>
      <li>c) @Id</li>
      <li>d) @Column</li>
    </ul>

    <h2>Вопрос 5. Какой аннотацией обозначается первичный ключ в сущности?</h2>
    <ul>
      <li>a) @Entity</li>
      <li><strong>✅ b) @Id</strong></li>
      <li>c) @GeneratedValue</li>
      <li>d) @Column</li>
    </ul>

    <h2>Вопрос 6. Какую стратегию генерации первичного ключа использует аннотация @GeneratedValue(strategy = GenerationType.IDENTITY)?</h2>
    <ul>
      <li>a) Генерация через таблицу</li>
      <li>b) Генерация через последовательность</li>
      <li><strong>✅ c) Генерация через автоинкремент базы данных</strong></li>
      <li>d) Генерация через UUID</li>
    </ul>

    <h2>Вопрос 7. Какой интерфейс репозитория предоставляет базовые CRUD-операции?</h2>
    <ul>
      <li>a) JpaRepository</li>
      <li><strong>✅ b) CrudRepository</strong></li>
      <li>c) PagingAndSortingRepository</li>
      <li>d) ListCrudRepository</li>
    </ul>

    <h2>Вопрос 8. Какой интерфейс репозитория следует использовать для поддержки пагинации и сортировки?</h2>
    <ul>
      <li>a) CrudRepository</li>
      <li>b) JpaRepository</li>
      <li><strong>✅ c) PagingAndSortingRepository</strong></li>
      <li>d) ListPagingAndSortingRepository</li>
    </ul>

    <h2>Вопрос 9. Какой метод репозитория возвращает сущность по её идентификатору?</h2>
    <ul>
      <li>a) findAll()</li>
      <li><strong>✅ b) findById()</strong></li>
      <li>c) save()</li>
      <li>d) delete()</li>
    </ul>

    <h2>Вопрос 10. Какой тип возвращает метод findById() в JpaRepository?</h2>
    <ul>
      <li>a) T</li>
      <li>b) List&lt;T&gt;</li>
      <li><strong>✅ c) Optional&lt;T&gt;</strong></li>
      <li>d) Page&lt;T&gt;</li>
    </ul>

    <h2>Вопрос 11. Какой параметр в application.properties управляет стратегией генерации схемы базы данных?</h2>
    <ul>
      <li>a) spring.jpa.database-platform</li>
      <li><strong>✅ b) spring.jpa.hibernate.ddl-auto</strong></li>
      <li>c) spring.datasource.url</li>
      <li>d) spring.jpa.show-sql</li>
    </ul>

    <h2>Вопрос 12. Какое значение spring.jpa.hibernate.ddl-auto рекомендуется использовать в production-среде?</h2>
    <ul>
      <li>a) create</li>
      <li>b) update</li>
      <li><strong>✅ c) validate</strong></li>
      <li>d) create-drop</li>
    </ul>

    <h2>Вопрос 13. Какой метод в репозитории позволяет автоматически генерировать запрос для поиска по полю email?</h2>
    <ul>
      <li><strong>✅ a) findByEmail()</strong></li>
      <li>b) getByEmail()</li>
      <li>c) searchByEmail()</li>
      <li>d) queryByEmail()</li>
    </ul>

    <h2>Вопрос 14. Какой аннотацией можно определить собственный JPQL-запрос в репозитории?</h2>
    <ul>
      <li><strong>✅ a) @Query</strong></li>
      <li>b) @Param</li>
      <li>c) @Modifying</li>
      <li>d) @Transactional</li>
    </ul>

    <h2>Вопрос 15. Какой параметр аннотации @Query указывает, что запрос является нативным SQL-запросом?</h2>
    <ul>
      <li>a) value</li>
      <li><strong>✅ b) nativeQuery = true</strong></li>
      <li>c) name</li>
      <li>d) countQuery</li>
    </ul>

    <h2>Вопрос 16. Какой аннотацией нужно пометить метод, чтобы он выполнялся в транзакции?</h2>
    <ul>
      <li>a) @Query</li>
      <li><strong>✅ b) @Transactional</strong></li>
      <li>c) @Modifying</li>
      <li>d) @Cacheable</li>
    </ul>

    <h2>Вопрос 17. Какое свойство транзакций гарантирует, что все операции выполняются как единое целое?</h2>
    <ul>
      <li>a) Consistency</li>
      <li>b) Isolation</li>
      <li><strong>✅ c) Atomicity</strong></li>
      <li>d) Durability</li>
    </ul>

    <h2>Вопрос 18. Какое свойство транзакций гарантирует, что изменения сохраняются даже после сбоя системы?</h2>
    <ul>
      <li>a) Consistency</li>
      <li>b) Isolation</li>
      <li>c) Atomicity</li>
      <li><strong>✅ d) Durability</strong></li>
    </ul>

    <h2>Вопрос 19. Какой уровень изоляции транзакций предотвращает "грязное чтение"?</h2>
    <ul>
      <li>a) READ_UNCOMMITTED</li>
      <li><strong>✅ b) READ_COMMITTED</strong></li>
      <li>c) SERIALIZABLE</li>
      <li>d) REPEATABLE_READ</li>
    </ul>

    <h2>Вопрос 20. Какой уровень изоляции транзакций является самым строгим?</h2>
    <ul>
      <li>a) READ_UNCOMMITTED</li>
      <li>b) READ_COMMITTED</li>
      <li>c) REPEATABLE_READ</li>
      <li><strong>✅ d) SERIALIZABLE</strong></li>
    </ul>

    <h2>Вопрос 21. Какое значение параметра propagation аннотации @Transactional используется по умолчанию?</h2>
    <ul>
      <li>a) Propagation.REQUIRES_NEW</li>
      <li><strong>✅ b) Propagation.REQUIRED</strong></li>
      <li>c) Propagation.NESTED</li>
      <li>d) Propagation.NOT_SUPPORTED</li>
    </ul>

    <h2>Вопрос 22. Какое значение propagation создаёт новую транзакцию, приостанавливая существующую?</h2>
    <ul>
      <li>a) Propagation.REQUIRED</li>
      <li><strong>✅ b) Propagation.REQUIRES_NEW</strong></li>
      <li>c) Propagation.NESTED</li>
      <li>d) Propagation.MANDATORY</li>
    </ul>

    <h2>Вопрос 23. Какой параметр аннотации @Transactional указывает, что транзакция предназначена только для чтения?</h2>
    <ul>
      <li>a) propagation</li>
      <li>b) isolation</li>
      <li><strong>✅ c) readOnly</strong></li>
      <li>d) timeout</li>
    </ul>

    <h2>Вопрос 24. Какой параметр @Transactional задаёт максимальное время выполнения транзакции?</h2>
    <ul>
      <li>a) propagation</li>
      <li>b) isolation</li>
      <li>c) readOnly</li>
      <li><strong>✅ d) timeout</strong></li>
    </ul>

    <h2>Вопрос 25. При каких исключениях Spring по умолчанию откатывает транзакцию?</h2>
    <ul>
      <li>a) При любых Exception</li>
      <li>b) При Checked Exception</li>
      <li><strong>✅ c) При RuntimeException и Error</strong></li>
      <li>d) При любых ошибках компиляции</li>
    </ul>

    <!-- Вставьте остальные (26–50) аналогично — могу прислать вторую часть, если нужно -->
  </div><div>
    <!-- ...вопросы 1–25 выше... -->

    <h2>Вопрос 26. Какой параметр @Transactional позволяет указать, при каких исключениях транзакция должна откатываться?</h2>
    <ul>
      <li><strong>✅ a) rollbackFor</strong></li>
      <li>b) noRollbackFor</li>
      <li>c) isolation</li>
      <li>d) propagation</li>
    </ul>

    <h2>Вопрос 27. Какой аннотацией включается поддержка кэширования в Spring?</h2>
    <ul>
      <li>a) @EnableTransactionManagement</li>
      <li><strong>✅ b) @EnableCaching</strong></li>
      <li>c) @EnableJpaRepositories</li>
      <li>d) @EnableWebSecurity</li>
    </ul>

    <h2>Вопрос 28. Какой аннотацией кэшируется результат выполнения метода?</h2>
    <ul>
      <li>a) @CachePut</li>
      <li>b) @CacheEvict</li>
      <li><strong>✅ c) @Cacheable</strong></li>
      <li>d) @Caching</li>
    </ul>

    <h2>Вопрос 29. Какой аннотацией обновляются данные в кэше?</h2>
    <ul>
      <li><strong>✅ a) @CachePut</strong></li>
      <li>b) @CacheEvict</li>
      <li>c) @Cacheable</li>
      <li>d) @Caching</li>
    </ul>

    <h2>Вопрос 30. Какой аннотацией удаляются данные из кэша?</h2>
    <ul>
      <li>a) @CachePut</li>
      <li><strong>✅ b) @CacheEvict</strong></li>
      <li>c) @Cacheable</li>
      <li>d) @Caching</li>
    </ul>

    <h2>Вопрос 31. Какой параметр @CacheEvict позволяет удалить все записи из кэша?</h2>
    <ul>
      <li><strong>✅ a) allEntries = true</strong></li>
      <li>b) beforeInvocation = true</li>
      <li>c) key</li>
      <li>d) value</li>
    </ul>

    <h2>Вопрос 32. Какой кэш-провайдер используется в Spring Cache Abstraction по умолчанию?</h2>
    <ul>
      <li>a) Ehcache</li>
      <li>b) Redis</li>
      <li>c) Caffeine</li>
      <li><strong>✅ d) ConcurrentMap</strong></li>
    </ul>

    <h2>Вопрос 33. Какой кэш-провайдер подходит для распределённого кэширования?</h2>
    <ul>
      <li>a) ConcurrentMap</li>
      <li>b) Ehcache</li>
      <li><strong>✅ c) Redis</strong></li>
      <li>d) Caffeine</li>
    </ul>

    <h2>Вопрос 34. Какой уровень кэширования в Hibernate работает в рамках одной сессии EntityManager?</h2>
    <ul>
      <li>a) Кэш второго уровня</li>
      <li><strong>✅ b) Кэш первого уровня</strong></li>
      <li>c) Кэш запросов</li>
      <li>d) Кэш приложения</li>
    </ul>

    <h2>Вопрос 35. Какой уровень кэширования в Hibernate работает на уровне всей EntityManagerFactory?</h2>
    <ul>
      <li><strong>✅ a) Кэш второго уровня</strong></li>
      <li>b) Кэш первого уровня</li>
      <li>c) Кэш запросов</li>
      <li>d) Кэш приложения</li>
    </ul>

    <h2>Вопрос 36. Какой параметр в application.properties включает кэш второго уровня в Hibernate?</h2>
    <ul>
      <li>a) spring.jpa.properties.hibernate.cache.use_query_cache</li>
      <li><strong>✅ b) spring.jpa.properties.hibernate.cache.use_second_level_cache</strong></li>
      <li>c) spring.jpa.properties.hibernate.cache.region.factory_class</li>
      <li>d) spring.jpa.show-sql</li>
    </ul>

    <h2>Вопрос 37. Какая аннотация используется для кэширования сущностей в Hibernate?</h2>
    <ul>
      <li>a) @Cacheable</li>
      <li><strong>✅ b) @Cache</strong></li>
      <li>c) @Query</li>
      <li>d) @Transactional</li>
    </ul>

    <h2>Вопрос 38. Какая стратегия кэширования в Hibernate подходит для данных, которые никогда не изменяются?</h2>
    <ul>
      <li>a) READ_WRITE</li>
      <li>b) NONSTRICT_READ_WRITE</li>
      <li><strong>✅ c) READ_ONLY</strong></li>
      <li>d) TRANSACTIONAL</li>
    </ul>

    <h2>Вопрос 39. Какой интерфейс в Spring управляет кэшами?</h2>
    <ul>
      <li>a) Cache</li>
      <li><strong>✅ b) CacheManager</strong></li>
      <li>c) CacheResolver</li>
      <li>d) CacheFactory</li>
    </ul>

    <h2>Вопрос 40. Какой параметр @Cacheable задаёт условие для кэширования результата?</h2>
    <ul>
      <li>a) key</li>
      <li>b) value</li>
      <li><strong>✅ c) condition</strong></li>
      <li>d) unless</li>
    </ul>

    <h2>Вопрос 41. Какой параметр @Cacheable предотвращает кэширование результата, если он равен null?</h2>
    <ul>
      <li>a) key</li>
      <li>b) value</li>
      <li>c) condition</li>
      <li><strong>✅ d) unless</strong></li>
    </ul>

    <h2>Вопрос 42. Какой аннотацией можно тестировать репозитории Spring Data JPA в изоляции?</h2>
    <ul>
      <li>a) @SpringBootTest</li>
      <li><strong>✅ b) @DataJpaTest</strong></li>
      <li>c) @WebMvcTest</li>
      <li>d) @AutoConfigureTestDatabase</li>
    </ul>

    <h2>Вопрос 43. Какой тип связи используется для описания отношения "один ко многим" в JPA?</h2>
    <ul>
      <li>a) @OneToOne</li>
      <li><strong>✅ b) @OneToMany</strong></li>
      <li>c) @ManyToOne</li>
      <li>d) @ManyToMany</li>
    </ul>

    <h2>Вопрос 44. Какой параметр аннотации @OneToMany указывает, что связанные сущности должны удаляться вместе с родительской?</h2>
    <ul>
      <li>a) mappedBy</li>
      <li>b) fetch</li>
      <li><strong>✅ c) cascade</strong></li>
      <li>d) orphanRemoval</li>
    </ul>

    <h2>Вопрос 45. Какой тип загрузки связанных сущностей используется по умолчанию в @ManyToOne?</h2>
    <ul>
      <li><strong>✅ a) FetchType.EAGER</strong></li>
      <li>b) FetchType.LAZY</li>
      <li>c) FetchType.AUTO</li>
      <li>d) FetchType.NONE</li>
    </ul>

    <h2>Вопрос 46. Какой тип загрузки связанных сущностей используется по умолчанию в @OneToMany?</h2>
    <ul>
      <li><strong>✅ a) FetchType.LAZY</strong></li>
      <li>b) FetchType.EAGER</li>
      <li>c) FetchType.AUTO</li>
      <li>d) FetchType.NONE</li>
    </ul>

    <h2>Вопрос 47. Какой инструмент миграции баз данных часто используется с Spring Data JPA?</h2>
    <ul>
      <li>a) Hibernate</li>
      <li><strong>✅ b) Flyway</strong></li>
      <li>c) Ehcache</li>
      <li>d) Caffeine</li>
    </ul>

    <h2>Вопрос 48. Какой интерфейс используется для пагинации в Spring Data JPA?</h2>
    <ul>
      <li>a) Sort</li>
      <li><strong>✅ b) Pageable</strong></li>
      <li>c) Page</li>
      <li>d) Slice</li>
    </ul>

    <h2>Вопрос 49. Какой метод интерфейса Page возвращает общее количество элементов?</h2>
    <ul>
      <li>a) getContent()</li>
      <li><strong>✅ b) getTotalElements()</strong></li>
      <li>c) getTotalPages()</li>
      <li>d) getNumber()</li>
    </ul>

    <h2>Вопрос 50. Какой класс используется для программного управления транзакциями в Spring?</h2>
    <ul>
      <li><strong>✅ a) TransactionTemplate</strong></li>
      <li>b) TransactionManager</li>
      <li>c) CacheManager</li>
      <li>d) EntityManager</li>
    </ul>
  </div>

`;