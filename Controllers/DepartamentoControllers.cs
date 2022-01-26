using BleylyMendez.Data;
using BleylyMendez.Models;
using Microsoft.AspNetCore.Mvc;

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
        return Ok(_context.Departamentos.ToList());
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
        var departamentoCreated = _context.Departamentos.Add(departamento).Entity;
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetDepartamento), new { id = departamentoCreated.Id }, departamentoCreated);
    }

    //Put
    [HttpPut("{id}")]

    public ActionResult PutDepartamento(int id, [FromBody] Departamento updatedDepartamento)
    {
        var departamento = _context.Departamentos.Find(id);
        if (departamento is null)
        {
            return NotFound();
        }

        departamento.Nombre = updatedDepartamento.Nombre;
        departamento.Descripcion = updatedDepartamento.Descripcion;

        _context.Departamentos.Update(departamento);
        _context.SaveChanges();

        return Ok(departamento);
    }

    //Delete
    [HttpDelete("{id}")]
    public ActionResult DeleteDepartamento(int id)
    {
        var departamento = _context.Departamentos.Find(id);
        if (departamento is null)
        {
            return NotFound();
        }
        _context.Departamentos.Remove(departamento);
        _context.SaveChanges();

        return Ok();
    }

}