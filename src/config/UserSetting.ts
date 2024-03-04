/**
 *    @author 超
 *    当前用户的 get 和 set 方法
 */
import {UserType} from "./UserType";

let currentUser: UserType;

const setCurrentUserStatus = (user: UserType) => {
      currentUser = user
}

const getCurrentUserStatus = (): UserType => {
      return currentUser
}

export {setCurrentUserStatus, getCurrentUserStatus}
