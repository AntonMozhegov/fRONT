export const lab_5 = `
<h1>Лабораторная работа 5: Транзакции и кэширование в Spring Boot приложении с PostgreSQL</h1>

<h2>1. Настройка транзакций</h2>

<ol>
  <li><strong>Активация транзакций</strong>
    <pre><code class="language-java">
@EnableTransactionManagement
@SpringBootApplication
public class Application { ... }
    </code></pre>
  </li>

  <li><strong>Простая транзакция</strong>
    <pre><code class="language-java">
@Transactional
public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    Account from = accountRepository.findById(fromId).orElseThrow(...);
    Account to = accountRepository.findById(toId).orElseThrow(...);

    from.withdraw(amount);
    to.deposit(amount);

    accountRepository.saveAll(List.of(from, to));
}
    </code></pre>
  </li>

  <li><strong>Уровни изоляции</strong>
    <pre><code class="language-java">
@Transactional(isolation = Isolation.SERIALIZABLE)
public void criticalOperation() { ... }
    </code></pre>
  </li>

  <li><strong>Параметры propagation</strong>
    <pre><code class="language-java">
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void auditLog(String action) { ... }
    </code></pre>
  </li>

  <li><strong>Только для чтения</strong>
    <pre><code class="language-java">
@Transactional(readOnly = true)
public List&lt;Account&gt; getAllAccounts() { ... }
    </code></pre>
  </li>

  <li><strong>Ручное управление</strong>
    <pre><code class="language-java">
@Autowired
private TransactionTemplate transactionTemplate;

public void manualTransaction() {
    transactionTemplate.execute(status  {
        // Бизнес-логика
        return null;
    });
}
    </code></pre>
  </li>

  <li><strong>Таймаут транзакции</strong>
    <pre><code class="language-java">
@Transactional(timeout = 30)
public void longRunningProcess() { ... }
    </code></pre>
  </li>

  <li><strong>Обработка исключений</strong>
    <pre><code class="language-java">
@Transactional(rollbackFor = BusinessException.class)
public void processOrder() throws BusinessException { ... }
    </code></pre>
  </li>

  <li><strong>Неоткатываемые исключения</strong>
    <pre><code class="language-java">
@Transactional(noRollbackFor = IllegalArgumentException.class)
    </code></pre>
  </li>

  <li><strong>Транзакции в тестах</strong>
    <pre><code class="language-java">
@SpringBootTest
@Transactional
class AccountServiceTest { ... }
    </code></pre>
  </li>

  <li><strong>Распределенные транзакции (JTA)</strong>
    <pre><code class="language-properties">
spring.jta.enabled=true
    </code></pre>
  </li>

  <li><strong>Синхронизация с БД</strong>
    <pre><code class="language-java">
entityManager.flush();
    </code></pre>
  </li>

  <li><strong>Точки сохранения (Savepoints)</strong>
    <pre><code class="language-java">
Object savepoint = TransactionAspectSupport.currentTransactionStatus().createSavepoint();
// ...
TransactionAspectSupport.currentTransactionStatus().rollbackToSavepoint(savepoint);
    </code></pre>
  </li>

  <li><strong>Логирование транзакций</strong>
    <pre><code class="language-properties">
logging.level.org.springframework.transaction.interceptor=TRACE
    </code></pre>
  </li>

  <li><strong>Оптимизация bulk-операций</strong>
    <pre><code class="language-java">
@Transactional
public void bulkInsert(List&lt;Entity&gt; items) {
    items.forEach(entityManager::persist);
    entityManager.flush();
    entityManager.clear();
}
    </code></pre>
  </li>
</ol>

<h2>2. Настройка кэширования</h2>

<ol start="16">
  <li><strong>Активация кэширования</strong>
    <pre><code class="language-java">
@EnableCaching
@SpringBootApplication
public class Application { ... }
    </code></pre>
  </li>

  <li><strong>Простое кэширование</strong>
    <pre><code class="language-java">
@Cacheable("products")
public Product getProductById(Long id) {
    return productRepository.findById(id).orElseThrow(...);
}
    </code></pre>
  </li>

  <li><strong>Ключи кэша</strong>
    <pre><code class="language-java">
@Cacheable(value = "products", key = "#root.methodName + #id")
    </code></pre>
  </li>

  <li><strong>Условное кэширование</strong>
    <pre><code class="language-java">
@Cacheable(value = "products", condition = "#id > 10")
    </code></pre>
  </li>

  <li><strong>Обновление кэша</strong>
    <pre><code class="language-java">
@CachePut(value = "products", key = "#result.id")
public Product updateProduct(Product product) { ... }
    </code></pre>
  </li>

  <li><strong>Инвалидация кэша</strong>
    <pre><code class="language-java">
@CacheEvict(value = "products", key = "#id")
public void deleteProduct(Long id) { ... }
    </code></pre>
  </li>

  <li><strong>Очистка всего кэша</strong>
    <pre><code class="language-java">
@CacheEvict(value = "products", allEntries = true)
public void reloadAllProducts() { ... }
    </code></pre>
  </li>

  <li><strong>Многоуровневое кэширование</strong>
    <pre><code class="language-java">
@Caching(evict = {
    @CacheEvict("primary"),
    @CacheEvict("secondary")
})
    </code></pre>
  </li>

  <li><strong>Настройка TTL</strong>
    <pre><code class="language-properties">
spring.cache.caffeine.spec=maximumSize=500,expireAfterWrite=10m
    </code></pre>
  </li>

  <li><strong>Ручное управление</strong>
    <pre><code class="language-java">
@Autowired
private CacheManager cacheManager;

public void clearCache(String cacheName) {
    cacheManager.getCache(cacheName).clear();
}
    </code></pre>
  </li>
</ol>

<h2>Пример интеграции</h2>

<pre><code class="language-java">
@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    @Transactional(isolation = Isolation.READ_COMMITTED)
    @CacheEvict(value = "accounts", key = "#fromId + #toId")
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        // Логика перевода
    }

    @Cacheable(value = "accounts", sync = true)
    @Transactional(readOnly = true)
    public Account getAccount(Long id) {
        return accountRepository.findById(id).orElseThrow(...);
    }
}
</code></pre>

<h2>Вывод</h2>
<p>
  В ходе работы были реализованы:
</p>
<ul>
  <li>Полноценное управление транзакциями с различными уровнями изоляции</li>
  <li>Гибкая система кэширования с ручным и автоматическим управлением</li>
  <li>Оптимизация производительности за счет комбинации подходов</li>
  <li>Обработка исключительных ситуаций в распределенных операциях</li>
</ul>
`;