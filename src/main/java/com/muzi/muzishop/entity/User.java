package com.muzi.muzishop.entity;


/**
 * @version V1.0
 * @USER: ww
 * @Package
 * @Description: TODO
 * @author: 深圳科曼
 * @date: 2019/5/13 14:53
 * @Copyright: 版权所有：深圳市科曼信息技术股份有限公司 (www.keymantek.com)
 * 注意：本内容仅限于深圳市科曼信息技术股份有限公司内部传阅，禁止外泄以及用于其他的商业目
 */
public class User {
    private Integer id;
    private String username;
    private String password;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
