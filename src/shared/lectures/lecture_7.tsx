export const lecture_7 = `
<div class="lecture-container">
  <h1>Лекция 7: Написание пользовательских SQL запросов в Java</h1>

  <p>Основные подходы к созданию запросов в Java включают: автоматически генерируемые запросы из имени метода, аннотацию @Query для JPQL и нативных SQL запросов, Specification API для динамических запросов, QueryDSL для типобезопасных запросов и нативные запросы через EntityManager. Рассмотрим каждый из этих подходов подробно.</p>

  <h2>Автоматически генерируемые запросы</h2>
  <p>Spring Data JPA может автоматически генерировать запросы на основе имен методов репозитория. Это самый простой способ, не требующий написания JPQL или SQL.</p>
  
  <pre><code>public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    // Найти по email
    User findByEmail(String email);
    // Найти всех с фамилией, игнорируя регистр
    List&lt;User&gt; findByLastNameIgnoreCase(String lastName);
    // Найти по имени и фамилии
    List&lt;User&gt; findByFirstNameAndLastName(String firstName, String lastName);
    // Найти пользователей с зарплатой больше указанной
    List&lt;User&gt; findBySalaryGreaterThan(BigDecimal salary);
    // Найти пользователей с зарплатой в диапазоне
    List&lt;User&gt; findBySalaryBetween(BigDecimal minSalary, BigDecimal maxSalary);
    // Найти по подстроке в имени
    List&lt;User&gt; findByFirstNameContaining(String pattern);
    // Посчитать количество пользователей с указанной фамилией
    long countByLastName(String lastName);
    // Удалить пользователей по фамилии
    void deleteByLastName(String lastName);
}</code></pre>

  <h3>Поддержка сортировки и пагинации</h3>
  <pre><code>public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    // Сортировка по одному полю
    List&lt;User&gt; findByLastNameOrderByFirstNameAsc(String lastName);
    // Сортировка по нескольким полям
    List&lt;User&gt; findByLastNameOrderByFirstNameAscSalaryDesc(String lastName);
    // Пагинация
    Page&lt;User&gt; findByLastName(String lastName, Pageable pageable);
    // Сортировка через параметр Sort
    List&lt;User&gt; findByLastName(String lastName, Sort sort);
}

@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public Page&lt;User&gt; getUsersByLastName(String lastName, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("firstName").ascending());
        return userRepository.findByLastName(lastName, pageRequest);
    }
}</code></pre>

  <h2>Аннотация @Query для JPQL и нативных запросов</h2>
  <p>Когда автоматически генерируемых запросов недостаточно, можно использовать аннотацию <code>@Query</code>.</p>

  <h3>JPQL запросы</h3>
  <pre><code>public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    // Простой JPQL запрос
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmailAddress(String email);
    
    // Именованные параметры
    @Query("SELECT u FROM User u WHERE u.firstName = :firstName OR u.email = :email")
    List&lt;User&gt; findByFirstNameOrEmail(@Param("firstName") String firstName, @Param("email") String email);
    
    // JOIN в JPQL
    @Query("SELECT u FROM User u JOIN u.department d WHERE d.name = :departmentName")
    List&lt;User&gt; findByDepartmentName(@Param("departmentName") String departmentName);
    
    // Модифицирующий запрос
    @Modifying
    @Query("UPDATE User u SET u.salary = u.salary * 1.1 WHERE u.department.id = :deptId")
    int giveRaiseToDepartment(@Param("deptId") Long departmentId);
}</code></pre>

  <h3>Нативные SQL запросы</h3>
  <pre><code>public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    // Нативный запрос
    @Query(value = "SELECT * FROM users WHERE email = ?1", nativeQuery = true)
    User findByEmailNative(String email);
    
    // Нативный запрос с JOIN
    @Query(value = "SELECT u.* FROM users u JOIN departments d ON u.department_id = d.id WHERE d.name = :departmentName", nativeQuery = true)
    List&lt;User&gt; findByDepartmentNameNative(@Param("departmentName") String departmentName);
    
    // Нативный модифицирующий запрос
    @Modifying
    @Query(value = "UPDATE users SET salary = salary * 1.1 WHERE department_id = :deptId", nativeQuery = true)
    int giveRaiseToDepartmentNative(@Param("deptId") Long departmentId);
}</code></pre>

  <h3>Проекции (DTO)</h3>
  <pre><code>// Интерфейсная проекция
public interface UserNameOnly {
    String getFirstName();
    String getLastName();
}

public interface UserRepository extends JpaRepository&lt;User, Long&gt; {
    // Проекция через интерфейс
    @Query("SELECT u.firstName as firstName, u.lastName as lastName FROM User u WHERE u.department.id = :deptId")
    List&lt;UserNameOnly&gt; findUserNamesByDepartmentId(@Param("deptId") Long departmentId);
}</code></pre>

  <h2>Specification API для динамических запросов</h2>
  <pre><code>public interface UserRepository extends JpaRepository&lt;User, Long&gt;, JpaSpecificationExecutor&lt;User&gt; {
}

@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List&lt;User&gt; findUsersByCriteria(String firstName, String lastName, BigDecimal minSalary) {
        return userRepository.findAll((root, query, cb) -> {
            List&lt;Predicate&gt; predicates = new ArrayList&lt;&gt;();
            if (firstName != null) {
                predicates.add(cb.like(root.get("firstName"), "%" + firstName + "%"));
            }
            if (lastName != null) {
                predicates.add(cb.equal(root.get("lastName"), lastName));
            }
            if (minSalary != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("salary"), minSalary));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }
}</code></pre>

  <h2>QueryDSL для типобезопасных запросов</h2>
  <pre><code>public interface UserRepository extends JpaRepository&lt;User, Long&gt;, QuerydslPredicateExecutor&lt;User&gt; {
}

@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public List&lt;User&gt; findUsersByQueryDsl(String firstName, String lastName) {
        QUser user = QUser.user;
        BooleanBuilder predicate = new BooleanBuilder();
        if (firstName != null) {
            predicate.and(user.firstName.containsIgnoreCase(firstName));
        }
        if (lastName != null) {
            predicate.and(user.lastName.eq(lastName));
        }
        return (List&lt;User&gt;) userRepository.findAll(predicate);
    }
}</code></pre>

  <h2>Нативные запросы через EntityManager</h2>
  <pre><code>@Repository
public class CustomUserRepositoryImpl implements CustomUserRepository {
    @PersistenceContext
    private EntityManager em;
    
    @Override
    public List&lt;User&gt; findCustomUsers() {
        return em.createNativeQuery("SELECT * FROM users WHERE salary > 1000", User.class).getResultList();
    }
}</code></pre>

  <h2>Заключение</h2>
  <p>Spring Data JPA предлагает множество способов создания запросов: от простых автоматически генерируемых до сложных динамических с Specification API и QueryDSL. Выбор метода зависит от сложности запроса и требований к гибкости и типобезопасности. Использование правильного подхода позволяет эффективно работать с данными, минимизируя boilerplate-код и снижая вероятность ошибок.</p>
</div>
`;