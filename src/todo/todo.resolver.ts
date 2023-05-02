import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregation.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor (
        private readonly todoService: TodoService
    ) {}

    @Query( () => [Todo], { name: 'todos' })
    findAll (
        @Args() status: StatusArgs
    ) {
        return this.todoService.findAll(status);
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
        return this.todoService.update( body.id, body );
    }

    @Mutation( () => Boolean )
    remove (
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete(id);
    }

    // Aggregations
    @Query( () => Int, {name: 'totalTodos'} )
    totalTodos (): number {
        return this.todoService.totalTodos;
    }
    
    @Query( () => [Todo], {name: 'completedTodos'} )
    completedTodos (): Todo[] {
        return this.todoService.completedTodos;
    }

    @Query( () => [Todo], {name: 'pendingTodos'} )
    pendingTodos (): Todo[] {
        return this.todoService.pendingTodos;
    }

    @Query( () => AggregationsType)
    aggregations(): AggregationsType {
        return {
            total: this.todoService.totalTodos,
            pending: this.todoService.pendingTodos.length,
            completed: this.todoService.completedTodos.length,
            completedTotalTodos: this.todoService.completedTodos.length
        }
    }



}
