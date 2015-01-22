extend "layout"

block 'title', ->
  title '接口'
  link href:"/css/pager.css", rel:"stylesheet"
  link href:"/css/bootstrap.css", rel:"stylesheet"
  link href:"/css/jquery.fileupload.css", rel:"stylesheet"

block 'script', ->
  script src:"/js/lib/$require.js", 'data-main':"/js/api/app.js"

block 'main', ->
  div class:"modal fade", id:"createUserModal", 'tabindex':"-1", 'role':"dialog", 'aria-labelledby':"createUserModalLabel",'aria-hidden':"true",'ng-controller':'editCtrl', ->
    div class:"modal-dialog modal-lg", ->
      div class:"modal-content", ->
        div class:"modal-header", ->
          button type:"button",class:"close",'data-dismiss':"modal",'aria-hidden':"true", ->
            text '&times;'
          h4 class:"modal-title", id:"createUserModalLabel", ->
            text '接口详情'
        div class:"modal-body", ->
          div class:"form-horizontal", ->
              div class: "input-group col-xs-12 bottom-gap", ->
                span class: 'input-group-addon addon-width-4 ', style:'width:95px; text-align:right;', ->'地址'
                span class: "form-control", style:'background:#eee', -> '{{model.url}}'
              div class: "input-group col-xs-12 bottom-gap", ->
                span class: 'input-group-addon addon-width-4 ', style:'width:95px; text-align:right;', ->'方法'
                span class: "form-control", style:'background:#eee',-> '{{model.method}}'
              div class: "input-group col-xs-12 bottom-gap", ->
                span class: 'input-group-addon addon-width-4 ', style:'width:95px; text-align:right;', ->'描述'
                span class: "form-control", style:'background:#eee',-> '{{model.desc}}'
          div class: "bottom-gap alert alert-info", -> '参数列表：'
          div class:"form-horizontal", ->

            div class: "input-group col-xs-12 bottom-gap", 'ng-repeat':'item in model.params ', ->
              span class: 'input-group-addon addon-width-4 ', style:'width:95px; text-align:right;', ->'{{item.name}}'
              input class: "form-control validator", validator:'{{item.type}}', placeholder:'{{item.desc}} {{item.type}}',
              description:'{{item.desc}}', xrequired:'{{item.type}}', type:"text", 'ng-model':'item.value', ->
          div class: "bottom-gap alert alert-info", -> '返回值：'
          textarea class:"form-horizontal col-xs-12  jsonResult", style:'height:200px; margin-bottom:20px;', ->
        div class:"modal-footer",->
          button class:"btn btn-primary  col-xs-offset-6", id:"btnSave", type:"button", 'ng-click':'invoke()',  ->'测试'

          button type:"button", class:"btn btn-default", 'data-dismiss':"modal",->
            text '关闭'

  div id:'user', style:'padding-top:50px', 'ng-controller':'modelsCtrl', onselectstart:'return false', ->
    div class:"well well-sm fix-top-2", ->
      div class :"container fixed-width", ->
        button type:"button", class:"btn btn-primary", style:'display:none',  id:'btnCreate', 'ng-click':'showCreateModal(this, $event.target)', ->
          span class:"glyphicon glyphicon-trash", ->
          text ' 添加'
        button type:"button", class:"btn btn-default gap", style:'display:none', id:'btnDelete', 'ng-click':'removeModels(this, $event.target)', ->
          span class:"glyphicon glyphicon-trash", ->
          text ' 删除'
        div class: 'col-xs-3 input-group pull-right searchPanel', ->
          input type:"text", class:"form-control", id:"searchInput", 'ng-model':'search', placeholder:"请输入名称", ->
          span class: 'input-group-btn', ->
            button type:"submit", class:"btn btn-default", id:"searchBtn", -> '搜索'

    div class: 'container fix-top-2-tablelist-default fixed-width', ->
      div class: 'panel panel-default', ->
        table class: 'table table-striped', style:"table-layout:fixed;word-wrap:break-word;", id: 'tblUses', ->
          thead class:"thead-color", ->
            tr ->
              th class:"col-xs-3", style:'cursor:pointer', 'ng-click':"orderColumn='url'; orderMode=!orderMode", -> '地址'
              th class:"col-xs-1", style:'cursor:pointer', 'ng-click':"orderColumn='method'; orderMode=!orderMode", -> '方法'
              th class:"col-xs-3", style:'cursor:pointer', 'ng-click':"orderColumn='desc'; orderMode=!orderMode", ->'描述'
              th class:"col-xs-3", ->'操作'
          tbody  class:'userList', style:'display:none',->
            tr class:'', 'ng-repeat':'model in models | filter:search', ->
              td class:"col-xs-3", 'ng-bind':'model.url', 'ng-click':'showEditModal(this, $target.event)',  ->
              td class:"col-xs-1", 'ng-bind':'model.method',  ->
              td class:"col-xs-3", 'ng-bind':'model.desc ', ->
              td class:"col-xs-3", ->
                a 'gap', href:'javascript:void(0)', style:'display:none', id:'{{model.id}}', -> '删除'
                a href:'javascript:void(0)',  'ng-click':'showEditModal(this, $target.event)',  -> '详情'
      div class:'page_y', id:'pager', style:'display:none;'

block 'lazyscript', ->

