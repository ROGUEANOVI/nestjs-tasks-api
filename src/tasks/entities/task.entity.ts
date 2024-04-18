import { Project } from "../../projects/entities/project.entity";
import { User } from "../../users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: false})
  isCompleted: boolean

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  project_id: number;

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'project_id' }) 
  project: Project;

  @Column({nullable: true})
  user_id: number;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'user_id' }) 
  user?: User;

}
