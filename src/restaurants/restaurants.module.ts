import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Restaurant } from './entities/restaurant.entity'
import { CategoryResolver, DishResolver, RestaurantResolver } from './restaurants.resolver'
import { RestaurantService } from './restaurants.service'
import { CategoryRepository } from './repositories/category.repository'
import { Category } from './entities/category.entity'
import { Dish } from './entities/dish.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant, Category, Dish])],
    providers: [RestaurantResolver, CategoryRepository, CategoryResolver, DishResolver, RestaurantService],
})
export class RestaurantsModule {}
