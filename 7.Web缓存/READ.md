Web缓存
分类：强缓存策略(不请求后台)和协商缓存(请求后台)
协商缓存又分为两种，(基于时间)last-modified&&if-modified-since和(基于内容)etag&&if-none-match
注： 启用缓存时，浏览器Disabled cache要关闭，否则刷新无效

实例1--强缓存
A.expires(HTTP1.0) 如：Mon, 28 Sep 2020 08:10:18 GMT
缺点：1.服务器返回时间戳是与客户端时间比较，客户端时间和服务器时间快慢不一致; 2.客户端时间可修改

B.cache-control(HTTP1.1)--新规则，优先级高于expires
|  指令              | 说明                                                             |
|  ----             | ----                                                            |
| public            | 所有内容都可缓存(服务器和客户端都可以)                                |
| private           | 客户端可以缓存                                                    |
| no-cache          | 使用协商缓存来验证缓存数据                                          |
| no-store          | 所有内容都不缓存                                                  |
| max-age           | ！！！缓存内容在xxx秒后过期，与last-modified一起使用(服务器上，更准确)  |
| must-revalidation | 缓存内容过期，请求必须发送到服务器重新验证                             |

实例2--协商缓存
A.(基于时间)last-modified&&if-modified-since



