import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'Piedra del alma', done: false },
        { id: 2, description: 'Piedra de la mente', done: true },
        { id: 3, description: 'Piedra del poder', done: false },
        { id: 4, description: 'Piedra del tiempo', done: true },
        { id: 5, description: 'Piedra del espacio', done: true },
        { id: 6, description: 'Piedra del realidad', done: false },
    ]

    get totalTodos (): number {
        return this.todos.length;
    }

    get pendingTodos (): Todo[] {
        return this.findAll({status: false});
    }
    
    get completedTodos (): Todo[] {
        return this.findAll({status: true})
    }


    findAll ({ status }: StatusArgs): Todo[] {
        
        if ( status !== undefined ) return this.todos.filter( todo => todo.done === status );

        return this.todos;
    }

    findOne (id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);

        if( !todo ) throw new NotFoundException(`Todo with id ${ id } not found`);

        return todo;
    }

    create (createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo()
        todo.description = createTodoInput.description;
        todo.id = Math.max(...this.todos.map(todo => todo.id ), 0) + 1;
        
        this.todos.push( todo );
        return todo;
    }

    update (id: number, updateTodoInput: UpdateTodoInput) {
        const { description, done } = updateTodoInput;
        const todoToUpdate = this.findOne( id );

        if ( description ) todoToUpdate.description = description;
        if ( done !== undefined ) todoToUpdate.done = done;

        this.todos = this.todos.map ( todo => {
            return ( todo.id === id ) ? todoToUpdate: todo;
        });

        return todoToUpdate;
        
    }

    delete (id: number) {
        const todo = this.findOne(id);

        this.todos = this.todos.filter(todo => todo.id !== id);

        return true;
    }

}
