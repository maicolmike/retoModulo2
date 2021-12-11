import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Persona,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaPersonaController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Venta.prototype.id,
  ): Promise<Persona> {
    return this.ventaRepository.persona(id);
  }
}
