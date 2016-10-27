
    var reminder=angular.module('reminder',[]);
    reminder.controller('mainCtrl',['$scope',function($scope){

        $scope.color=['purple','green','blue','yellow','brown','red','orange'];
        $scope.arr=[{id:1,them:'purple',title:'默认列表',
        todo:[{id:1,title:'你好',state:0},
            {id:2,title:'我好',state:1},
            {id:3,title:'他好',state:0},
            {id:4,title:'大家好',state:1}
             ]},
            {id:2,them:'green',title:'新列表1',todo:[]}];
        $scope.circle=[
            {id:1,theme:"orange"},
            {id:2,theme:"red"},
            {id:3,theme:"brown"},
            {id:4,theme:"yellow"},
            {id:5,theme:"blue"},
            {id:6,theme:"green"},
            {id:7,theme:"purple"}
        ]

        $scope.change=function(t){
            $scope.current.them = t.theme;
        }

        $scope.count=function(){
            var index=0;
            angular.forEach($scope.current.todo,function(v,i){
                if(v.state==1){
                    index++;
                }
            })
           return index;
        }
        $scope.addlist=function(){
            var max_id=-100;
            angular.forEach($scope.arr,function(v,i){
                if(v.id>max_id){
                    max_id=v.id;
                }
            });
            var index=$scope.arr.length%7;
            $scope.arr.push({
                id:max_id+1,
                them:$scope.color[index],
                title:'新列表'+($scope.arr.length),
                todo:[]
            });

        };
        $scope.cancel=function(){
            $(".card").toggleClass("active")
        }
        $scope.deletecard=function(){
            $(".card").removeClass("active")
        }
        $scope.addtodo=function(e) {
                var max_id = -100;
                angular.forEach($scope.current.todo, function (v, i) {
                    if (v.id > max_id) {
                        max_id = v.id;
                    }
                });
                var index = $scope.arr.length % 7;
                var id = max_id + 1;
                $scope.current.todo.push({
                    id: id,
                    title: $scope.item,
                    state: 0
                });

        }

            //定义一个变量 戴亮一个类
            $scope.current = $scope.arr[0];
            $scope.setcurrent = function (v) {
                $scope.current = v;
            }
            $scope.delete = function (id) {
                $scope.current.tudo = $scope.current.tudo.filter(function (v, i) {
                    return v.id !== id
                })
            }

        $scope.addtodo=function(){
            var l=$scope.current.todo.length;
            if(l === 0){
                var id=0;
            }else{
                var id=parseInt($scope.current.todo[l-1].id)+1;
            }
            var newtodo={
                id:id,
                title:'',
                state:0
            }
            $scope.current.todo.push(newtodo);
            $scope.currenttodo = newtodo;
        }
        $scope.shanchu=function(dd){
            var newarr=[];
            for(var i=0;i<$scope.arr.length;i++){

                if(Number($scope.arr[i].id) !== dd){
                    newarr.push($scope.arr[i]);
                }
            }
            $scope.arr=newarr;
            $scope.current=$scope.arr[0];
        }
        $scope.delete1=function(dd){
            var newtodo=[];
            for(var i=0;i<$scope.current.todo.length;i++){
                if(parseInt($scope.current.todo[i].id) !== dd){
                    console.log(dd)
                    newtodo.push($scope.current.todo[i]);
                }
            }

            $scope.current.todo=newtodo;
        }

    }]);
    reminder.directive('cardList',[function(){
        return{
            restrict:'AE',
            transclude:true,
            replace: true,
            template:'<div><div ng-transclude></div></div>',
            link:function(scope,el){
                $(el).find('.color-box').on('click','.selection-circle',function(){
                    $('.selection-circle').removeClass('active');
                    $(this).addClass('active')
                })


            }
        }
    }]);
    reminder.directive('myDiv',[function(){
         return{
             restrict:'AE',
             transclude:true,
             replace: true,
             template:'<div><div ng-transclude></div></div>',
             link:function(scope,el) {
                 $(el).find('ul').on('dblclick','li',function () {
                     $(this).addClass('bianji');
                     var text = $(this).find('.text').text();
                     var input = $(this).find('input');
                     input.val(text).focus();
                 })
                 $(el).find('ul').on('click', 'li', function () {
                     $(el).find('ul .active').removeClass('active');
                     $(this).addClass('active')
                 })


                 $('.done-box .anniu .img').on('click',function(){
                     $(this).toggleClass('active');
                     $(el).find('.yiwan').toggleClass('active')
                 })

                $('.new').on('click',function(){
                    var li=$('.weiwan li');
                    var l=li.length;
                    li.removeClass('active');
                    li.eq(l-1).addClass('active bianji').find('input').focus();
                })
             }
         }

    }]);
    reminder.directive('newUl',[function(){
        return {
            restrict:'AE',
            transclude:true,
            template: '<ul><div ng-transclude></div></ul>',
            replace: true, link: function(scope,el){
                $(document).on('mousedown',false)
                $(el).on('click','li',function(){
                    $('.content .active').removeClass('active');
                    $(this).addClass('active')
                })
              $(el).on('dblclick','li',function(){
                  $('.bianji').removeClass('bianji');
                  $(this).addClass('bianji');
                  $(this).find('input').val($(this).find('input').val()).focus();
                  $(this).find('input').on('blur',function(){
                      $(this).find('.title').text($(this).find('input').val())
                  })
              })
                // $(el).on('keyup','li input',false);
                 $(document).on('keyup',function(e){
                 var id=parseInt($('.content .active').attr('date-id'));
                 if(e.keyCode==46){
                     $('.content .active').remove();
                       scope.$apply(function(){
                       scope.arr=scope.arr.filter(function(v,i){
                           return v.id!==id;
                       })
                   })
                 }
                 return false
             })
        }
    }
    }])
