namespace BleylyMendez.Models;

public class EmpleadoDTO
{
    public int Id { get; set; }
    public string Nombre { get; set; } = "";
    public string Apellido { get; set; } = "";
    public string Cedula { get; set; } = "";
    public DateTime FechaDeNacimiento { get; set; }
    public string NombreDePosicion { get; set; } = "";
    public int? DepartamentoId { get; set; }
}