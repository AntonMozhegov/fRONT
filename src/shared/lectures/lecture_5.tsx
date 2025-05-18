export const lecture_5 = `<h1>Лекция 5: Оптимизация доступа к данным: ускорение работы с БД в Java</h1>

<p>Кэширование — это одна из ключевых техник оптимизации производительности в разработке приложений, особенно тех, которые активно взаимодействуют с базами данных, такими как приложения, использующие Spring Data JPA. Оно позволяет временно сохранять часто используемые данные в быстродоступной памяти, чтобы уменьшить количество обращений к более медленным источникам данных, таким как базы данных, внешние API или файловые системы.</p>

<p>В контексте Spring Data JPA кэширование играет важную роль в повышении скорости выполнения запросов, снижении нагрузки на базу данных и улучшении пользовательского опыта.</p>

<h2>Основы кэширования</h2>

<p>Кэширование — это процесс сохранения данных, которые часто запрашиваются или дорогостоящи в вычислительном плане, в специальном хранилище (кэше), чтобы последующие запросы к этим данным обслуживались быстрее. Кэш представляет собой промежуточный слой между приложением и источником данных, который работает как временное хранилище с быстрым доступом.</p>

<p>Пример простейшего сценария кэширования: приложение часто запрашивает список всех активных пользователей из базы данных. Без кэширования каждый запрос будет вызывать выполнение SQL-запроса, что может быть дорогостоящим, особенно если данные редко меняются. С кэшированием результат запроса сохраняется в кэше, и последующие запросы обслуживаются из кэша, а не из базы данных, пока данные в кэше остаются актуальными.</p>

<h2>Принципы кэширования</h2>

<p>Кэширование основано на нескольких фундаментальных принципах, которые определяют его эффективность и применимость:</p>

<ul>
  <li><strong>Локальность данных</strong> — предполагает, что данные, которые были недавно запрошены, с высокой вероятностью будут запрошены снова в ближайшее время (временная локальность), или что данные, близкие к уже запрошенным, также могут быть запрошены (пространственная локальность).</li>
  
  <li><strong>Скорость доступа</strong> — кэш обычно размещается в более быстрой памяти (например, оперативной памяти или SSD), чем источник данных (например, база данных на жёстком диске или удалённый сервер).</li>
  
  <li><strong>Согласованность данных</strong> — данные в кэше должны быть актуальными или допускать контролируемую степень устаревания.</li>
  
  <li><strong>Ограниченность ресурсов</strong> — кэш имеет ограниченный объём памяти, поэтому необходимо эффективно управлять его содержимым, удаляя устаревшие или редко используемые данные.</li>
</ul>

<h2>Уровни кэширования в Spring Data JPA</h2>

<p>В приложениях, использующих Spring Data JPA, кэширование может быть реализовано на нескольких уровнях:</p>

<ul>
  <li><strong>Кэш первого уровня (First-Level Cache)</strong> — встроенный кэш, предоставляемый JPA-провайдером (обычно Hibernate). Он автоматически включён и работает в рамках одной сессии EntityManager (или одной транзакции). Этот кэш хранит сущности, загруженные в рамках текущей сессии, чтобы избежать повторных запросов к базе данных для тех же данных.</li>
  
  <li><strong>Кэш второго уровня (Second-Level Cache)</strong> — опциональный кэш, также предоставляемый JPA-провайдером, но работающий на уровне всей EntityManagerFactory. Этот кэш общий для всех сессий и транзакций в приложении, что позволяет кэшировать данные между различными запросами и пользователями.</li>
  
  <li><strong>Кэш запросов (Query Cache)</strong> — специальный кэш, который используется для хранения результатов запросов (JPQL, Criteria API или нативных SQL-запросов).</li>
  
  <li><strong>Кэш приложения (Application-Level Cache)</strong> — кэш, реализованный на уровне приложения с использованием Spring Cache Abstraction или внешних кэш-систем, таких как Redis, Memcached или Caffeine.</li>
</ul>

<h2>Интеграция кэширования с Spring Framework</h2>

<p>Spring Framework предоставляет мощную абстракцию для работы с кэшем — Spring Cache Abstraction, которая интегрируется с Spring Data JPA и позволяет легко добавлять кэширование в приложение. Основные компоненты Spring Cache Abstraction включают:</p>

<ul>
  <li><strong>CacheManager</strong> — интерфейс, который управляет кэшами в приложении.</li>
  <li><strong>Cache</strong> — интерфейс, представляющий конкретный кэш, в котором хранятся данные.</li>
  <li><strong>Аннотации</strong> — декларативные инструменты для управления кэшем.</li>
</ul>

<p>Для начала работы с кэшированием в Spring необходимо включить поддержку кэша в приложении:</p>

<code>
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
}
</code>

<h2>Аннотации для управления кэшем</h2>

<p>Spring Cache Abstraction предоставляет несколько аннотаций для управления кэшем:</p>

<h3>@Cacheable</h3>

<p>Указывает, что результат выполнения метода должен быть закэширован. Если метод вызывается повторно с теми же параметрами, результат будет взят из кэша:</p>

<code>
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Cacheable(value = "users", key = "#id")
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
</code>

<p>Дополнительные параметры @Cacheable:</p>
<ul>
  <li><code>condition</code> — условие, при котором результат будет кэшироваться (например, <code>condition = "#id > 0"</code>).</li>
  <li><code>unless</code> — условие, при котором результат не будет кэшироваться (например, <code>unless = "#result == null"</code>).</li>
  <li><code>sync</code> — включает синхронизацию для предотвращения одновременного выполнения метода несколькими потоками.</li>
</ul>

<h3>@CachePut</h3>

<p>Обновляет данные в кэше, не проверяя, есть ли они там уже. Этот метод всегда выполняется, а его результат записывается в кэш:</p>

<code>
@CachePut(value = "users", key = "#user.id")
public User updateUser(User user) {
    return userRepository.save(user);
}
</code>

<h3>@CacheEvict</h3>

<p>Удаляет данные из кэша. Это полезно, когда данные в источнике изменились, и кэш нужно обновить:</p>

<code>
@CacheEvict(value = "users", key = "#id")
public void deleteUser(Long id) {
    userRepository.deleteById(id);
}
</code>

<p>Дополнительные параметры @CacheEvict:</p>
<ul>
  <li><code>allEntries = true</code> — удаляет все записи из указанного кэша.</li>
  <li><code>beforeInvocation = true</code> — удаляет данные из кэша до выполнения метода.</li>
</ul>

<h3>@Caching</h3>

<p>Позволяет комбинировать несколько операций кэширования в одном методе:</p>

<code>
import org.springframework.cache.annotation.Caching;

@Caching(
    put = @CachePut(value = "users", key = "#user.id"),
    evict = @CacheEvict(value = "activeUsers", key = "#user.id")
)
public User updateUserStatus(User user) {
    return userRepository.save(user);
}
</code>

<h2>Настройка кэш-провайдеров</h2>

<p>Spring Cache Abstraction поддерживает несколько популярных провайдеров:</p>

<h3>ConcurrentMapCacheManager</h3>

<p>Встроенный кэш-провайдер, использующий ConcurrentHashMap для хранения данных. Подходит для небольших приложений или тестирования:</p>

<code>
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "activeUsers");
    }
}
</code>

<h3>Ehcache</h3>

<p>Популярный кэш-провайдер, поддерживающий настройку через XML-файл или программно:</p>

<p>Зависимость:</p>
<code>
&lt;dependency&gt;
    &lt;groupId&gt;org.ehcache&lt;/groupId&gt;
    &lt;artifactId&gt;ehcache&lt;/artifactId&gt;
&lt;/dependency&gt;
</code>

<p>Пример настройки через XML (ehcache.xml):</p>
<code>
&lt;config&gt;
    &lt;cache name="users" maxEntriesLocalHeap="1000" timeToLiveSeconds="3600"/&gt;
    &lt;cache name="activeUsers" maxEntriesLocalHeap="500" timeToLiveSeconds="1800"/&gt;
&lt;/config&gt;
</code>

<p>Конфигурация в Spring:</p>
<code>
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new EhCacheCacheManager(ehCacheManager());
    }

    @Bean
    public EhCacheManagerFactoryBean ehCacheManager() {
        EhCacheManagerFactoryBean factory = new EhCacheManagerFactoryBean();
        factory.setConfigLocation(new ClassPathResource("ehcache.xml"));
        factory.setShared(true);
        return factory;
    }
}
</code>

<h3>Caffeine</h3>

<p>Современный высокопроизводительный кэш-провайдер, часто используемый вместо Ehcache:</p>

<p>Зависимость:</p>
<code>
&lt;dependency&gt;
    &lt;groupId&gt;com.github.ben-manes.caffeine&lt;/groupId&gt;
    &lt;artifactId&gt;caffeine&lt;/artifactId&gt;
&lt;/dependency&gt;
</code>

<p>Пример настройки:</p>
<code>
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.caffeine.CaffeineCacheManager;

@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager("users", "activeUsers");
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .maximumSize(1000)
                .expireAfterWrite(Duration.ofMinutes(60)));
        return cacheManager;
    }
}
</code>

<h2>Вывод лекции</h2>

<p>Кэширование является мощным инструментом оптимизации доступа к данным в Java-приложениях, особенно при работе с базами данных через Spring Data JPA. Оно позволяет значительно повысить производительность, снизить нагрузку на базу данных и улучшить отзывчивость приложения.</p>

<p>Правильно настроенное кэширование может обеспечить многократное ускорение работы приложения, особенно в сценариях с частыми повторяющимися запросами к неизменным или редко изменяющимся данным. Spring Framework предоставляет удобную абстракцию для работы с кэшем, позволяя декларативно управлять кэшированием с помощью аннотаций и гибко настраивать различные кэш-провайдеры.</p>

<p>При внедрении кэширования важно учитывать особенности конкретного приложения, характер данных, частоту их изменения и требования к согласованности, чтобы выбрать оптимальную стратегию кэширования и избежать проблем с устаревшими данными. Кроме того, необходимо регулярно мониторить и анализировать эффективность кэширования, чтобы при необходимости корректировать его настройки.</p>
`;
