extend "layout"

block 'title', ->
  title '用户'
  link href:"/css/pager.css", rel:"stylesheet"
  link href:"/css/bootstrap.css", rel:"stylesheet"
  link href:"/css/jquery.fileupload.css", rel:"stylesheet"

block 'script', ->
  script src:"/js/lib/jquery.js"
  script src:"/js/lib/require.js", 'data-main':"/js/user/app.js"
  coffeescript ->
    @query_list =
      pageindex : 1
      pagesize : 10
      keyword:''


block 'main', ->
  div class:"modal fade ", id:"createUserModal", 'tabindex':"-1", 'role':"dialog", 'aria-labelledby':"createUserModalLabel",'aria-hidden':"true",'ng-controller':'editCtrl', ->
    div class:"modal-dialog", ->
      div class:"modal-content", ->
        div class:"modal-header", ->
          button type:"button",class:"close",'data-dismiss':"modal",'aria-hidden':"true", ->
            text '&times;'
          h4 class:"modal-title", id:"createUserModalLabel", ->
            text '创建'
        div class:"modal-body", ->
          div class:"form-horizontal", ->
            div class: "input-group col-xs-12 bottom-gap", ->
              span class: 'input-group-addon addon-width-4 ', style:'width:95px; text-align:right;', ->'名称：'
              input class: "form-control validator", validator:'specialChar', id:'txtName',
              description:'名称', required:'required', type:"text", 'ng-model':'model.name', ->
            div class: "input-group col-xs-12 bottom-gap", ->
              span class: 'input-group-addon addon-width-4 ', style:'width:95px; text-align:right;', ->'年龄：'
              input class: "form-control validator", validator:'specialChar', id:'txtAge',
              description:'年龄', required:'required', type:"text", 'ng-model':'model.age', ->
            div class: "input-group col-xs-12", ->
              img id:'logoImg', src:'',style:'display:none; max-width:500px; max-height:500px;'
        div class:"modal-footer",->
          button class:"btn btn-primary  col-xs-offset-6", id:"btnSave", type:"button", 'ng-click':'save()',  ->'保存'

          button type:"button", class:"btn btn-default", 'data-dismiss':"modal",->
            text '关闭'

  div id:'user', style:'padding-top:50px', 'ng-controller':'modelsCtrl', onselectstart:'return false', ->
    div class:"well well-sm fix-top-2", ->
      div class :"container fixed-width", ->
        button type:"button", class:"btn btn-primary",  id:'btnCreate', 'ng-click':'showCreateModal(this, $event.target)', ->
          span class:"glyphicon glyphicon-trash", ->
          text ' 添加'
        button type:"button", class:"btn btn-default gap",  id:'btnDelete', 'ng-click':'removeModels(this, $event.target)', ->
          span class:"glyphicon glyphicon-trash", ->
          text ' 删除'
        div class: 'col-xs-3 input-group pull-right searchPanel', ->
          input type:"text", class:"form-control", id:"searchInput", placeholder:"请输入名称", ->
          span class: 'input-group-btn', ->
            button type:"submit", class:"btn btn-default", id:"searchBtn", 'ng-click': 'search($event.target)', -> '搜索'

    div class: 'container fix-top-2-tablelist-default fixed-width', ->
      h3 class: 'pageInfo', ->
        img src: '/images/header.png',class: 'circlePic', ->
        text '&nbsp用户'
      div class: 'panel panel-default', ->
        table class: 'table table-striped', style:"table-layout:fixed;word-wrap:break-word;", id: 'tblUses', ->
          thead class:"thead-color", ->
            tr ->
              th style:'width:30px', ->
                input type:'checkbox', class :'checkbox', id:'chkAllItems', onclick:"common.selectAllChk(this, '.chkItem')",
              th class:"col-xs-2", style:'cursor:pointer', 'ng-click':"orderColumn='name'; orderMode=!orderMode", -> '名称'
              th class:"col-xs-2", style:'cursor:pointer', 'ng-click':"orderColumn='age'; orderMode=!orderMode", -> '年龄'
              th class:"col-xs-2", style:'cursor:pointer', 'ng-click':"orderColumn='created_at'; orderMode=!orderMode", ->'创建时间'
              th class:"col-xs-2", style:'cursor:pointer', 'ng-click':"orderColumn='updated_at'; orderMode=!orderMode", ->'更新时间'
              th class:"col-xs-3", ->'操作'
          tbody  class:'userList', style:'display:none',->
            tr class:'', 'ng-repeat':'model in models ', ->
              td style:'width:30px', ->
                input type:'checkbox', class :'checkbox chkItem', value:'{{model.id}}', onclick:"common.selectItemChk('.chkItem', '#chkAllItems')",
              td class:"col-xs-2", 'ng-bind':'model.name',  ->
              td class:"col-xs-2", 'ng-bind':'model.age',  ->
              td class:"col-xs-2", 'ng-bind':'model.created_at | dateFilter', ->
              td class:"col-xs-2", 'ng-bind':'model.updated_at | dateFilter', ->
              td class:"col-xs-3", ->
                a 'gap', href:'javascript:void(0)', 'ng-click':'remove(this, $target.event)', id:'{{model.id}}', -> '删除'
                a href:'javascript:void(0)',  'ng-click':'showEditModal(this, $target.event)', -> '编辑'
      div class:'page_y', id:'pager', style:'display:none;'

block 'lazyscript', ->

