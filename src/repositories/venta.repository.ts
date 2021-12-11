import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Venta, VentaRelations, Productos, Persona} from '../models';
import {ProductosRepository} from './productos.repository';
import {PersonaRepository} from './persona.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly productos: HasOneRepositoryFactory<Productos, typeof Venta.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Venta, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.productos = this.createHasOneRepositoryFactoryFor('productos', productosRepositoryGetter);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
