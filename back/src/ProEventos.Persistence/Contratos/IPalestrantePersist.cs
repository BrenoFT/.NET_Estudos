using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IPalestrantePersist
    {

        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string Nome, bool includeEventos);

        Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos);

        Task<Palestrante> GetPalestranteByAsync(int PalestranteId, bool includeEventos);

    }
}