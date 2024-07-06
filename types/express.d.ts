// types/express.d.ts
import { User } from './user.interface'; // 假设你有一个 User 接口

declare global {
  namespace Express {
    interface Request {
      user?: User; // 这里定义了 user 属性
    }
  }
}