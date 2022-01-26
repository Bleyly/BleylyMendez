using BleylyMendez.Data;
using BleylyMendez.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BleylyMendez.Controllers;

[ApiController]
[Route("api/departamentos")]

public class DepartamentosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DepartamentosController(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    //Get
    [HttpGet]
    public ActionResult<List<Departamento>>
    GetDepartamento()
    {
        return Ok(_context.Departamentos.Include(departamento => departamento.Empleados).ToList());
    }
    //Get
    [HttpGet("{id}")]
    public ActionResult<Departamento> GetDepartamento(int id)
    {
        var departamento = _context.Departamentos.Find(id);
        if (departamento is null)
        {
            return NotFound();
        }
        return Ok(departamento);
    }

    //Post
    public ActionResult PostDepartamento([FromBody] Departamento departamento)
    {
        foreach (var empleado in departamento.Empleados)
        {
            empleado.DepartamentoId = departamento.Id;
            empleado.Departamento = departamento;
        }

        _context.Empleados.UpdateRange(departamento.Empleados);

        var departamentoCreated = _context.Departamentos.Add(departamento).Entity;
        _context.SaveChanges();


        return CreatedAtAction(nameof(GetDepartamento), new { id = departamentoCreated.Id }, departamentoCreated);
    }

    //Put
    [HttpPut("{id}")]

    public ActionResult PutDepartamento(int id, [FromBody] Departamento updatedDepartamento)
    {
        var departamento = _context.Departamentos.Include(departamento => departamento.Empleados).FirstOrDefault(departamento => departamento.Id == id);
        if (departamento is null)
        {
            return NotFound();
        }

        departamento.Nombre = updatedDepartamento.Nombre;
        departamento.Descripcion = updatedDepartamento.Descripcion;
        var empleados = departamento.Empleados.ToList();

        empleados.ForEach(empleado =>
        {
            if (!updatedDepartamento.Empleados.Any(e => e.Id == empleado.Id))
            {
                empleado.DepartamentoId = null;
                empleado.Departamento = null;
            }
        });

        foreach (var empleado in updatedDepartamento.Empleados)
        {
            if (!empleados.Any(e => e.Id == empleado.Id))
            {
                empleado.DepartamentoId = id;
                empleado.Departamento = departamento;

                empleados.Add(empleado);
            }
        }

        departamento.Empleados = empleados;
        _context.Departamentos.Update(departamento);
        _context.SaveChanges();

        return Ok(departamento);
    }

    //Delete
    [HttpDelete("{id}")]
    public ActionResult DeleteDepartamento(int id)
    {
        var departamento = _context.Departamentos.Include(departamento => departamento.Empleados).FirstOrDefault(departamento => departamento.Id == id);
        if (departamento is null)
        {
            return NotFound();
        }
        foreach (var empleado in departamento.Empleados)
        {
            empleado.DepartamentoId = null;
            empleado.Departamento = null;
        }

        _context.Empleados.UpdateRange(departamento.Empleados);
        _context.Departamentos.Remove(departamento);
        _context.SaveChanges();

        return Ok();
    }

}