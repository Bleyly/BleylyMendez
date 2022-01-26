using BleylyMendez.Data;
using BleylyMendez.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BleylyMendez.Controllers;
[ApiController]
[Route("api/empleados")]

public class EmpleadosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EmpleadosController(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    //Get
    [HttpGet]
    public ActionResult<List<Empleado>> GetEmpleados()
    {
        return Ok(
            _context.Empleados.Include(empleado => empleado.Departamento).ToList()
        );
    }

    //Get
    [HttpGet("{id}")]
    public ActionResult<Empleado> GetEmpleado(int id)
    {
        var empleado = _context.Empleados.Find(id);
        if (empleado is null)
        {
            return NotFound();
        }
        return Ok(empleado);
    }

    //Post 
    [HttpPost]
    public ActionResult PostEmpleado([FromBody] EmpleadoDTO empleadodto)
    {
        Empleado empleado = new();

        empleado.Nombre = empleadodto.Nombre;
        empleado.Apellido = empleadodto.Apellido;
        empleado.Cedula = empleadodto.Cedula;
        empleado.FechaDeNacimiento = empleadodto.FechaDeNacimiento;
        empleado.NombreDePosicion = empleadodto.NombreDePosicion;
        empleado.DepartamentoId = empleadodto.DepartamentoId;

        var empleadoCreated = _context.Empleados.Add(empleado).Entity;
        _context.SaveChanges();

        _context.Entry(empleadoCreated).Reference(empleado => empleado.Departamento).Load();

        return CreatedAtAction(nameof(GetEmpleado), new { id = empleadoCreated.Id }, empleadoCreated);

    }

    //Put
    [HttpPut("{id}")]
    public ActionResult PutEmpleado(int id, [FromBody] EmpleadoDTO updatedEmpleado)
    {
        var empleado = _context.Empleados.Find(id);
        if (empleado is null)
        {
            return NotFound();
        }
        empleado.Nombre = updatedEmpleado.Nombre;
        empleado.Apellido = updatedEmpleado.Apellido;
        empleado.Cedula = updatedEmpleado.Cedula;
        empleado.FechaDeNacimiento = updatedEmpleado.FechaDeNacimiento;
        empleado.NombreDePosicion = updatedEmpleado.NombreDePosicion;
        empleado.DepartamentoId = updatedEmpleado.DepartamentoId;

        _context.Empleados.Update(empleado);
        _context.SaveChanges();

        _context.Entry(empleado).Reference(empleado => empleado.Departamento).Load();

        return Ok(empleado);
    }

    //Delete
    [HttpDelete("{id}")]
    public ActionResult DeleteEmpleado(int id)
    {
        var empleado = _context.Empleados.Find(id);
        if (empleado is null)
        {
            return NotFound();
        }
        _context.Empleados.Remove(empleado);
        _context.SaveChanges();

        return Ok();
    }
}