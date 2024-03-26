import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ nullable: false })
  username!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Column({ nullable: false })
  password!: string;
}

export default User;
