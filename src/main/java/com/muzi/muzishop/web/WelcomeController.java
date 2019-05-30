package com.muzi.muzishop.web;

import com.muzi.muzishop.entity.Welcome;
import com.muzi.muzishop.response.Response;
import com.muzi.muzishop.response.ResponseCode;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

/**
 * @version V1.0
 * @USER: ww
 * @Package
 * @Description: TODO
 * @author: 深圳科曼
 * @date: 2019/5/10 17:56
 * @Copyright: 版权所有：深圳市科曼信息技术股份有限公司 (www.keymantek.com)
 * 注意：本内容仅限于深圳市科曼信息技术股份有限公司内部传阅，禁止外泄以及用于其他的商业目
 */
@Controller
@RequestMapping("/welcome")
public class WelcomeController {
    /**
     * 访问welcome.jsp页面
     * @return
     */
    @RequestMapping("welcomeIndex")
    public String welcomeIndex(ModelMap modelMap){
        modelMap.put("name","木子商城");
        return "welcome";
    }

    /**
     * 返回json字符串
     * @return
     */
    @RequestMapping("getWelcomeInfo")
    @ResponseBody
    public Response getWelcomeInfo(){
        /**
         * 测试数据
         */
        List<Welcome> welcomes = new ArrayList<>();
        Welcome w1 = new Welcome();
        w1.setId("1");
        w1.setName("xx1");
        w1.setAge(11);
        w1.setGender("女");

        Welcome w2 = new Welcome();
        w2.setId("2");
        w2.setName("xx2");
        w2.setAge(22);
        w2.setGender("男");
        welcomes.add(w1);
        welcomes.add(w2);

        Response response = new Response();
        response.setData(welcomes);
        response.setRetcode(ResponseCode.SUCCESS);
        response.setRetdesc("Success");
        return response;
    }
}
