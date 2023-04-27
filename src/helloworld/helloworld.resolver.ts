import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {

    @Query( () => String, { description: 'Hola mundo es lo que retorna', name: 'hello'} )
    helloWorld (): string {
        return 'Hello world';
    }
    
    @Query( () => Float, { name:'random' })
    getRandom (): number {
        return Math.random() * 100;
    }

    @Query(() => Int, { name: 'randomFromZeroTo', description: 'Zero to number {to}' })
    randomFromZeroTo (
        @Args('to', { nullable: true, type: () => Int }) to: number = 6
    ): number {
        return Math.floor(Math.random() * to);
    }

}
