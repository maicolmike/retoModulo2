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
  Venta,
  Productos,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaProductosController {
  constructor(
    @repository(VentaRepository) protected ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Venta has one Productos',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Productos),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos> {
    return this.ventaRepository.productos(id).get(filter);
  }

  @post('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Venta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Venta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInVenta',
            exclude: ['id'],
            optional: ['ventaId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.ventaRepository.productos(id).create(productos);
  }

  @patch('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Venta.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.ventaRepository.productos(id).patch(productos, where);
  }

  @del('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Venta.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.ventaRepository.productos(id).delete(where);
  }
}
