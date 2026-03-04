using MySql.Data.MySqlClient;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace DanceStudioDesktop
{
    public partial class MainWindow : Window
    {
        private List<Course> courses = [];
        public MainWindow()
        {
            InitializeComponent();
            LoadData();
        }

        public void LoadData()
        {
            CoursesDataGrid.ItemsSource = null;
            CoursesDataGrid.SelectedItem = null;
            try
            {
                courses = Statisztika.LoadCourses();
                CoursesDataGrid.ItemsSource = courses;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba történt az adatok betöltésekor: " + ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                Application.Current.Shutdown();
            }
        }

        private void DeleteCourse(object sender, RoutedEventArgs e)
        {
            var selectedCourse = (Course)CoursesDataGrid.SelectedItem;
            if(selectedCourse == null)
            {
                MessageBox.Show("Törléshez először válasszon ki kurzust!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                using var connection = new MySqlConnection(Statisztika.ConnectionString);
                connection.Open();

                string query = @"
                    START TRANSACTION;
                    DELETE FROM applications WHERE course_id = @id;
                    DELETE FROM courses WHERE id = @id;
                    COMMIT;
                ";
                using var command = new MySqlCommand(query, connection);
                command.Parameters.AddWithValue("@id", selectedCourse.Id);
                command.ExecuteNonQuery();
            } catch(Exception ex)
            {
                MessageBox.Show(ex.Message, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            } finally
            {
                LoadData();
            }
        }
    }
}