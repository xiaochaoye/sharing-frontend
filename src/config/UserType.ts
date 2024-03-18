/**
 *    @author 超
 *    用户类别
 */
export type UserType = {
      id: number;
      username: string;
      userAccount: string;
      avatarUrl?: string;
      gender: number;
      phone: string;
      email: string;
      userRole: number;
      createTime: Date;
}