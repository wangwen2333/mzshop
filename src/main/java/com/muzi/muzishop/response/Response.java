package com.muzi.muzishop.response;

import com.muzi.muzishop.entity.Welcome;

import java.util.List;

/**
 * @version V1.0
 * @USER: ww
 * @Package
 * @Description: TODO
 * @author: 深圳科曼
 * @date: 2019/5/10 17:55
 * @Copyright: 版权所有：深圳市科曼信息技术股份有限公司 (www.keymantek.com)
 * 注意：本内容仅限于深圳市科曼信息技术股份有限公司内部传阅，禁止外泄以及用于其他的商业目
 */
public class Response {
    private List<Welcome> Data;
    private Object retcode;
    private String retdesc;

    public List<Welcome> getData() {
        return Data;
    }

    public void setData(List<Welcome> data) {
        Data = data;
    }

    public Object getRetcode() {
        return retcode;
    }

    public void setRetcode(Object retcode) {
        this.retcode = retcode;
    }

    public String getRetdesc() {
        return retdesc;
    }

    public void setRetdesc(String retdesc) {
        this.retdesc = retdesc;
    }
}
