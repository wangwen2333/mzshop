package com.muzi.muzishop.entity;

/**
 * @version V1.0
 * @USER: ww
 * @Package
 * @Description: 向前端返回信息封装
 * @author: 深圳科曼
 * @date: 2019/5/13 18:03
 * @Copyright: 版权所有：深圳市科曼信息技术股份有限公司 (www.keymantek.com)
 * 注意：本内容仅限于深圳市科曼信息技术股份有限公司内部传阅，禁止外泄以及用于其他的商业目
 */
public class Result<T> {
    //返回信息
    private String msg;
    //数据是否正常请求
    private boolean success;
    //具体返回的数据
    private T detail;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public T getDetail() {
        return detail;
    }

    public void setDetail(T detail) {
        this.detail = detail;
    }
}
