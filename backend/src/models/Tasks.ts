import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Users from "./Users";

@Entity("tasks")
class Tasks {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  task_name: string;

  @Column()
  user_id: string;
  
  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  description: string;

  @Column("timestamp with time zone")
  initial_date: Date;

  @Column("timestamp with time zone")
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tasks;
