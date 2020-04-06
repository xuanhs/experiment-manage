/**
 * API配置文件
 */
const apiPath =
  process.env.NODE_ENV === 'production' ? 'http://192.168.31.138:8080' : 'http://192.168.31.138:8080'
  // process.env.NODE_ENV === 'production' ? 'http://129.204.188.244:8080' : 'http://129.204.188.244:8080'
  
  // process.env.NODE_ENV === 'production' ? 'http://129.204.188.244:8080/SpringBootDemo-0.0.1-SNAPSHOT' : 'http://129.204.188.244:8080/SpringBootDemo-0.0.1-SNAPSHOT'

module.exports = {
  apiPath,
}
