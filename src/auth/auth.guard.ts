import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { AllowedRoles } from './role.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler())
        // roles가 없으면 public이라는 뜻이므로 true를 리턴한다.
        if (!roles) {
            return true
        }
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const user: User = gqlContext['user']
        if (!user) {
            return false
        }
        if (roles.includes('Any')) {
            return true
        }
        return roles.includes(user.role)
    }
}
