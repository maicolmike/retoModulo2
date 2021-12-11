import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Venta,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaVentaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Persona has many Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Venta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.personaRepository.ventas(id).find(filter);
  }

  @post('/personas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) venta: Omit<Venta, 'id'>,
  ): Promise<Venta> {
    return this.personaRepository.ventas(id).create(venta);
  }

  @patch('/personas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Persona.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.personaRepository.ventas(id).patch(venta, where);
  }

  @del('/personas/{id}/ventas', {
    responses: {
      '200': {
        description: 'Persona.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.personaRepository.ventas(id).delete(where);
  }
}
