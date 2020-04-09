const config = {
  global_url: 'http://127.0.0.1:8080/',  //孟小峰服务器地址
  
  getTaskUrl:function(){
    return this.global_url+"api/v1.0/task"
  }
 
};
