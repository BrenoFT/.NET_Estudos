using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        /// <summary>
        /// Método get que retornará um alista de lotes por eventoId
        /// </summary>
        /// <param name="eventoId"></param>
        /// <returns>Lista de Lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);

        /// <summary>
        ///     Métodos get que retornará apenas 1 lote
        /// </summary>
        /// <param name="eventoId">Codigo chave da tabela Evento</param>
        /// /// <param name="id">Codigo chave do meu lote</param>
        /// <returns>Apenas 1 lote</returns>

        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
    }
}