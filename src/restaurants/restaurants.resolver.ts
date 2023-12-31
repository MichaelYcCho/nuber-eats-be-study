import { SetMetadata } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthUser } from 'src/auth/auth-user.decorator'
import { Role } from 'src/auth/role.decorator'
import { User, UserRole } from 'src/users/entities/user.entity'
import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant.dto'
import { Restaurant } from './entities/restaurant.entity'
import { RestaurantService } from './restaurants.service'
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-restaurant.dto'

@Resolver((of) => Restaurant)
export class RestaurantResolver {
    constructor(private readonly restaurantService: RestaurantService) {}

    @Mutation((returns) => CreateRestaurantOutput)
    @Role([UserRole.Owner])
    async createRestaurant(
        @AuthUser() authUser: User,
        @Args('input') createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
        return this.restaurantService.createRestaurant(authUser, createRestaurantInput)
    }

    @Mutation((returns) => EditRestaurantOutput)
    @Role(['Owner'])
    editRestaurant(
        @AuthUser() authUser: User,
        @Args('input') editRestaurantInput: EditRestaurantInput,
    ): EditRestaurantOutput {
        return { ok: true }
    }
}
