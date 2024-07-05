import { User } from '@prisma/client'; // 确保这个导入路径是正确的

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
