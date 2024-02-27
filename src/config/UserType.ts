/**
 *  用户类别
 */
export type UserType = {
      id: number;
      username: string;
      userAccount: string;
      avatarUrl?: string;
      gender: string;
      phone: string;
      email: string;
      userRole: number;
      createTime: Date;
}