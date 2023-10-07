const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 7000,
    //解决跨域的问题
    proxy: {  
      '/api': { // 这里是你要代理的API路径  
        target: 'http://118.25.147.174:8080', // 这里是后端服务器的地址  
        changeOrigin: true, // 开启代理服务器，将主机头重写为target指定的地址  
        pathRewrite: {  
          '^/api': '' // 如果你的API路径不是以/api开头，则需要修改这里的正则表达式  
        }  
      },
      '/local': { // 这里是你要代理的API路径  
        target: 'http://118.25.147.174:8080', // 这里是后端服务器的地址  
        changeOrigin: true, // 开启代理服务器，将主机头重写为target指定的地址  
        pathRewrite: {  
          '^/local': '' // 如果你的API路径不是以/api开头，则需要修改这里的正则表达式  
        },
        onProxyReq(proxyReq) { // 解决post请求报错403问题（vue proxy 设置接口代理后，get请求正常，post请求报403，解决方案 https://juejin.cn/post/7032114280967176199）
          proxyReq.removeHeader('origin');
        }
      }  
    }
  }
})
