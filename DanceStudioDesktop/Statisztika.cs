using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.BC;

namespace DanceStudioDesktop
{
    public class Statisztika
    {
        private List<Course> courses = [];
        public static readonly string ConnectionString = "server=localhost;user=petrik;password=petrik;database=dancestudio";

        public static List<Course> LoadCourses()
        {
            using var connection = new MySqlConnection(ConnectionString);
            connection.Open();
            List<Course> coursesData = [];
            string query = "SELECT id, name, type, length, instructor FROM courses";
            using var command = new MySqlCommand(query, connection);
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                long id = reader.GetInt64("id");
                string name = reader.GetString("name");
                string type = reader.GetString("type");
                int length = reader.GetInt32("length");
                string instructor = reader.GetString("instructor");
                coursesData.Add(new Course(id, name, type, length, instructor));
            }

            return coursesData;
        }

        public void Run()
        {
            try
            {
                courses = LoadCourses();
            } catch (Exception ex)
            {
                Console.WriteLine("Hiba történt az adatok betöltésekor: " + ex.Message);
                return;
            }

            GroupCourses();
            LongestCourse();
            CourseInstructor();

            Console.WriteLine("Nyomjon meg egy gombot a kilépéshez...");
            Console.ReadLine();
        }

        public void GroupCourses()
        {
            Console.WriteLine("Csoportos kurzusok száma: " + courses.Count(c => c.Type == "group"));
            Course? longest = courses.OrderByDescending(c => c.Length).FirstOrDefault();
        }

        public void LongestCourse()
        {
            Course? longest = courses.OrderByDescending(c => c.Length).FirstOrDefault();
            if (longest != null)
            {
                Console.Write($"\tNév: {longest.Name}\n");
                Console.Write($"\tTípus: {longest.Type}\n");
                Console.Write($"\tHossz: {longest.Length}\n");
                Console.Write($"\tOktató: {longest.Instructor}\n");
            }
            Console.Write("Adja meg egy kurzus nevét: ");
        }

        public void CourseInstructor()
        {
            Console.Write("Adja meg egy kurzus nevét: ");
            string input = Console.ReadLine() ?? "";
            Course? found = courses.FirstOrDefault(c => c.Name.Equals(input, StringComparison.OrdinalIgnoreCase));
            if (found == null)
            {
                Console.WriteLine("Nincs ilyen kurzus.");
            }
            else
            {
                Console.WriteLine("A megadott kurzus oktatója: " + found.Instructor);
            }
        }
    }
}
