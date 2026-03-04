namespace DanceStudioDesktop
{
    public class Program
    {
        [STAThread]
        public static void Main(string[] args)
        {
            if (args.Length > 0 && args[0] == "--stat")
            {
                Statisztika statistics = new();
                statistics.Run();
                return;
            }
            var app = new App();
            app.InitializeComponent();
            app.Run();
        }
    }
}
