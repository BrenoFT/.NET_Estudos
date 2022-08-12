using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Data;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public readonly DataContext _Context;

        public EventoController(DataContext context)
        {
            _Context = context;
    
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _Context.Eventos;
        }

        [HttpGet("{id}")]
        public Evento GetById(int id)
        {
            return _Context.Eventos.FirstOrDefault(evento => evento.EventoId == id);
        }

    }
}
