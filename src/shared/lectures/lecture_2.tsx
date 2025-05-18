export const lecture_2 = `
<h1>Лекция 2: Подключение базы данных к Java с помощью JDBC</h1>

<p>В рамках данной лекции будет рассмотрена технология JDBC (Java Database Connectivity) и её использование для подключения баз данных к Java-приложениям. JDBC представляет собой стандартный программный интерфейс, который позволяет Java-приложениям взаимодействовать с различными системами управления базами данных (СУБД).</p>

<p>Основная цель данной лекции — изучение процесса настройки окружения, подключения к базе данных, выполнения простых и сложных SQL-запросов, а также рассмотрение вопросов безопасности, производительности, транзакций и лучших практик работы с JDBC.</p>

<h2>Подготовка рабочей среды</h2>

<p>Для начала работы с JDBC необходимо подготовить рабочую среду:</p>

<ol>
  <li>
    <p><strong>Установка базы данных</strong></p>
    <p>Рекомендуется использовать <strong>MySQL</strong>. Также можно использовать H2 — встраиваемую БД, которая работает в памяти и не требует установки.</p>
  </li>
  <li>
    <p><strong>Установка JDK и IDE</strong></p>
    <p>Например, JDK 8+ и IntelliJ IDEA. Убедитесь, что версия JDK совместима с JDBC-драйвером.</p>
  </li>
  <li>
    <p><strong>Подключение драйвера JDBC</strong></p>
    <p>Для MySQL — <code>mysql-connector-java</code>.</p>
    <p>Maven:</p>
    <pre><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;mysql&lt;/groupId&gt;
    &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
    &lt;version&gt;8.0.33&lt;/version&gt;
&lt;/dependency&gt;</code></pre>

    <p>Gradle:</p>
    <pre><code class="language-groovy">implementation 'mysql:mysql-connector-java:8.0.33'</code></pre>
  </li>
</ol>

<h2>Подключение к базе данных</h2>

<h3>1. Загрузка драйвера</h3>

<pre><code class="language-java">Class.forName("com.mysql.cj.jdbc.Driver");</code></pre>

<h3>2. Строка подключения</h3>

<pre><code class="language-text">jdbc:mysql://localhost:3306/mydatabase</code></pre>

<p>С параметрами:</p>
<pre><code class="language-text">jdbc:mysql://localhost:3306/mydatabase?serverTimezone=UTC&amp;useSSL=false&amp;autoReconnect=true&amp;characterEncoding=UTF-8</code></pre>

<h3>3. Учётные данные</h3>

<p>Используйте безопасные логин и пароль, по возможности — не root.</p>

<h3>4. Установление соединения</h3>

<pre><code class="language-java">import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase?serverTimezone=UTC";
        String username = "root";
        String password = "your_password";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            System.out.println("Подключение к базе данных успешно установлено!");
        } catch (SQLException e) {
            System.err.println("Ошибка подключения к базе данных: " + e.getMessage());
        }
    }
}</code></pre>

<p>Здесь используется <strong>try-with-resources</strong> — соединение автоматически закрывается.</p>

<h2>Выполнение SQL-запросов</h2>

<p>Для этого используется объект <code>Statement</code>:</p>

<pre><code class="language-java">Statement statement = connection.createStatement();
ResultSet resultSet = statement.executeQuery("SELECT * FROM users");</code></pre>

<h3>Пример: извлечение всех пользователей</h3>

<pre><code class="language-java">import java.sql.*;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase?serverTimezone=UTC";
        String username = "root";
        String password = "your_password";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM users");

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                int age = resultSet.getInt("age");

                System.out.println("ID: " + id + ", Имя: " + name + ", Возраст: " + age);
            }
        } catch (SQLException e) {
            System.err.println("Ошибка выполнения запроса: " + e.getMessage());
        }
    }
}</code></pre>

<h3>Пример с фильтрацией (WHERE age &gt; 18)</h3>

<pre><code class="language-java">import java.sql.*;

public class Main {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase?serverTimezone=UTC";
        String username = "root";
        String password = "your_password";

        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT * FROM users WHERE age > 18");

            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                int age = resultSet.getInt("age");

                System.out.println("ID: " + id + ", Имя: " + name + ", Возраст: " + age);
            }
        } catch (SQLException e) {
            System.err.println("Ошибка выполнения запроса: " + e.getMessage());
        }
    }
}</code></pre>

<h2>Вывод лекции</h2>

<p>В рамках лекции рассматривается технология JDBC как стандартный программный интерфейс для подключения баз данных к Java-приложениям и её использование для выполнения SQL-запросов с акцентом на:</p>

<ul>
  <li>настройку окружения</li>
  <li>подключение к базе данных</li>
  <li>выполнение запросов</li>
  <li>вопросы безопасности, производительности и транзакций</li>
</ul>

<p>Для начала работы необходимо:</p>

<ul>
  <li>установить СУБД (например, MySQL или H2)</li>
  <li>установить JDK и IDE</li>
  <li>подключить драйвер JDBC через Maven или Gradle</li>
</ul>

<p>Затем выполняется подключение к базе данных с использованием строки подключения URL, учётных данных и класса <code>DriverManager</code>, что приводит к созданию объекта <code>Connection</code>.</p>

<p>Выполнение SQL-запросов осуществляется с помощью объекта <code>Statement</code>:</p>
<ul>
  <li><code>executeQuery</code> — для извлечения данных через <code>ResultSet</code></li>
  <li><code>executeUpdate</code> — для изменения данных</li>
</ul>

<p>Работа с <code>ResultSet</code> осуществляется через методы <code>next()</code> и <code>getXXX()</code>, также приведены примеры простой и фильтрованной выборки.</p>

<p>Особое внимание уделено:</p>
<ul>
  <li>обработке исключений</li>
  <li>автоматическому закрытию соединений</li>
  <li>безопасности и корректной работе с драйверами</li>
</ul>
`;