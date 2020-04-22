const config = {

  global_url: 'http://127.0.0.1:8090/jstz/',  //孟小峰服务器地址

  
  getTaskUrl:function(){
    return this.global_url+"api/v1.0/task"
  },
  getTaskMission:function(){
    return this.global_url+"api/v1.0/monitor"
  },

  getTasks:function(){
    var getTimestamp=new Date().getTime();  
    global_url=global_url+"?timestamp="+getTimestamp ;
    return global_url; 
  }
 
};
