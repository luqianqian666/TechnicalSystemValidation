const config = {

  global_url: 'http://172.20.10.7:8086/',  //孟小峰服务器地址

  
  getTaskUrl:function(){
    return this.global_url+"api/v1.0/task"
  },

  getTasks:function(){
    var getTimestamp=new Date().getTime();  
    global_url=global_url+"?timestamp="+getTimestamp ;
    return global_url; 
  }
 
};
