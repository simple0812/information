define(["lib/angular"],function(){function b(a,b,c,d){function e(){$(".jsonResult").html(""),a.model={url:"",name:"",desc:"",params:""}}a.model={url:"",name:"",desc:"",params:""},a.invoke=function(){console.log(1);if(!validator.validateAll("#createUserModal"))return;console.log(2),console.log(a.model),d.invoke(a.model).done(function(a){$(".jsonResult").html(JSON.stringify(a,null,2)),$("#btnSave").data("save-type","")}).fail(function(){$("#createUserModal").modal("hide")})},$("#createUserModal").on("hidden.bs.modal",function(a){e()})}var a=angular.module("moduleDetailCtrl",[]);a.controller("editCtrl",["$scope","$http","$window","svc",b])})