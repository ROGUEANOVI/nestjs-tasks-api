import { Task } from "src/tasks/entities/task.entity";
import { Role } from "../../common/enums/roles.enum";
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false, unique: true})
  userName: string;

  @Column({nullable: false, unique: true})
  email: string;

  @Column({nullable: false, select: false})
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  roles: Role[];

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany(() => Task, (task) => task.user, { eager: true})
  tasks: Task[];
}
