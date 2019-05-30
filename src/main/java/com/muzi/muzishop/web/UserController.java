package com.muzi.muzishop.web;

import com.muzi.muzishop.entity.Result;
import com.muzi.muzishop.entity.User;
import com.muzi.muzishop.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @version V1.0
 * @USER: ww
 * @Package
 * @Description: TODO
 * @author: 深圳科曼
 * @date: 2019/5/13 18:04
 * @Copyright: 版权所有：深圳市科曼信息技术股份有限公司 (www.keymantek.com)
 * 注意：本内容仅限于深圳市科曼信息技术股份有限公司内部传阅，禁止外泄以及用于其他的商业目
 */

@Controller
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    /**
     * @Description: 跳转到登录页面
     * @param: [request]
     * @return: java.lang.String
     * @author: ww
     * @date: 20:42 2019/5/28
     */
    @RequestMapping(value = "/toLogin",method = RequestMethod.GET)
    public String toLogin(HttpServletRequest request){
        logger.info("======跳转到登录页面=======");
        return "login";
    }

    /**
     * @Description: 跳转到注册页面
     * @param: [request]
     * @return: java.lang.String
     * @author: ww
     * @date: 20:42 2019/5/28
     */
    @RequestMapping(value = "/toRegister",method = RequestMethod.GET)
    public String toRegister(HttpServletRequest request){
        return "Register";
    }
    /**
     * 注册
     * @param user 参数封装
     * @return Result
     */
    @PostMapping(value = "/regist")
    public Result regist(User user){
        return userService.regist(user);
    }
    /**
     * 登录
     * @param user 参数封装
     * @return Result
     */
    @PostMapping(value = "/login")
    public Result login(User user){
        return userService.login(user);
    }

}
