namespace DanceStudioDesktop
{
    public class Course(long id, string name, string type, int length, string instructor)
    {
        public long Id { get; } = id;
        public string Name { get; } = name;
        public string Type { get; } = type;
        public int Length { get; } = length;
        public string Instructor { get; } = instructor;
    }
}
