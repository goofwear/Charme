var myUserIdRaw = "manu%40localhost";
var myUserId = "manu@localhost";

page_authenticated = Backbone.View.extend({   

	el: '',
	sidebarLoad : false,
	currentView: "",
	events: {
		//"click  .sbAlpha ul a" : "openPageHandler",
	},
	
	/*shareClick: function(ev)
    {
    	// Load homepage and append to [sharecontainer]
alert("share");
		
	}
    ,
	/*getPathItem: function(path, number)
	{
		var x =  path.split("/");

		return x[number];
	}
    ,
    getPathLength: function(path)
	{
		var x =  path.split("/");

		return x.length;
	}
    ,*/

/*	sidebarClickHandler: function(ev)
    {
    
		var d = $(ev.target).data("destination");


    	var newpath  ="#/"+d;
location.href= newpath;

		if (this.getPathItem(location.href, 4) == this.getPathItem(newpath, 1))
		{
console.log("sidebar load=true");

		this.sidebarLoad = true;
}
		location.href= newpath;

	}
    ,*/

    initialize: function(){

console.log("el"+ this.el);
    },


  	openPage: function(view, subview)
  	{

//this.$el.html("lalala");
	
  		// TODO: if not logged in -> show login field!
  	
  		//$(".sbAlpha ul li").removeClass("active");
    //	$(".sbAlpha ul li a[data-topic='"+id+"']").parent().addClass("active");



    	//var par = this;

		// Template loader using underscore.js, TODO: preload templates!
	
			//$.post("templates/"+id+".html", function (d)
			
				/*{
					Template.html contains:
					- information about sub templates (default template, useSubTemplates)
					  in meta div title=subTmpl=true/false and defaultSubTmpl
					- information about required json data sets div[title=json]




				var templateData = {globaldata : []	};
		
				if (id == "user")
				{


				//	templateData["userId"] = encodeURIComponent(item);

					//templateData["item"] = item;
					//templateData["item2"] = item2;


				}
	        	if (id == "stream")
				{
					templateData["streamitems"] = apl_postloader_getAll();
					templateData["listitems"] = apl_postloader_getLists();

					console.log(templateData);


				}

				_.templateSettings.variable = "rc";
				var template = _.template(d, templateData); 

				// if click form profile tabs
				if ($("#page3").length > 0 && (par.sidebarLoad == true))
				{
					console.log("sidebar load");
					par.sidebarLoad = false;
					//TODO: remove sidebar from template
					$("#page3").html(template);
			
				}
				else
					$("#page").html(template);

				// Make textareas autosizing
				$('textarea:not(.noAutoHeight)').autosize();

				// Check for page specific sidebar items
				

				// Adapt layout depending on sidebar existence
			    if ($('div[title=layout]').text() == "sidebar") // Use left sidebar
				{
					$('.page_content').css("width", "700px");
					$('.page_content').css("margin-left", "150px");
					$('.sbBeta').show();
				
					//if (level == 0) TODO!
					{
						$('.sbBeta .actionBar').html(""); // Remove existing buttons
						$('.subCont').html($('div[title=submenu_items]').html());
						$('.sbBeta .actionBar').html($('div[title=action_bar]').html());
					}
				}
				else // Do not use left sidebar
				{
					$('.page_content').css("width", "850px");
					$('.page_content').css("margin-left", "0");
					$('.sbBeta').hide();
				}

				// Do this after sidebar items were initialised:
				$(".subCont").append('<div id="colorbg"></div>');

				$(".sbBeta ul li").removeClass("active");

				var t = par.getPathLength(location.href); //6: /user/userid 7: /user/userid/subribrs
				

			/*	if ($(".profileTabs").length > 0)
				{

					if (item2==null)
						$("ul li a[data-defaultDestination='true']").parent().addClass("active");
					else
						$("ul li a[data-destination='user/"+encodeURIComponent(item)+"/"+item2+"']").parent().addClass("active");

				}

				if (item == null)
				{

					$("ul li a[data-defaultDestination='true']").parent().addClass("active");
				}
				//else
	    		//$("ul li a[data-destination='page/"+id+"/"+item+"']").parent().addClass("active");


			}, "text");}
				*/
		
  	},

   

     render: function(){


		var str = '<div id="cnt_loggedIn"><div class="actionCont"></div><div class="containerAll"><div id="whitebg"></div><div class="sidebar sbAlpha"><div class="actionBar"> \
		<a data-bgpos="0" id="button_notifications" ref="notifications"  class="actionButton">0</a><a data-bgpos="-30"  href="javascript:logout()" style="background-position:-30px 0; " class="actionButton"></a></div> \
		<div style="height:67px; background-color:#000;"><a data-page="profile"><img></a></div><ul></ul> \
		<a href="#about">About</a> - <a href="#help">Help</a></div> \
		    <div class="sbBetaCont"> \
		        <div class="sidebar sbBeta"> \
		           <div class="actionBar"> \
		        </div> \
		     <ul class="subCont"> \
		     </ul> \
		        </div> \
		        <div class="page_content"> \
		        <div class="page" style="padding:0px; " id="page"> \
		        </div> \
		        </div> \
		    </div> \
		</div></div>  \
		';

		if ($("#cnt_loggedIn").length < 1)
		{
			

			console.log(this.el);
			$(this.el).html(str);

		
			$(".sbAlpha ul").append("<li><a data-topic='stream' href='#stream'>Stream</a></li>");
			$(".sbAlpha ul").append("<li><a data-topic='profile' href='#user/"+myUserIdRaw+"'>Profile</a></li>");
			$(".sbAlpha ul").append("<li><a data-topic='talks' href='#talks'>Talks</a></li>");
			$(".sbAlpha ul").append("<li><a data-topic='lists' href='#lists' >Lists</a></li>");
			//$(".sbAlpha ul").append("<li><a data-topic='groups' href='#groups'>Groups</a></li>");
			$(".sbAlpha ul").append("<li><a data-topic='settings' href='#settings'>Settings</a></li>");
		}
	

	// Set a color scheme (See lib/colors.js for function)
	setColor("#1A3C87","#000614");

     }
     });




page_login = Backbone.View.extend({   

 
    initialize: function(){

    },
     render: function(){


	$("#layout").html('<div style="width:600px; margin:200px auto;" id="welcome_main" >  <img src="media/welcome.png" />  <div style="float:right; width:264px;">  <div style="background-color:#fff;  padding:32px; border-radius:8px; margin-bottom:16px;">  <div id="login_error" style="background-color:#F7D2D2; padding:16px; display:none;  border-radius:8px; margin-bottom:16px;color:#C30; text-align:center;">Login failed. Please check your login data.</div>  Username:  <input placeholder="you@yourserver.com"  id="login_user" class="box" style="margin:8px 0; width:190px;" />  Password:  <input placeholder="●●●●●●●●●" id="login_password" type="password" class="box" style="margin:8px 0; width:190px;" />  <div style="position:relative;">  <a href="javascript:login();" class="button" style="float:left">Login</a><span style="float:left; top:6px; left:5px; position:relative;"> or <a href="#/account/signup">Sign up</a></span>  <br class="cb" />  </div>  </div>  <div style="text-align:right" class="lightLink">  <a href="#password">Forgot Password?</a> - <a href="#/about">About</a> </div>  </div>  </div>');
		
		var u = $('#login_user').focus();
		$('#login_password').keypress(function(e) {

		   code= (e.keyCode ? e.keyCode : e.which);
		    if (code == 13)
		    login();

		});
		$('#login_user').keypress(function(e) {

		   code= (e.keyCode ? e.keyCode : e.which);
		    if (code == 13)
		    $('#login_password').focus().select();

		});


     }

    });



