import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';

@Resolver(() => Todo)
export class TodoResolver {

    constructor (
        private readonly todoService: TodoService
    ) {}

    @Query( () => [Todo], { name: 'todos' })
    findAll () {
        return this.todoService.findAll();
    }

    @Query( () => Todo, { name: 'todo' } )
    findOne (
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.findOne(id);
    }

    @Mutation(() => Todo, { name: 'CreateTodo' })
    create (
        @Args('body') body: CreateTodoInput
    ): Todo {
        return this.todoService.create( body );
    }

    @Mutation(() => Todo, { name: 'UpdateTodo' })
    update (
        @Args('body') body: UpdateTodoInput
    ) {
        return this.todoService.update( body );
    }

    @Mutation( () => Boolean )
    remove (
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete(id);
    }

}
