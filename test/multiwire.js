define.class("$server/composition",function($server$,service,$ui$,screen,$flow$displays$,debug,outputs){
  
  this.render=function(){
    return [
      outputs({name:"a",flowdata:{x:104,y:41,screen:true}}),
      outputs({name:"b",flowdata:{x:138,y:469,screen:true}}),
      debug({name:'default',clearcolor:'#484230',flowdata:{x:709,y:243,screen:true},array:wire("[this.rpc.b.number,this.rpc.b.float,this.rpc.b.vec2,this.rpc.b.vec4,this.rpc.b.string,this.rpc.a.boolean,this.rpc.a.int,this.rpc.a.vec3,this.rpc.a.array,this.rpc.a.object,this.rpc.b.array]"),number:wire("this.rpc.a.number"),boolean:wire("this.rpc.b.boolean"),float:wire("this.rpc.a.float"),int:wire("this.rpc.b.int"),vec2:wire("this.rpc.a.vec2"),vec4:wire("this.rpc.a.vec4"),vec3:wire("this.rpc.b.vec3"),object:wire("this.rpc.b.object"),string:wire("this.rpc.a.string")})
    ]
  }
  
})