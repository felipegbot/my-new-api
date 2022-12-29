import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password: string;
}

export default User;
