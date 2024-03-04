import {useRouter} from "vue-router";
import myAxios from "../plugins/myAxios";
import {setCurrentUserStatus} from "./UserSetting";

/**
 *    @author 超
 *    获取全局用户是否登录
 */
const router = useRouter()

export const getCurrentUser = async () => {
      const res = await myAxios.get('user/current');
      if (res.code === 0) {
            setCurrentUserStatus(res.data);
            return res.data;
      }
      return null;
}