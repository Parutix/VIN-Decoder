import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("search_history")
class Result extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  user_id!: number;

  @Column({ nullable: false })
  vin!: string;

  @Column({ nullable: false })
  results_count!: number;
}

export default Result;
