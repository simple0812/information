doctype 5
html ->
  head ->
    meta name:"viewport", content:"width=device-width, initial-scale=1.0", charset:'utf-8'
    link href:"/css/bootstrap.css", rel:"stylesheet"
    link href:"/css/style.css", rel:"stylesheet"
    script src:"/js/lib/jquery.js"

    block 'title', ->
      title 'information'
    block 'style', ->
    block 'script', ->

  body style:'min-width:1280px;', ->
    div class:"navbar navbar-inverse navbar-fixed-top ", role:"navigation", ->
      div class:"container ", ->
        div class:"navbar-header", ->
          button type:"button", class:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse", ->
            span class:"sr-only", -> 'Toggle navigation'
            span class:"icon-bar"
            span class:"icon-bar"
            span class:"icon-bar"
          a class:"navbar-brand", href:"#", ->'后台管理系统'
        div class:"collapse navbar-collapse",style:"min-width:794px;", ->
          ul class:"nav navbar-nav", id:'headNav', ->
            li class:"", -> a href:"/user/v", -> 'user'
            li class:"", -> a href:"/new/v", -> 'news'
            li class:"", -> a href:"/api/v", -> 'api'


          coffeescript ->
            actived = location.pathname
            require ['/js/lib/jquery.js'], () ->
              $.each $('.nav li a'), (i,o) ->
                if actived is $(o).attr('href')
                  $(o).parent().addClass('active').siblings('li').removeClass('active')
          
    block 'main'
  block 'lazyscript'


