import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";


@InputType()
export class UpdateTodoInput {

    @Field(() => Int)
    @IsInt()
    @Min(1)
    id: number;

    @Field( () => String, { description: 'Whats need to be done', nullable: true } )
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @IsOptional()
    description?: string;

    @Field( () => Boolean, { nullable:true })
    done?: boolean;
}