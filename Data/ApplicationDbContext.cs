using BleylyMendez.Models;
using Microsoft.EntityFrameworkCore;

namespace BleylyMendez.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Empleado> Empleados { get; set; }
    public DbSet<Departamento> Departamentos { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }
}