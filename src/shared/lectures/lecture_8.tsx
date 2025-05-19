export const lecture_8 = `
<div class="lecture-container">
  <h1>Лекция 8: Оптимизация запросов к базе данных</h1>

  <p>Оптимизация запросов к базе данных является критически важной задачей для обеспечения высокой производительности приложений. Неэффективные запросы могут значительно замедлять работу системы, особенно при больших объемах данных.</p>

  <h2>Использование индексов</h2>
  <p>Основным инструментом оптимизации в базах данных являются индексы. Индексы работают подобно оглавлению в книге, позволяя быстро находить нужные данные без полного сканирования таблицы.</p>

  <pre><code>-- Создание индекса по одному полю
CREATE INDEX idx_users_last_name ON users(last_name);

-- Составной индекс
CREATE INDEX idx_users_name_department ON users(last_name, first_name, department_id);

-- Уникальный индекс
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Частичный индекс (PostgreSQL)
CREATE INDEX idx_users_active ON users(id) WHERE is_active = true;</code></pre>

  <h3>Рекомендации по работе с индексами</h3>
  <ul>
    <li>Индексируйте поля, часто используемые в WHERE, JOIN и ORDER BY</li>
    <li>Для сложных запросов создавайте составные индексы</li>
    <li>Порядок полей в индексе должен соответствовать порядку в запросах</li>
    <li>Избегайте избыточных индексов</li>
    <li>Используйте покрывающие индексы для часто выполняемых запросов</li>
  </ul>

  <h2>Анализ выполнения запросов (EXPLAIN)</h2>
  <pre><code>-- Простой анализ
EXPLAIN SELECT * FROM users WHERE last_name = 'Smith';

-- Анализ с метриками выполнения
EXPLAIN ANALYZE SELECT * FROM orders WHERE created_at > '2023-01-01';</code></pre>

  <h3>Ключевые операции в плане выполнения</h3>
  <ul>
    <li><strong>Seq Scan</strong> - полное сканирование таблицы (часто требует оптимизации)</li>
    <li><strong>Index Scan</strong> - использование индекса с обращением к таблице</li>
    <li><strong>Index Only Scan</strong> - наиболее эффективный вариант (данные берутся только из индекса)</li>
  </ul>

  <h2>Оптимизация запросов</h2>

  <h3>Оператор LIKE</h3>
  <pre><code>-- Может использовать индекс
SELECT * FROM users WHERE last_name LIKE 'A%';

-- Не может эффективно использовать индекс
SELECT * FROM users WHERE last_name LIKE '%A';
SELECT * FROM users WHERE last_name LIKE '%A%';</code></pre>

  <h3>JOIN-операции</h3>
  <ul>
    <li>Всегда указывайте тип соединения (INNER, LEFT, RIGHT)</li>
    <li>Соединяйте таблицы по индексированным полям</li>
    <li>Оптимизируйте порядок соединения таблиц</li>
    <li>Используйте подзапросы или CTE для сложных запросов</li>
  </ul>

  <h2>Работа с большими объемами данных</h2>

  <h3>Пагинация в Spring Data JPA</h3>
  <pre><code>public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    Page&lt;User&gt; findAll(Pageable pageable);
}</code></pre>

  <h3>Пакетные операции</h3>
  <pre><code>@Modifying
@Query("UPDATE User u SET u.status = :status WHERE u.lastLogin < :date")
int bulkUpdateStatus(@Param("status") String status, @Param("date") LocalDate date);</code></pre>

  <h2>Управление транзакциями</h2>
  <ul>
    <li>Делайте транзакции как можно короче</li>
    <li>Используйте правильный уровень изоляции</li>
    <li>Помечайте read-only запросы аннотацией @Transactional(readOnly = true)</li>
  </ul>

  <h2>Кэширование</h2>
  <pre><code>@Cacheable("users")
public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
}

@CacheEvict(value = "users", key = "#user.id")
public void updateUser(User user) {
    userRepository.save(user);
}</code></pre>

  <h2>Мониторинг производительности</h2>
  <ul>
    <li>Анализируйте лог медленных запросов</li>
    <li>Включите статистику Hibernate: <code>spring.jpa.properties.hibernate.generate_statistics=true</code></li>
    <li>Регулярно проверяйте и оптимизируйте проблемные запросы</li>
  </ul>

  <h2>Оптимизация в JPA/Hibernate</h2>
  <h3>Решение проблемы N+1</h3>
  <pre><code>// Плохо (N+1 запрос)
List&lt;User&gt; users = userRepository.findAll();
users.forEach(user -> user.getOrders().size());

// Хорошо (FETCH JOIN)
@Query("SELECT u FROM User u JOIN FETCH u.orders")
List&lt;User&gt; findAllWithOrders();</code></pre>

  <h2>Оптимизация структуры базы данных</h2>
  <ul>
    <li>Применяйте нормализацию для уменьшения дублирования</li>
    <li>Рассмотрите контролируемую денормализацию для критичных запросов</li>
    <li>Выбирайте оптимальные типы данных для полей</li>
  </ul>

  <h2>Заключение</h2>
  <p>Оптимизация запросов - это постоянный процесс, требующий комплексного подхода, тестирования изменений и мониторинга результатов. Каждая база данных имеет свои особенности оптимизации, поэтому важно изучать документацию конкретной СУБД и использовать ее специфические возможности.</p>
</div>
`;