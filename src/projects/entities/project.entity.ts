import { Task } from "../../tasks/entities/task.entity";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Task, (task) => task.project, { eager: true })
  tasks: Task[];
}
