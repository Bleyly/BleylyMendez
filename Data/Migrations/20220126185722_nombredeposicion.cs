using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BleylyMendez.Data.Migrations
{
    public partial class nombredeposicion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NomreDePosicion",
                table: "Empleados",
                newName: "NombreDePosicion");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NombreDePosicion",
                table: "Empleados",
                newName: "NomreDePosicion");
        }
    }
}
